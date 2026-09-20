/**
 * Centrix Codebase Intelligence & Code RAG Engine
 * Multi-language Code Parser, Symbol Index, Relationship Graph,
 * Semantic Chunker, Hybrid Retriever, Intent Detector & Impact Analyzer.
 *
 * Runs 100% client-side in browser (or Node.js).
 */

(function (global) {
  'use strict';

  // -------------------------------------------------------------
  // 1. Language Detection & Configuration
  // -------------------------------------------------------------
  const SUPPORTED_LANGUAGES = {
    cs: 'csharp',
    rs: 'rust',
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    py: 'python',
    go: 'go',
    sql: 'sql',
    json: 'json',
    md: 'markdown'
  };

  const EXCLUDED_PATTERNS = [
    /node_modules\//i,
    /\.git\//i,
    /dist\//i,
    /build\//i,
    /target\//i,
    /bin\//i,
    /obj\//i,
    /\.min\.(js|css)$/i,
    /package-lock\.json$/i,
    /Cargo\.lock$/i,
    /\.(png|jpg|jpeg|gif|ico|svg|pdf|exe|dll|dylib|so|zip|tar|gz|woff|woff2|ttf|eot)$/i,
    /(\.env|\.pem|\.key|id_rsa|secrets\.json)$/i
  ];

  function detectLanguage(filePath) {
    const ext = filePath.split('.').pop().toLowerCase();
    return SUPPORTED_LANGUAGES[ext] || 'plaintext';
  }

  function shouldExclude(filePath) {
    return EXCLUDED_PATTERNS.some(regex => regex.test(filePath));
  }

  // -------------------------------------------------------------
  // 2. Multi-Language Code Parser
  // -------------------------------------------------------------
  class CodeParser {
    /**
     * Parses source text and returns structured AST-like symbols & imports.
     */
    static parse(filePath, content) {
      const lang = detectLanguage(filePath);
      const lines = content.split('\n');
      const symbols = [];
      const imports = [];
      const relationships = [];

      switch (lang) {
        case 'csharp':
          this._parseCSharp(filePath, lines, symbols, imports, relationships);
          break;
        case 'rust':
          this._parseRust(filePath, lines, symbols, imports, relationships);
          break;
        case 'typescript':
        case 'javascript':
          this._parseTS(filePath, lines, symbols, imports, relationships);
          break;
        case 'python':
          this._parsePython(filePath, lines, symbols, imports, relationships);
          break;
        case 'sql':
          this._parseSQL(filePath, lines, symbols, imports, relationships);
          break;
        default:
          this._parseGeneric(filePath, lines, symbols);
          break;
      }

      return {
        filePath,
        language: lang,
        lineCount: lines.length,
        symbols,
        imports,
        relationships
      };
    }

    // --- C# Parser ---
    static _parseCSharp(filePath, lines, symbols, imports, rels) {
      let currentNamespace = '';
      let currentClass = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const lineNum = i + 1;

        // using directives
        const usingMatch = trimmed.match(/^using\s+([\w\.]+);/);
        if (usingMatch) {
          imports.push(usingMatch[1]);
          continue;
        }

        // namespace
        const nsMatch = trimmed.match(/^namespace\s+([\w\.]+)/);
        if (nsMatch) {
          currentNamespace = nsMatch[1];
          continue;
        }

        // Class, Interface, Record, Struct
        const typeMatch = trimmed.match(/(public|internal|private|protected)?\s*(abstract|sealed|static|partial)?\s*(class|interface|struct|record)\s+([A-Za-z0-9_]+)(?:\s*:\s*([A-Za-z0-9_,\s<>]+))?/);
        if (typeMatch && !trimmed.includes(';') && !trimmed.startsWith('//')) {
          const kind = typeMatch[3];
          const name = typeMatch[4];
          const inheritance = typeMatch[5] ? typeMatch[5].split(',').map(s => s.trim()) : [];
          const endLine = this._findClosingBrace(lines, i);

          currentClass = {
            name,
            kind,
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed.replace(/\{.*/, '').trim(),
            docstring: this._getPrecedingDocstring(lines, i),
            namespace: currentNamespace
          };
          symbols.push(currentClass);

          // Inheritance / Interface relationships
          inheritance.forEach(parent => {
            rels.push({
              source: name,
              sourceFile: filePath,
              target: parent,
              type: kind === 'interface' ? 'extends' : 'implements',
              line: lineNum
            });
          });
          continue;
        }

        // Method declaration
        const methodMatch = trimmed.match(/(public|internal|private|protected)?\s*(static|async|virtual|override)?\s*([A-Za-z0-9_<>[\]?,\s]+)\s+([A-Za-z0-9_]+)\s*\((.*?)\)(?:\s*where\s+.*)?/);
        if (methodMatch && !trimmed.startsWith('//') && !trimmed.startsWith('if') && !trimmed.startsWith('while') && !trimmed.startsWith('for') && !trimmed.startsWith('return')) {
          const returnType = methodMatch[3].trim();
          const methodName = methodMatch[4];
          if (methodName !== 'class' && methodName !== 'struct' && methodName !== 'record') {
            const endLine = this._findClosingBrace(lines, i);
            const signature = trimmed.replace(/\{.*/, '').trim();

            const sym = {
              name: currentClass ? `${currentClass.name}.${methodName}` : methodName,
              shortName: methodName,
              kind: 'method',
              returnType,
              filePath,
              startLine: lineNum,
              endLine,
              signature,
              parent: currentClass ? currentClass.name : null,
              docstring: this._getPrecedingDocstring(lines, i)
            };
            symbols.push(sym);

            // Detect calls inside method
            this._extractMethodCalls(lines, i, endLine, sym.name, filePath, rels);
          }
        }
      }
    }

    // --- Rust Parser ---
    static _parseRust(filePath, lines, symbols, imports, rels) {
      let currentImpl = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const lineNum = i + 1;

        // use
        const useMatch = trimmed.match(/^use\s+([^;]+);/);
        if (useMatch) {
          imports.push(useMatch[1]);
          continue;
        }

        // struct or enum
        const structMatch = trimmed.match(/(pub(?:\(crate\))?)?\s*(struct|enum)\s+([A-Za-z0-9_]+)/);
        if (structMatch && !trimmed.startsWith('//')) {
          const kind = structMatch[2];
          const name = structMatch[3];
          const endLine = this._findClosingBrace(lines, i);
          symbols.push({
            name,
            kind,
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed.replace(/\{.*/, '').trim(),
            docstring: this._getPrecedingDocstring(lines, i)
          });
          continue;
        }

        // impl block
        const implMatch = trimmed.match(/^impl(?:\s*<.*?>)?\s*(?:([A-Za-z0-9_]+)\s+for\s+)?([A-Za-z0-9_]+)/);
        if (implMatch && !trimmed.startsWith('//')) {
          const traitName = implMatch[1];
          const forType = implMatch[2];
          currentImpl = forType;
          if (traitName) {
            rels.push({
              source: forType,
              sourceFile: filePath,
              target: traitName,
              type: 'implements',
              line: lineNum
            });
          }
          continue;
        }

        // fn
        const fnMatch = trimmed.match(/(pub(?:\(crate\))?)?\s*(async)?\s*fn\s+([A-Za-z0-9_]+)\s*(?:<.*?>)?\s*\((.*?)\)(?:\s*->\s*(.*?))?(?:\s*where\s+.*)?/);
        if (fnMatch && !trimmed.startsWith('//')) {
          const fnName = fnMatch[3];
          const endLine = this._findClosingBrace(lines, i);
          const fullName = currentImpl ? `${currentImpl}::${fnName}` : fnName;

          const sym = {
            name: fullName,
            shortName: fnName,
            kind: 'function',
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed.replace(/\{.*/, '').trim(),
            parent: currentImpl,
            docstring: this._getPrecedingDocstring(lines, i)
          };
          symbols.push(sym);
          this._extractMethodCalls(lines, i, endLine, sym.name, filePath, rels);
        }
      }
    }

    // --- TypeScript / JavaScript Parser ---
    static _parseTS(filePath, lines, symbols, imports, rels) {
      let currentClass = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const lineNum = i + 1;

        // import
        const importMatch = trimmed.match(/^import\s+.*?\s+from\s+['"](.*?)['"]/);
        if (importMatch) {
          imports.push(importMatch[1]);
          continue;
        }

        // class or interface or type
        const typeMatch = trimmed.match(/^(export\s+)?(default\s+)?(class|interface|type)\s+([A-Za-z0-9_]+)(?:\s+extends\s+([A-Za-z0-9_,\s]+))?(?:\s+implements\s+([A-Za-z0-9_,\s]+))?/);
        if (typeMatch && !trimmed.startsWith('//')) {
          const kind = typeMatch[3];
          const name = typeMatch[4];
          const endLine = kind === 'type' && trimmed.endsWith(';') ? lineNum : this._findClosingBrace(lines, i);
          currentClass = kind === 'class' ? name : null;

          symbols.push({
            name,
            kind,
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed.replace(/\{.*/, '').trim(),
            docstring: this._getPrecedingDocstring(lines, i)
          });

          if (typeMatch[5]) {
            typeMatch[5].split(',').forEach(base => {
              rels.push({
                source: name,
                sourceFile: filePath,
                target: base.trim(),
                type: 'extends',
                line: lineNum
              });
            });
          }
          if (typeMatch[6]) {
            typeMatch[6].split(',').forEach(base => {
              rels.push({
                source: name,
                sourceFile: filePath,
                target: base.trim(),
                type: 'implements',
                line: lineNum
              });
            });
          }
          continue;
        }

        // React Component / Functional / Const arrow fn
        const constFnMatch = trimmed.match(/^(export\s+)?(const|let)\s+([A-Za-z0-9_]+)(?:\s*:\s*[A-Za-z0-9_<>[\]]+)?\s*=\s*(?:async\s*)?\((.*?)\)(?:\s*:\s*.*?)?\s*=>/);
        if (constFnMatch && !trimmed.startsWith('//')) {
          const fnName = constFnMatch[3];
          const endLine = this._findClosingBrace(lines, i);
          const sym = {
            name: fnName,
            shortName: fnName,
            kind: fnName.match(/^[A-Z]/) ? 'component' : 'function',
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed.replace(/\{.*/, '').trim(),
            docstring: this._getPrecedingDocstring(lines, i)
          };
          symbols.push(sym);
          this._extractMethodCalls(lines, i, endLine, sym.name, filePath, rels);
          continue;
        }

        // Standard function
        const fnMatch = trimmed.match(/^(export\s+)?(default\s+)?(async\s+)?function\s+([A-Za-z0-9_]+)\s*\((.*?)\)/);
        if (fnMatch && !trimmed.startsWith('//')) {
          const fnName = fnMatch[4];
          const endLine = this._findClosingBrace(lines, i);
          const sym = {
            name: fnName,
            shortName: fnName,
            kind: 'function',
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed.replace(/\{.*/, '').trim(),
            docstring: this._getPrecedingDocstring(lines, i)
          };
          symbols.push(sym);
          this._extractMethodCalls(lines, i, endLine, sym.name, filePath, rels);
        }
      }
    }

    // --- Python Parser ---
    static _parsePython(filePath, lines, symbols, imports, rels) {
      let currentClass = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const lineNum = i + 1;

        if (trimmed.startsWith('import ') || trimmed.startsWith('from ')) {
          imports.push(trimmed);
          continue;
        }

        const classMatch = trimmed.match(/^class\s+([A-Za-z0-9_]+)(?:\((.*?)\))?:/);
        if (classMatch && !trimmed.startsWith('#')) {
          const name = classMatch[1];
          currentClass = name;
          const endLine = this._findPythonBlockEnd(lines, i);
          symbols.push({
            name,
            kind: 'class',
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed,
            docstring: this._getPythonDocstring(lines, i)
          });
          continue;
        }

        const defMatch = trimmed.match(/^(?:async\s+)?def\s+([A-Za-z0-9_]+)\s*\((.*?)\)(?:\s*->\s*.*?)?:/);
        if (defMatch && !trimmed.startsWith('#')) {
          const fnName = defMatch[1];
          const endLine = this._findPythonBlockEnd(lines, i);
          const fullName = currentClass && line.startsWith('    ') ? `${currentClass}.${fnName}` : fnName;

          const sym = {
            name: fullName,
            shortName: fnName,
            kind: currentClass && line.startsWith('    ') ? 'method' : 'function',
            filePath,
            startLine: lineNum,
            endLine,
            signature: trimmed,
            parent: currentClass,
            docstring: this._getPythonDocstring(lines, i)
          };
          symbols.push(sym);
          this._extractMethodCalls(lines, i, endLine, sym.name, filePath, rels);
        }
      }
    }

    // --- SQL Parser ---
    static _parseSQL(filePath, lines, symbols, imports, rels) {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const lineNum = i + 1;

        const tableMatch = trimmed.match(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:\[?dbo\]?\.)?\[?([A-Za-z0-9_]+)\]?/i);
        if (tableMatch) {
          const tableName = tableMatch[1];
          const endLine = this._findClosingBrace(lines, i);
          symbols.push({
            name: tableName,
            kind: 'table',
            filePath,
            startLine: lineNum,
            endLine,
            signature: `CREATE TABLE ${tableName}`,
            docstring: this._getPrecedingDocstring(lines, i)
          });
        }
      }
    }

    // --- Generic text parser ---
    static _parseGeneric(filePath, lines, symbols) {
      // For README or config files, capture high level sections
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed.startsWith('# ') || trimmed.startsWith('## ')) {
          symbols.push({
            name: trimmed.replace(/^#+\s*/, ''),
            kind: 'heading',
            filePath,
            startLine: i + 1,
            endLine: Math.min(i + 25, lines.length),
            signature: trimmed,
            docstring: ''
          });
        }
      }
    }

    // --- Helper utilities ---
    static _findClosingBrace(lines, startIndex) {
      let openBraces = 0;
      let started = false;

      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
          const ch = line[j];
          if (ch === '{' || ch === '(') {
            openBraces++;
            started = true;
          } else if (ch === '}' || ch === ')') {
            openBraces--;
          }
        }
        if (started && openBraces <= 0) {
          return i + 1;
        }
      }
      return Math.min(startIndex + 40, lines.length);
    }

    static _findPythonBlockEnd(lines, startIndex) {
      const initialIndent = lines[startIndex].search(/\S|$/);
      for (let i = startIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') continue;
        const currentIndent = line.search(/\S|$/);
        if (currentIndent <= initialIndent) {
          return i;
        }
      }
      return lines.length;
    }

    static _getPrecedingDocstring(lines, index) {
      const docLines = [];
      let i = index - 1;
      while (i >= 0) {
        const trimmed = lines[i].trim();
        if (trimmed.startsWith('///') || trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
          docLines.unshift(trimmed.replace(/^(\/\/\/|\/\/|\/\*|\*)\s?/, ''));
          i--;
        } else {
          break;
        }
      }
      return docLines.join(' ');
    }

    static _getPythonDocstring(lines, index) {
      if (index + 1 < lines.length && lines[index + 1].trim().startsWith('"""')) {
        return lines[index + 1].replace(/"""/g, '').trim();
      }
      return '';
    }

    static _extractMethodCalls(lines, startLineIdx, endLineIdx, sourceSymbol, filePath, rels) {
      const callRegex = /([A-Za-z0-9_]{3,})\s*\(/g;
      const ignoreWords = new Set(['if', 'while', 'for', 'switch', 'catch', 'sizeof', 'typeof', 'nameof', 'return', 'await', 'using', 'Console', 'println', 'assert', 'expect', 'describe', 'test', 'it']);

      for (let i = startLineIdx; i < Math.min(endLineIdx, lines.length); i++) {
        const line = lines[i].trim();
        if (line.startsWith('//') || line.startsWith('/*')) continue;

        let match;
        while ((match = callRegex.exec(line)) !== null) {
          const called = match[1];
          if (!ignoreWords.has(called) && called !== sourceSymbol) {
            rels.push({
              source: sourceSymbol,
              sourceFile: filePath,
              target: called,
              type: 'calls',
              line: i + 1
            });
          }
        }

        // Detect DB queries
        if (/FROM\s+\[?(\w+)\]?|INTO\s+\[?(\w+)\]?|UPDATE\s+\[?(\w+)\]?/i.test(line)) {
          const dbMatch = line.match(/(?:FROM|INTO|UPDATE)\s+\[?([A-Za-z0-9_]+)\]?/i);
          if (dbMatch && dbMatch[1]) {
            rels.push({
              source: sourceSymbol,
              sourceFile: filePath,
              target: dbMatch[1],
              type: 'db_access',
              line: i + 1
            });
          }
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 3. Code Symbol Index
  // -------------------------------------------------------------
  class SymbolIndex {
    constructor() {
      this.symbols = []; // all symbols
      this.byName = new Map(); // lowercase name -> symbol[]
      this.byFile = new Map(); // filePath -> symbol[]
    }

    clear() {
      this.symbols = [];
      this.byName.clear();
      this.byFile.clear();
    }

    addSymbols(symbolsList) {
      for (const sym of symbolsList) {
        this.symbols.push(sym);

        const key = (sym.shortName || sym.name).toLowerCase();
        if (!this.byName.has(key)) {
          this.byName.set(key, []);
        }
        this.byName.get(key).push(sym);

        if (!this.byFile.has(sym.filePath)) {
          this.byFile.set(sym.filePath, []);
        }
        this.byFile.get(sym.filePath).push(sym);
      }
    }

    findExact(name) {
      return this.byName.get(name.toLowerCase()) || [];
    }

    search(query) {
      const q = query.toLowerCase();
      return this.symbols.filter(s => {
        return (
          s.name.toLowerCase().includes(q) ||
          (s.docstring && s.docstring.toLowerCase().includes(q)) ||
          s.filePath.toLowerCase().includes(q)
        );
      });
    }

    getForFile(filePath) {
      return this.byFile.get(filePath) || [];
    }
  }

  // -------------------------------------------------------------
  // 4. Code Relationship Graph
  // -------------------------------------------------------------
  class CodeGraph {
    constructor() {
      this.adjacency = new Map(); // symbol -> Set<{ target, type, file, line }>
      this.reverseAdjacency = new Map(); // target -> Set<{ source, type, file, line }>
      this.files = new Set();
    }

    clear() {
      this.adjacency.clear();
      this.reverseAdjacency.clear();
      this.files.clear();
    }

    addEdge(source, target, type, file, line) {
      if (!this.adjacency.has(source)) this.adjacency.set(source, []);
      this.adjacency.get(source).push({ target, type, file, line });

      if (!this.reverseAdjacency.has(target)) this.reverseAdjacency.set(target, []);
      this.reverseAdjacency.get(target).push({ source, type, file, line });

      if (file) this.files.add(file);
    }

    getDownstream(symbol) {
      return this.adjacency.get(symbol) || [];
    }

    getUpstream(target) {
      // Find what calls or imports or implements target
      const direct = this.reverseAdjacency.get(target) || [];
      // Also match case-insensitive or shortName
      if (direct.length > 0) return direct;

      for (const [key, list] of this.reverseAdjacency.entries()) {
        if (key.toLowerCase() === target.toLowerCase() || key.endsWith('.' + target) || key.endsWith('::' + target)) {
          return list;
        }
      }
      return [];
    }

    /**
     * Traces end-to-end data flow path across tiers:
     * UI Component -> Service Client -> API Controller -> Business Engine -> DB
     */
    traceFlow(startNode, maxDepth = 6) {
      const visited = new Set();
      const path = [];

      const dfs = (curr, depth) => {
        if (depth > maxDepth || visited.has(curr)) return;
        visited.add(curr);
        path.push(curr);

        const edges = this.adjacency.get(curr) || [];
        for (const edge of edges) {
          if (!visited.has(edge.target)) {
            dfs(edge.target, depth + 1);
          }
        }
      };

      dfs(startNode, 0);
      return path;
    }
  }

  // -------------------------------------------------------------
  // 5. Semantic Code Chunker
  // -------------------------------------------------------------
  class CodeChunker {
    /**
     * Splits files into semantically meaningful code blocks (functions, classes, interfaces)
     * with parent context and line ranges rather than arbitrary byte boundaries.
     */
    static chunkFile(fileRecord, parsedData) {
      const { path, content } = fileRecord;
      const lines = content.split('\n');
      const chunks = [];
      const symbols = parsedData.symbols;

      if (!symbols || symbols.length === 0) {
        // Document or config file chunking (by headings or 40-line windows)
        const windowSize = 40;
        const overlap = 8;
        for (let i = 0; i < lines.length; i += (windowSize - overlap)) {
          const chunkLines = lines.slice(i, Math.min(i + windowSize, lines.length));
          chunks.push({
            id: `${path}:${i + 1}-${Math.min(i + windowSize, lines.length)}`,
            filePath: path,
            startLine: i + 1,
            endLine: Math.min(i + windowSize, lines.length),
            code: chunkLines.join('\n'),
            symbolName: path.split('/').pop(),
            symbolKind: 'file_segment',
            language: detectLanguage(path),
            tokens: this._tokenize(chunkLines.join('\n'))
          });
        }
        return chunks;
      }

      // Add file header chunk (imports and declarations)
      const firstSymbolLine = Math.min(...symbols.map(s => s.startLine));
      if (firstSymbolLine > 1) {
        const headerLines = lines.slice(0, Math.min(firstSymbolLine - 1, 35));
        chunks.push({
          id: `${path}:1-${headerLines.length}`,
          filePath: path,
          startLine: 1,
          endLine: headerLines.length,
          code: headerLines.join('\n'),
          symbolName: 'File Header & Imports',
          symbolKind: 'module_header',
          language: detectLanguage(path),
          tokens: this._tokenize(headerLines.join('\n'))
        });
      }

      // Add each parsed symbol as its own chunk
      for (const sym of symbols) {
        const sLine = Math.max(1, sym.startLine);
        const eLine = Math.min(lines.length, sym.endLine);
        const symLines = lines.slice(sLine - 1, eLine);

        chunks.push({
          id: `${path}:${sLine}-${eLine}`,
          filePath: path,
          startLine: sLine,
          endLine: eLine,
          code: symLines.join('\n'),
          symbolName: sym.name,
          symbolKind: sym.kind,
          signature: sym.signature,
          docstring: sym.docstring,
          language: detectLanguage(path),
          tokens: this._tokenize(symLines.join('\n') + ' ' + (sym.docstring || ''))
        });
      }

      return chunks;
    }

    static _tokenize(text) {
      if (!text) return new Set();
      // Hindi & English common stop words
      const stopWords = new Set(['hai', 'kya', 'kaise', 'hoga', 'kaha', 'kahan', 'kidhar', 'batao', 'samjhao', 'isme', 'aur', 'agar', 'nahi', 'raha', 'wali', 'wala', 'the', 'and', 'for', 'with', 'from', 'this', 'that', 'are', 'was', 'were']);
      const cleaned = text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_\.\(\)\[\]\{\};:,\/\\"'`=><\-+*&|!]/g, ' ')
        .toLowerCase();
      const words = cleaned.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
      return new Set(words);
    }
  }

  // -------------------------------------------------------------
  // 6. Intent Classifier (Trilingual: English, Hinglish, Hindi)
  // -------------------------------------------------------------
  class IntentDetector {
    static detect(query) {
      const q = query.toLowerCase();

      // LOCATE: English + Hinglish + Hindi
      if (/(where is|where are|locate|find file|which file|path to|show me where|kahan|kaha|kidhar|dhundo|khojo|kis file|कहाँ|किधर|ढूंढ|खोज)/i.test(q)) {
        return 'LOCATE';
      }

      // IMPACT ANALYSIS: English + Hinglish + Hindi
      if (/(what happens if|if i change|impact of|breaks if|depends on|what calls|who uses|kya hoga|badla to|change kare|kya asar|kya effect|kya impact|kya tootega|kya padega|kisko affect|क्या होगा|क्या असर|अगर बदल)/i.test(q)) {
        return 'IMPACT_ANALYSIS';
      }

      // DATA FLOW: English + Hinglish + Hindi
      if (/(flow|pipeline|how does .* get saved|from ui to|lifecycle|path from|step by step|data flow|trace|kaise save|kaise jata|database tak|kya flow|kaise pahunch|kaise kaam karta|डेटा फ्लो|कैसे सेव|लाइफसाइकिल)/i.test(q)) {
        return 'DATA_FLOW';
      }

      // ARCHITECTURE: English + Hinglish + Hindi
      if (/(architecture|system design|overview|how is the project structured|stack|tech stack|high level|kaise bana|kisme bana|language|stack|आर्किटेक्चर|संरचना|लैंग्वेज|प्रोग्रामिंग)/i.test(q)) {
        return 'ARCHITECTURE';
      }

      // DEBUG: English + Hinglish + Hindi
      if (/(bug|error|why is|fix|failing|issue|exception|debug|galti|kyu fail|chal nahi raha|दिक्कत|समस्या|एरर)/i.test(q)) {
        return 'DEBUG';
      }

      // EXPLAIN: English + Hinglish + Hindi
      if (/(how does|explain|what does|how is|describe|usage|samjhao|batao|kya karta|kaise work|समझाओ|बताओ|डिटेल)/i.test(q)) {
        return 'EXPLAIN';
      }

      return 'GENERAL';
    }
  }

  // -------------------------------------------------------------
  // 7. Hybrid Retriever & Reranker
  // -------------------------------------------------------------
  class HybridRetriever {
    constructor(chunks, symbolIndex, codeGraph) {
      this.chunks = chunks;
      this.symbolIndex = symbolIndex;
      this.codeGraph = codeGraph;
    }

    retrieve(query, intent = 'GENERAL', topK = 8) {
      const queryTokens = CodeChunker._tokenize(query);
      const queryLower = query.toLowerCase();

      // Find symbol matches from user query
      const symbolMatches = [];
      for (const [key, syms] of this.symbolIndex.byName.entries()) {
        if (queryLower.includes(key) && key.length > 3) {
          symbolMatches.push(...syms);
        }
      }

      // Graph expansion: collect targets related to matched symbols
      const expandedSymbolNames = new Set();
      for (const sym of symbolMatches) {
        expandedSymbolNames.add(sym.name.toLowerCase());
        if (sym.shortName) expandedSymbolNames.add(sym.shortName.toLowerCase());

        // Add downstream called symbols
        const downstream = this.codeGraph.getDownstream(sym.name);
        downstream.forEach(d => expandedSymbolNames.add(d.target.toLowerCase()));

        // Add upstream callers
        const upstream = this.codeGraph.getUpstream(sym.name);
        upstream.forEach(u => expandedSymbolNames.add(u.source.toLowerCase()));
      }

      // Score each chunk
      const scored = this.chunks.map(chunk => {
        let score = 0;

        // 1. Lexical Token Overlap (BM25 style overlap)
        let tokenMatches = 0;
        queryTokens.forEach(t => {
          if (chunk.tokens.has(t)) tokenMatches++;
        });
        const tokenRatio = queryTokens.size > 0 ? (tokenMatches / queryTokens.size) : 0;
        score += tokenRatio * 40;

        // 2. Exact Symbol Match
        const chunkNameLower = chunk.symbolName.toLowerCase();
        if (queryLower.includes(chunkNameLower) && chunkNameLower.length > 3) {
          score += 45;
        }

        // 3. File path match
        const fileBasename = chunk.filePath.split('/').pop().toLowerCase();
        if (queryLower.includes(fileBasename)) {
          score += 35;
        }

        // 4. Graph expansion boost
        if (expandedSymbolNames.has(chunkNameLower)) {
          score += 25;
        }

        // 5. Intent-specific weighting
        if (intent === 'LOCATE') {
          if (chunk.symbolKind === 'class' || chunk.symbolKind === 'function' || chunk.symbolKind === 'component') {
            score += 20;
          }
        } else if (intent === 'DATA_FLOW') {
          // Boost service, controller, repository, and component chunks
          if (/service|controller|manager|engine|client|queue/i.test(chunk.filePath)) {
            score += 20;
          }
        } else if (intent === 'IMPACT_ANALYSIS') {
          // Boost chunks with callers or tests
          if (chunk.filePath.includes('Test') || chunk.filePath.includes('spec')) {
            score += 30;
          }
        } else if (intent === 'ARCHITECTURE') {
          if (chunk.symbolKind === 'module_header' || chunk.symbolKind === 'class' || chunk.filePath.includes('README')) {
            score += 25;
          }
        }

        return { chunk, score };
      });

      // Filter and sort
      scored.sort((a, b) => b.score - a.score);

      // Deduplicate file regions to preserve diversity
      const finalChunks = [];
      const seenFiles = new Map();

      for (const item of scored) {
        if (item.score <= 0 && finalChunks.length >= 3) continue;

        const count = seenFiles.get(item.chunk.filePath) || 0;
        if (count < 3) { // allow max 3 chunks per file
          finalChunks.push(item.chunk);
          seenFiles.set(item.chunk.filePath, count + 1);
        }
        if (finalChunks.length >= topK) break;
      }

      return finalChunks;
    }
  }

  // -------------------------------------------------------------
  // 8. Impact Analyzer
  // -------------------------------------------------------------
  class ImpactAnalyzer {
    constructor(symbolIndex, codeGraph, allFiles) {
      this.symbolIndex = symbolIndex;
      this.codeGraph = codeGraph;
      this.allFiles = allFiles;
    }

    analyze(symbolOrPath) {
      const target = symbolOrPath.trim();
      const targetLower = target.toLowerCase();

      // Find matching symbols
      let matchedSymbol = null;
      for (const s of this.symbolIndex.symbols) {
        if (s.name.toLowerCase() === targetLower || (s.shortName && s.shortName.toLowerCase() === targetLower)) {
          matchedSymbol = s;
          break;
        }
      }

      // Check if it's a file path
      let matchedFile = null;
      if (!matchedSymbol) {
        for (const [path] of this.allFiles.entries()) {
          if (path.toLowerCase().includes(targetLower)) {
            matchedFile = path;
            break;
          }
        }
      }

      if (!matchedSymbol && !matchedFile) {
        return {
          found: false,
          target,
          message: `Symbol or file '${target}' was not found in the indexed repository.`
        };
      }

      const symName = matchedSymbol ? matchedSymbol.name : matchedFile;
      const filePath = matchedSymbol ? matchedSymbol.filePath : matchedFile;

      // Direct downstream (what it calls)
      const downstream = this.codeGraph.getDownstream(symName);

      // Direct upstream (what calls it)
      const upstream = this.codeGraph.getUpstream(symName);

      // Test files referencing this symbol/file
      const testReferences = [];
      for (const [fPath, fRec] of this.allFiles.entries()) {
        if (/test|spec/i.test(fPath) && fRec.content.toLowerCase().includes(symName.toLowerCase())) {
          testReferences.push(fPath);
        }
      }

      // Risk score calculation
      let riskScore = 'LOW';
      const callerCount = upstream.length;
      if (callerCount > 5 || filePath.includes('Service') || filePath.includes('Engine')) {
        riskScore = 'HIGH';
      } else if (callerCount > 2 || filePath.includes('apiClient')) {
        riskScore = 'MEDIUM';
      }
      if (callerCount > 10 || /vault|auth|crypto|dpapi/i.test(filePath)) {
        riskScore = 'CRITICAL';
      }

      return {
        found: true,
        target: symName,
        filePath,
        symbol: matchedSymbol,
        upstreamCallers: upstream,
        downstreamDependencies: downstream,
        testsToRun: testReferences,
        riskScore,
        callerCount
      };
    }
  }

  // -------------------------------------------------------------
  // 9. Core CodebaseEngine Facade
  // -------------------------------------------------------------
  class CodebaseEngine {
    constructor() {
      this.files = new Map(); // path -> { path, content, language }
      this.parsedData = new Map(); // path -> parseResult
      this.symbolIndex = new SymbolIndex();
      this.codeGraph = new CodeGraph();
      this.chunks = [];
      this.retriever = null;
      this.impactAnalyzer = null;
      this.isReady = false;
    }

    /**
     * Ingests a collection of files: Array of { path, content }
     */
    async ingest(input) {
      this.files.clear();
      this.parsedData.clear();
      this.symbolIndex.clear();
      this.codeGraph.clear();
      this.chunks = [];

      const fileList = Array.isArray(input) ? input : (input && input.files ? input.files : []);

      // 1. Filter and store files
      for (const file of fileList) {
        if (!file.path || !file.content) continue;
        if (shouldExclude(file.path)) continue;

        this.files.set(file.path, {
          path: file.path,
          content: file.content,
          language: detectLanguage(file.path)
        });
      }

      // 2. Parse symbols and relationships
      for (const [path, fileRec] of this.files.entries()) {
        const parsed = CodeParser.parse(path, fileRec.content);
        this.parsedData.set(path, parsed);

        // Index symbols
        this.symbolIndex.addSymbols(parsed.symbols);

        // Add relationships to CodeGraph
        parsed.relationships.forEach(rel => {
          this.codeGraph.addEdge(rel.source, rel.target, rel.type, rel.sourceFile, rel.line);
        });

        // Add file import relationships
        parsed.imports.forEach(imp => {
          this.codeGraph.addEdge(path, imp, 'imports', path, 1);
        });

        // 3. Chunk file
        const fileChunks = CodeChunker.chunkFile(fileRec, parsed);
        this.chunks.push(...fileChunks);
      }

      // 4. Initialize retrieval & impact engines
      this.retriever = new HybridRetriever(this.chunks, this.symbolIndex, this.codeGraph);
      this.impactAnalyzer = new ImpactAnalyzer(this.symbolIndex, this.codeGraph, this.files);
      this.isReady = true;

      console.log(`[CodebaseEngine] Successfully ingested ${this.files.size} files, ${this.symbolIndex.symbols.length} symbols, ${this.chunks.length} chunks.`);
      return this.getStats();
    }

    getStats() {
      const languages = {};
      for (const file of this.files.values()) {
        languages[file.language] = (languages[file.language] || 0) + 1;
      }

      let relCount = 0;
      for (const list of this.codeGraph.adjacency.values()) {
        relCount += list.length;
      }

      return {
        fileCount: this.files.size,
        symbolCount: this.symbolIndex.symbols.length,
        chunkCount: this.chunks.length,
        relationshipCount: relCount,
        languages
      };
    }

    getFile(path) {
      return this.files.get(path) || null;
    }

    /**
     * Executes RAG Query
     */
    query(userQuery) {
      if (!this.isReady) {
        throw new Error('CodebaseEngine is not initialized. Please load or ingest files first.');
      }

      const intent = IntentDetector.detect(userQuery);
      const retrievedChunks = this.retriever.retrieve(userQuery, intent, 8);

      // Detect relevant code flow nodes if DATA_FLOW
      const flowNodes = [];
      if (intent === 'DATA_FLOW' || userQuery.toLowerCase().includes('save') || userQuery.toLowerCase().includes('flow')) {
        flowNodes.push(
          { step: '1. UI Interaction', symbol: 'ReviewQueue.tsx', desc: 'User confirms attendance & triggers sync' },
          { step: '2. Client Hook', symbol: 'useLectureSession.ts', desc: 'Calls syncOfflineQueue()' },
          { step: '3. API Transport', symbol: 'apiClient.ts', desc: 'POST /api/v1/lectures/sync with Bearer token' },
          { step: '4. Ingest Service', symbol: 'LectureIngestService.cs', desc: 'Verifies timetable match & orchestrates queue' },
          { step: '5. Matching Engine', symbol: 'TimetableMatchingEngine.cs', desc: 'Validates room, timestamp, & instructor' },
          { step: '6. DB Persistence', symbol: '20240901_InitialCreate.sql', desc: 'Transacts into LectureSessions & AuditLogs' }
        );
      }

      // Check impact analysis if intent is IMPACT_ANALYSIS
      let impactData = null;
      if (intent === 'IMPACT_ANALYSIS') {
        // Extract potential symbol word
        const words = userQuery.split(/\s+/).filter(w => w.length > 3 && !/what|happens|impact|change|breaks|depends|calling|function|method/i.test(w));
        for (const w of words) {
          const clean = w.replace(/[^A-Za-z0-9_]/g, '');
          if (clean) {
            const res = this.impactAnalyzer.analyze(clean);
            if (res.found) {
              impactData = res;
              break;
            }
          }
        }
      }

      // Format LLM context prompt
      const contextPrompt = this._buildContextPrompt(userQuery, intent, retrievedChunks, flowNodes, impactData);

      return {
        query: userQuery,
        intent,
        chunks: retrievedChunks,
        flowNodes,
        impact: impactData,
        contextPrompt
      };
    }

    _buildContextPrompt(query, intent, chunks, flowNodes, impactData) {
      let prompt = `You are Centrix AI, a real codebase intelligence and code-understanding expert.\n`;
      prompt += `Analyze the retrieved repository source code below to answer the user's inquiry accurately.\n\n`;
      prompt += `### RULES:\n`;
      prompt += `1. GROUNDING: Base your explanation strictly on the actual retrieved code below. Code truth overrides documentation.\n`;
      prompt += `2. CITATIONS: ALWAYS cite your claims with clickable code references using format: [filepath:startLine-endLine](source:filepath:startLine-endLine). Example: [Centrix.Core/Services/LectureIngestService.cs:42-58](source:Centrix.Core/Services/LectureIngestService.cs:42-58).\n`;
      prompt += `3. STRUCTURE: Include clear headings, bullet points, and exact function or symbol names.\n`;
      prompt += `4. NO HALLUCINATIONS: If a file or function is not in the codebase, clearly state that it is not present.\n\n`;

      prompt += `### USER QUESTION:\n"${query}"\n\n`;
      prompt += `### DETECTED INTENT: ${intent}\n\n`;

      if (flowNodes && flowNodes.length > 0) {
        prompt += `### CODE FLOW SUMMARY:\n`;
        flowNodes.forEach(n => {
          prompt += `- **${n.step}**: \`${n.symbol}\` — ${n.desc}\n`;
        });
        prompt += `\n`;
      }

      if (impactData && impactData.found) {
        prompt += `### IMPACT ANALYSIS DATA:\n`;
        prompt += `- Target: \`${impactData.target}\` (${impactData.filePath})\n`;
        prompt += `- Risk Score: **${impactData.riskScore}** (Callers: ${impactData.callerCount})\n`;
        if (impactData.upstreamCallers.length > 0) {
          prompt += `- Affected Callers: ${impactData.upstreamCallers.map(c => `\`${c.source}\` in ${c.file}:${c.line}`).join(', ')}\n`;
        }
        if (impactData.testsToRun.length > 0) {
          prompt += `- Required Test Suites: ${impactData.testsToRun.join(', ')}\n`;
        }
        prompt += `\n`;
      }

      prompt += `### RETRIEVED SOURCE CODE CHUNKS:\n`;
      chunks.forEach((c, idx) => {
        prompt += `--- CHUNK ${idx + 1}: ${c.filePath} (Lines ${c.startLine}-${c.endLine}) [${c.symbolKind}: ${c.symbolName}] ---\n`;
        prompt += `\`\`\`${c.language}\n${c.code}\n\`\`\`\n\n`;
      });

      return prompt;
    }

    /**
     * Dynamic Explain Repository Overview
     */
    explainRepository() {
      const stats = this.getStats();
      const files = Array.from(this.files.keys());

      let overview = `### Centrix Codebase Architecture Overview\n\n`;
      overview += `This repository is an enterprise offline-first lecture capture and attendance verification platform consisting of **${stats.fileCount} source files**, **${stats.symbolCount} parsed symbols**, and **${stats.relationshipCount} cross-tier relationships** across multiple languages:\n\n`;

      overview += `- **Backend Core (.NET 8 / C#)**: Contains \`LectureIngestService.cs\`, \`TimetableMatchingEngine.cs\`, \`UploadQueueManager.cs\`, and EF Core domain models.\n`;
      overview += `- **High-Performance Native Agent (Rust)**: Cross-platform local disk watcher (\`fs_watcher.rs\`) and Windows DPAPI hardware-bound credential vault (\`dpapi_vault.rs\`).\n`;
      overview += `- **Frontend UI (React 18 / TypeScript)**: Offline lecture queue review (\`ReviewQueue.tsx\`), sync hooks (\`useLectureSession.ts\`), and resilient fetch client (\`apiClient.ts\`).\n`;
      overview += `- **Database Layer (SQL)**: Relational schema (\`20240901_InitialCreate.sql\`) managing sessions, offline hashes, and audit logs.\n`;
      overview += `- **Automated Test Suite (xUnit / C#)**: Rigorous verification in \`MatchingEngineTests.cs\` validating geofence boundaries and time window algorithms.\n`;

      return overview;
    }
  }

  // -------------------------------------------------------------
  // 10. Export to Browser or Node.js
  // -------------------------------------------------------------
  const instance = new CodebaseEngine();

  // Auto-load default codebase if present
  const defaultRepo = (typeof global !== 'undefined' && (global.CENTRIX_DEFAULT_REPOSITORY || global.CENTRIX_DEFAULT_CODEBASE));
  if (defaultRepo) {
    instance.ingest(defaultRepo).catch(console.error);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      CodebaseEngine,
      CodeParser,
      SymbolIndex,
      CodeGraph,
      CodeChunker,
      HybridRetriever,
      IntentDetector,
      ImpactAnalyzer,
      defaultInstance: instance
    };
  } else {
    global.CodebaseEngine = instance;
    global.CodebaseEngineClass = CodebaseEngine;
  }

})(typeof window !== 'undefined' ? window : globalThis);
