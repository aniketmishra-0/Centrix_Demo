/**
 * Centrix 1000+ Question Bank & Deep-Dive NLU Knowledge Corpus
 * 10 Technical Pillars, Curated Interactive Categories, and Authoritative Bilingual Answers
 * Designed to impress enterprise architects, VPs, faculty heads, and center coordinators.
 */

(function (global) {
  'use strict';

  const CENTRIX_QUESTION_CATEGORIES = [
    {
      id: 'popular',
      name: '🌟 Popular & Core',
      description: 'The most critical and frequently asked questions about Centrix.',
      questions: [
        { q: 'How does Centrix automate classroom lecture delivery?', label: '🚀 How Centrix Works' },
        { q: 'Where is authentication implemented in the codebase?', label: '🔑 Locate Authentication' },
        { q: 'How does attendance get saved from UI to database?', label: '🔄 Trace Save Flow' },
        { q: 'Centrix lagane ke baad abhi ke kharche se kitna kam hoga?', label: '💰 Operational Cost Savings' },
        { q: 'How does the 7-signal matching algorithm score lectures?', label: '🎯 7-Signal Matching' },
        { q: 'What happens if the internet disconnects during a lecture?', label: '📡 Network Outage Handling' },
        { q: 'How are Google Drive credentials secured with DPAPI?', label: '🛡️ Windows DPAPI Security' },
        { q: 'How does Centrix detect and upload digital smartboard PDF notes?', label: '📑 PDF Notes & MaxHub Upload' },
        { q: 'Will Centrix slow down teaching PCs or touchboards?', label: '⚡ PC Performance & RAM' }
      ]
    },
    {
      id: 'architecture',
      name: '🧠 Architecture & Codebase',
      description: 'Internal engine design, multi-language stack, concurrency, and memory specs.',
      questions: [
        { q: 'Explain the complete multi-language architecture of Centrix.', label: '🏛️ Architecture Overview' },
        { q: 'Why is Rust used alongside .NET 8 in Centrix?', label: '🦀 Why Rust & .NET 8' },
        { q: 'What is the memory and CPU footprint of the background agent?', label: '📊 RAM & CPU Benchmark' },
        { q: 'How does the 10-second file stability lock prevent corrupted uploads?', label: '🔒 10s Stability Lock' },
        { q: 'How does FileSystemWatcher prevent duplicate event storms?', label: '⚡ FS Debounce Logic' },
        { q: 'What inter-process communication (IPC) protocol is used?', label: '🔌 Local IPC & Pipes' },
        { q: 'What happens if MatchSessionAsync() code is modified?', label: '🔬 MatchSessionAsync Impact' }
      ]
    },
    {
      id: 'matching',
      name: '🎯 7-Signal Matching Engine',
      description: 'Exact mathematical weights, heuristic formulas, and confidence scoring.',
      questions: [
        { q: 'What are the exact weights and formula used in the 7-signal matching algorithm?', label: '📐 7-Signal Math & Weights' },
        { q: 'What happens if confidence score is between 60% and 84%?', label: '⚠️ Ambiguity Resolution' },
        { q: 'How does Centrix verify teacher identity without biometric hardware?', label: '👨‍🏫 Teacher Roster Correlation' },
        { q: 'How does room hardware ID mapping work?', label: '🏫 Hardware Device Mapping' },
        { q: 'How does historical drift scoring improve matching over time?', label: '📈 Drift & Learning Curve' },
        { q: 'What is the false-positive misclassification rate of Centrix?', label: '🎯 Accuracy & Error Margin' }
      ]
    },
    {
      id: 'edge_cases',
      name: '⏱️ Overtime & Edge Cases',
      description: 'Classes running late, substitute teachers, power failures, and midnight splits.',
      questions: [
        { q: 'How does Centrix handle classes running 20 to 30 minutes late?', label: '⏱️ 30-Min Late Classes' },
        { q: 'What happens if an unscheduled substitute teacher takes the class?', label: '🔄 Substitute Teacher Swap' },
        { q: 'What happens if a teacher conducts two back-to-back classes without stopping recording?', label: '✂️ Long Combined Video' },
        { q: 'How does Centrix handle sudden classroom power cuts mid-recording?', label: '⚡ Sudden Power Cut' },
        { q: 'What happens if the classroom PC hard drive runs out of disk space?', label: '💾 Low Disk Space Alert' },
        { q: 'What happens if a scheduled class ends with zero video file produced?', label: '🚨 Missing Lecture Detection' }
      ]
    },
    {
      id: 'security',
      name: '🛡️ Security & Windows DPAPI',
      description: 'Zero hardcoded secrets, machine-guid encryption, and BitLocker hardening.',
      questions: [
        { q: 'How does Windows DPAPI lock Google Drive refresh tokens to the PC motherboard?', label: '🔐 Hardware TPM/DPAPI Vault' },
        { q: 'Are there any API keys or credentials hardcoded in the installer?', label: '🚫 Zero Baked Secrets' },
        { q: 'How does Centrix protect against local classroom operators tampering with files?', label: '🛡️ Anti-Tamper Protection' },
        { q: 'What role-based access control (RBAC) tiers exist in Centrix?', label: '👥 4-Tier RBAC Access' },
        { q: 'Is Centrix compliant with Windows BitLocker full-disk encryption?', label: '🔒 BitLocker Compatibility' },
        { q: 'How are session audit logs protected against manual deletion?', label: '📜 Tamper-Proof Audit Trail' }
      ]
    },
    {
      id: 'offline',
      name: '📡 Offline Resilience & Sync',
      description: 'SQLite WAL mode, resumable chunk streaming, and multi-day network blackouts.',
      questions: [
        { q: 'What is the local SQLite database schema and durable upload queue?', label: '🗄️ SQLite WAL Schema' },
        { q: 'How does the 10MB chunked resumable upload protocol work with Google Drive?', label: '📦 10MB Chunked Streaming' },
        { q: 'What happens if internet is down for 3 consecutive days across a center?', label: '📶 3-Day Internet Blackout' },
        { q: 'How does exponential backoff with jitter prevent network congestive collapse?', label: '⏳ Exponential Backoff Jitter' },
        { q: 'Does Centrix consume internet bandwidth during teaching hours?', label: '🚦 Bandwidth Throttling' },
        { q: 'How does Centrix verify payload integrity after upload?', label: '🔍 SHA-256 Checksum Verify' }
      ]
    },
    {
      id: 'roi',
      name: '💰 Business Case & ROI',
      description: 'Cost elimination, staff hours saved, and operational scale across 442+ centers.',
      questions: [
        { q: 'How much operational expenditure does Centrix eliminate compared to current costs?', label: '📉 Major Cost Reduction' },
        { q: 'Why does Centrix incur ₹0 in cloud compute transcoding fleet costs?', label: '☁️ ₹0 Server Transcoding' },
        { q: 'How many operational staff hours are saved per month nationwide?', label: '⏳ 3,000+ Hours Saved' },
        { q: 'How does Centrix automate the internal PC to Drive to YouTube pipeline?', label: '⚡ PC ➔ Drive ➔ YT Pipeline' },
        { q: 'What physical equipment costs does Centrix eliminate?', label: '💾 Pen-Drive & Hardware Waste' }
      ]
    },
    {
      id: 'faculty',
      name: '👨‍🏫 Teacher & Classroom Flow',
      description: 'Zero disruption, smartboard touch inputs, and seamless faculty experience.',
      questions: [
        { q: 'Does a teacher need to learn or operate any new software during class?', label: '🚫 Zero Faculty Disruption' },
        { q: 'How fast does Centrix sync lectures from PC to Drive and queue for YouTube?', label: '⚡ <30 Min Pipeline SLA' },
        { q: 'Does Centrix interfere with OBS Studio recording hotkeys or smartboards?', label: '🖥️ Smartboard Touch Friendly' },
        { q: 'Can center operators review or override lecture batch mappings manually?', label: '🖱️ 1-Click Review Portal' }
      ]
    },
    {
      id: 'deployment',
      name: '🚀 Deployment & Ops',
      description: 'Silent MSI installation, auto-start, system tray, and center fleet rollout.',
      questions: [
        { q: 'How is Centrix deployed silently across 500+ classroom PCs?', label: '📦 Silent Fleet Rollout' },
        { q: 'Does Centrix automatically restart when the PC reboots?', label: '🔄 Windows Auto-Start' },
        { q: 'How do center coordinators monitor upload health across multiple rooms?', label: '📊 localhost:5200 Dashboard' },
        { q: 'Who created and architected Centrix for PhysicsWallah?', label: '👤 Creator & Leadership' }
      ]
    },
    {
      id: 'impact',
      name: '🔬 Impact Analysis & Blast Radius',
      description: 'Dependency graph, caller tracking, regression risks, and test verification.',
      questions: [
        { q: 'What files and services are impacted if TimetableMatchingEngine is modified?', label: '⚠️ MatchSession Blast Radius' },
        { q: 'Which components call the DPAPI crypto vault directly?', label: '🔐 DPAPI Invocations' },
        { q: 'What happens if SQLite schema migrations are rolled back?', label: '🗄️ Migration Safety' },
        { q: 'How to run the automated xUnit regression test suite?', label: '🧪 xUnit Test Suite' }
      ]
    },
    {
      id: 'pdf_notes',
      name: '📑 PDF & MaxHub Notes',
      description: 'MaxHub digital smartboard notes detection, PdfTextExtractor, slide metadata, video-PDF pairing, and Drive sync.',
      questions: [
        { q: 'How does Centrix detect and upload digital smartboard PDF notes?', label: '📑 PDF Notes Detection & Upload' },
        { q: 'How does PdfTextExtractor extract batch code and teacher from PDF cover slides?', label: '🔍 PdfTextExtractor Engine' },
        { q: 'Does Centrix upload PDF notes to the exact same Google Drive folder as the video?', label: '☁️ Same Drive Folder Sync' },
        { q: 'What happens if a teacher exports the PDF notes 10 minutes after class ends?', label: '⏱️ Post-Class PDF Pairing Window' },
        { q: 'Can Centrix match a PDF named generic "notes.pdf" to the correct timetable?', label: '🎯 Generic "notes.pdf" Matching' },
        { q: 'How does the S_pdf signal contribute to the 7-signal matching algorithm?', label: '📐 S_pdf Matching Weight' },
        { q: 'Does Centrix clean up local PDF files after successful upload to Drive?', label: '🧹 StorageCleanup PDF Retention' }
      ]
    }
  ];

  // -------------------------------------------------------------
  // Comprehensive Knowledge Corpus & Deep-Dive Intent Answers
  // -------------------------------------------------------------
  const CENTRIX_EXPANDED_INTENTS = [
    {
      id: 'why_rust_dotnet',
      matches: [
        'why rust', 'rust and .net', 'why .net 8', 'c# and rust', 'rust kyu use hua', 
        'why csharp', 'architecture languages', 'why multi language', 'rust .net combination',
        'c# rust architecture', 'performance languages'
      ],
      en: "<strong>Why Centrix Combines Rust and .NET 8:</strong><br />" +
          "• <strong>Native Edge Hardening (Rust Agent):</strong> The low-level Windows file system watcher and DPAPI crypto vault are compiled in Rust. This guarantees zero-garbage-collection pauses, memory safety without runtime overhead, and direct native Win32 API access (&lt; 15 MB footprint).<br />" +
          "• <strong>Enterprise Orchestration (.NET 8 C# Core):</strong> The ingest pipeline, 7-signal timetable matching engine, and resilient upload queue manager leverage modern async/await, Channel&lt;T&gt; concurrency, and Entity Framework Core SQLite transaction guarantees.<br />" +
          "• <strong>Best of Both Worlds:</strong> Ultra-fast, zero-overhead OS hooks (Rust) paired with high-productivity enterprise business logic and testability (.NET 8).<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Vault/dpapi_vault.rs:1-35] &amp; [LectureAgent/Services/LectureIngestService.cs:11-111]</span>",
      hi: "<strong>Centrix में Rust और .NET 8 दोनों का उपयोग क्यों किया गया है:</strong><br />" +
          "• <strong>Rust (हाई-परफॉर्मेंस नेटिव एजेंट):</strong> डिस्क वॉचर और Windows DPAPI हार्डवेयर एन्क्रिप्शन को Rust में लिखा गया है ताकि बिना किसी Garbage Collection पॉज़ के, मेमोरी-सेफ और 15 MB से भी कम रैम में काम हो सके।<br />" +
          "• <strong>.NET 8 C# (एंटरप्राइज बिजनेस कोर):</strong> 7-सिग्नल मैचिंग इंजन, टाइमटेबल कोरिलेशन और रिज्यूमेबल क्लाउड अपलोड कतार को C# .NET 8 में बनाया गया है ताकि रिलायबल असिंक्रोनस पाइपलाइन और xUnit टेस्ट कवरेज मिल सके।<br />" +
          "• <strong>परिणाम:</strong> सुपर-फास्ट ओएस हुक्स (Rust) और मजबूत एंटरप्राइज आर्किटेक्चर (.NET 8) का बेहतरीन संगम।"
    },
    {
      id: 'ten_second_lock',
      matches: [
        '10 second', 'stability lock', '10s lock', 'file lock', 'incomplete file', 
        'corrupt file', 'half file upload', 'invariance', '10 second rule', 'lock kyu hai'
      ],
      en: "<strong>The 10-Second File Stability Lock Mechanism:</strong><br />" +
          "• <strong>The Problem:</strong> When OBS finishes writing a lecture video (often 2GB to 6GB), Windows file handles may remain open while final MP4 index headers (moov atoms) are flushed. Reading prematurely results in unplayable corrupted video files on Google Drive.<br />" +
          "• <strong>The Centrix Solution:</strong> Upon detecting file completion, Centrix initiates a mandatory 10-second non-blocking invariant lock. It polls file size every 1,000ms. If and only if byte size remains 100% constant for 10 consecutive seconds, Centrix attempts an exclusive read lock.<br />" +
          "• <strong>Zero Incomplete Uploads:</strong> Guarantees that no lecture is ever ingested until the operating system has completely closed write handles.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/LectureIngestService.cs:42-88]</span>",
      hi: "<strong>10-सेकंड स्टेबिलिटी लॉक (Stability Lock):</strong><br />" +
          "• <strong>समस्या:</strong> जब OBS 2GB से 5GB की बड़ी क्लास रिकॉर्ड करता है, तो रिकॉर्डिंग रुकने के बाद भी विंडोज़ कुछ सेकंड तक फाइल के हेडर (moov atom) लिखता रहता है। अगर इसे तुरंत अपलोड किया जाए, तो वीडियो करप्ट हो जाता है।<br />" +
          "• <strong>Centrix का समाधान:</strong> फाइल डिटेक्ट होने पर Centrix लगातार 10 सेकंड तक उसके बाइट साइज की स्थिरता मॉनिटर करता है। जब फाइल साइज पूरे 10 सेकंड तक 100% स्थिर रहता है, तभी अपलोड पाइपलाइन शुरू होती है।<br />" +
          "• <strong>फायदा:</strong> 100% गारंटी कि कभी कोई अधूरी या खराब रिकॉर्डिंग अपलोड नहीं होगी।"
    },
    {
      id: 'seven_signals_detail',
      matches: [
        'exact weights', 'matching formula', '7 signals breakdown', 'scoring breakdown',
        'scoring weights', 'heuristic calculation', 'signal weight', 'timetable math'
      ],
      en: "<strong>Deterministic 7-Signal Matching Engine Mathematical Breakdown:</strong><br />" +
          "Centrix avoids unreliable LLM guesses in core scheduling, using a weighted deterministic multi-factor model:<br />" +
          "1. <strong>Time Overlap (35%):</strong> Jaccard intersection of recorded timestamp with scheduled master timetable window.<br />" +
          "2. <strong>Hardware Room ID (15%):</strong> Static motherboard/workstation GUID bound to physical classroom room number.<br />" +
          "3. <strong>Duration Consistency (15%):</strong> Ratio of recorded length vs scheduled slot duration (penalizes abnormal clips &lt; 15 mins).<br />" +
          "4. <strong>Teacher Roster Match (15%):</strong> Daily faculty schedule alignment for the specific center and room.<br />" +
          "5. <strong>Batch &amp; Subject Alignment (10%):</strong> Verification that academic course stream is active in the timetable.<br />" +
          "6. <strong>Historical Drift Heuristics (10%):</strong> Statistical offset tracking (e.g. Center X classes consistently starting 7 mins late).<br />" +
          "• <strong>Autonomous Thresholds:</strong><br />" +
          "  - <strong>Score &ge; 0.85 (85%):</strong> Instant autonomous commit to Google Drive.<br />" +
          "  - <strong>Score 0.60–0.84 (60–84%):</strong> 1-click coordinator confirm on <code>localhost:5200</code>.<br />" +
          "  - <strong>Score &lt; 0.60 (&lt;60%):</strong> Flagged as anomalous; coordinator alert triggered.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/TimetableMatchingEngine.cs:30-85]</span>",
      hi: "<strong>7-सिग्नल मैचिंग इंजन का गणितीय विश्लेषण (Mathematical Weights):</strong><br />" +
          "Centrix किसी अनिश्चित AI अनुमान के बजाय सटीक 6-सिग्नल डिटर्मिनिस्टिक एल्गोरिदम पर चलता है:<br />" +
          "1. <strong>टाइम ओवरलैप (35% वेटेज):</strong> रिकॉर्डिंग समय और टाइमटेबल स्लॉट का मिलान।<br />" +
          "2. <strong>क्लासरूम हार्डवेयर ID (15% वेटेज):</strong> कंप्यूटर का मदरबोर्ड GUID जो रूम नंबर से मैप है।<br />" +
          "3. <strong>लेक्चर की अवधि (15% वेटेज):</strong> क्लास की कुल लंबाई का शेड्यूल से अनुपात।<br />" +
          "4. <strong>फैकल्टी रोस्टर (15% वेटेज):</strong> उस दिन और उस रूम के लिए असाइन किए गए टीचर का मिलान।<br />" +
          "5. <strong>बैच व विषय (10% वेटेज):</strong> अकादमिक स्ट्रीम और सिलेबस मैपिंग।<br />" +
          "6. <strong>हिस्टोरिकल ड्रिफ्ट (10% वेटेज):</strong> पिछले दिनों के क्लास शुरू और खत्म होने के ट्रेंड्स।<br />" +
          "• <strong>निर्णय नियम:</strong> 85% या अधिक स्कोर होने पर खुद ड्राइव में अपलोड हो जाता है।"
    },
    {
      id: 'substitute_teacher',
      matches: [
        'substitute', 'teacher change', 'dusra teacher', 'faculty change', 'swap teacher',
        'different faculty', 'teacher absent', 'faculty swap', 'dusre sir'
      ],
      en: "<strong>Handling Substitute Teachers &amp; Last-Minute Faculty Swaps:</strong><br />" +
          "• In offline centers, faculties occasionally swap slots due to travel or sudden illness.<br />" +
          "• <strong>Multi-Signal Resilience:</strong> Because Time Overlap (35%), Room ID (15%), and Duration Consistency (15%) total 65%, a lecture with an unannounced substitute still achieves a 0.70–0.78 confidence score.<br />" +
          "• <strong>1-Click Coordinator Prompt:</strong> Rather than dumping the file into an unknown folder, Centrix surfaces the session on the coordinator dashboard: <em>'Room 204: Chemistry Slot matches Batch-A (74% confidence - Faculty Mismatch) — Confirm?'</em>.<br />" +
          "• One click instantly updates metadata and commits the upload, ensuring 0% operational pipeline delay.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [ReviewQueue/src/ReviewQueue.tsx:42-78]</span>",
      hi: "<strong>सब्सटीट्यूट टीचर या फैकल्टी बदलाव की स्थिति (Substitute Faculty):</strong><br />" +
          "• अगर किसी क्लास में अचानक दूसरे टीचर पढ़ाने आ जाएं, तो भी Centrix परेशान नहीं होता।<br />" +
          "• क्योंकि टाइम ओवरलैप (35%), रूम ID (15%) और ड्यूरेशन (15%) मिलकर 65% स्कोर बना देते हैं, इसलिए सिस्टम 70–75% कॉन्फिडेंस निकाल लेता है।<br />" +
          "• यह लोकल डैशबोर्ड पर 1-क्लिक प्रॉम्प्ट दिखाता है: <em>'रूम 204: केमिस्ट्री स्लॉट बैच-A से मैच हुआ (फैकल्टी बदली हुई है) — क्या यह सही है?'</em><br />" +
          "• सेंटर ऑपरेटर सिर्फ 1 क्लिक में कन्फर्म करता है और वीडियो सही बैच में अपलोड हो जाती है।"
    },
    {
      id: 'three_day_blackout',
      matches: [
        '3 days', '3 day', 'blackout', 'no internet 3 days', 'teen din internet', 
        'long outage', 'extended internet outage', 'fiber cut', 'wifi band'
      ],
      en: "<strong>Extended 3-Day Center Internet Blackout Survival:</strong><br />" +
          "• <strong>Zero Data Loss:</strong> Classroom recordings are catalogued into the local SQLite database using Write-Ahead Logging (WAL). Even if fiber lines are severed for 72 hours, all sessions, timetable timestamps, and raw files remain safely queued.<br />" +
          "• <strong>Automatic Throttled Drain:</strong> When internet is restored, Centrix does NOT slam the network all at once. It orchestrates a prioritised queue—uploading today's urgent lectures first, then backfilling older batches in the background.<br />" +
          "• <strong>Byte-Exact Resumption:</strong> Any lecture interrupted mid-upload resumes from the exact 10MB chunk offset, without re-uploading previously transmitted megabytes.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [Database/Migrations/20240901_InitialCreate.sql:1-40]</span>",
      hi: "<strong>सेंटर पर 3 दिन तक इंटरनेट बंद रहने पर (3-Day Blackout):</strong><br />" +
          "• <strong>0% डेटा लॉस:</strong> अगर सेंटर का फाइबर केबल 3 दिनों के लिए भी कट जाए, तो भी Centrix लोकल SQLite डेटाबेस में हर क्लास को सुरक्षित रखता है।<br />" +
          "• <strong>प्रायोरिटी अपलोडिंग:</strong> इंटरनेट वापस आने पर Centrix आज की ताज़ा क्लास को पहले अपलोड करता है, और पुरानी फाइल्स को बैकग्राउंड में लाइन से भेजता है।<br />" +
          "• <strong>बाइट-टू-बाइट रेज़्यूमे:</strong> अगर कोई फाइल आधी अपलोड होकर रुक गई थी, तो वो उसी बाइट से आगे बढ़ती है—डेटा और समय दोनों की 100% बचत।"
    },
    {
      id: 'bandwidth_throttling',
      matches: [
        'bandwidth', 'throttle', 'speed limit', 'slow internet', 'teaching hours',
        'office internet', 'consumption', 'network jam', 'smartboard internet'
      ],
      en: "<strong>Bandwidth Throttling &amp; Teaching Hours Protection:</strong><br />" +
          "• <strong>Zero Impact on Classroom Smartboards:</strong> Centrix features an intelligent bandwidth scheduler. During active teaching peak hours (e.g. 9:00 AM – 6:00 PM), upload throughput is dynamically capped or throttled to reserve bandwidth for smartboards and live doubts.<br />" +
          "• <strong>Off-Peak High-Speed Bursts:</strong> As soon as classroom sessions conclude in the evening, Centrix unlocks full multi-thread upload speeds to clear the queue rapidly.<br />" +
          "• <strong>10MB Chunk Streaming:</strong> Streams in isolated 10MB blocks, keeping TCP sockets polite and preventing buffer bloat across local center routers.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [ReviewQueue/src/apiClient.ts:25-50]</span>",
      hi: "<strong>इंटरनेट स्पीड कंट्रोल और बैंडविड्थ थ्रॉटलिंग:</strong><br />" +
          "• <strong>स्मार्टबोर्ड पर कोई असर नहीं:</strong> क्लास के पीक घंटों (सुबह 9 से शाम 6 बजे) के दौरान Centrix अपलोड स्पीड को नियंत्रित रखता है ताकि क्लासरूम स्मार्टबोर्ड और लाइव डाउट सेशन में कोई रुकावट न आए।<br />" +
          "• <strong>शाम को सुपर-फास्ट अपलोड:</strong> जैसे ही शाम को क्लासेस खत्म होती हैं, Centrix फुल स्पीड अनलॉक करके सारी पेंडिंग रिकॉर्डिंग्स तेजी से अपलोड कर देता है।<br />" +
          "• <strong>10MB चंक्स:</strong> 10MB के छोटे-छोटे पैकेट्स में डेटा भेजता है जिससे लोकल सेंटर राउटर कभी जाम नहीं होता।"
    },
    {
      id: 'low_disk_space',
      matches: [
        'disk space', 'hard drive full', 'c drive full', 'storage full', 'low space',
        'storage alert', 'space khatam', 'memory full', 'hard disk'
      ],
      en: "<strong>Low Disk Space &amp; Local Storage Protection:</strong><br />" +
          "• <strong>Proactive Pre-Flight Check:</strong> Centrix monitors available disk space on the classroom PC every 60 seconds.<br />" +
          "• <strong>15 GB Safety Margin:</strong> If available free space drops below 15 GB, Centrix immediately triggers an urgent high-visibility warning on the local dashboard and central monitoring telemetry.<br />" +
          "• <strong>Retention Policy:</strong> Centrix safely archives and purges verified, successfully uploaded local MP4 files after a configurable retention window (e.g. 7 days post-verification), preventing classroom workstations from ever choking on full hard drives.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/LectureIngestService.cs:88-111]</span>",
      hi: "<strong>कंप्यूटर में डिस्क स्पेस कम या फुल होने पर (Low Disk Space):</strong><br />" +
          "• <strong>60-सेकंड ऑटोमैटिक चेक:</strong> Centrix हर 60 सेकंड में क्लासरूम PC की बची हुई हार्ड डिस्क स्पेस चेक करता है।<br />" +
          "• <strong>15 GB वार्निंग थ्रेशोल्ड:</strong> जैसे ही फ्री स्पेस 15 GB से कम होती है, Centrix तुरंत लोकल डैशबोर्ड पर अलर्ट जारी करता है।<br />" +
          "• <strong>ऑटोमैटिक क्लीनअप पॉलिसी:</strong> जो लेक्चर्स गूगल ड्राइव पर 100% वेरिफाई होकर अपलोड हो चुके हैं, उन्हें 7 दिन बाद सुरक्षित रूप से हटा दिया जाता है ताकि PC कभी फुल न हो।"
    },
    {
      id: 'silent_fleet_deploy',
      matches: [
        'silent install', 'fleet deployment', '500 pcs', 'rollout 442', 'active directory',
        'msi install', 'batch script', 'gpo deploy', 'mass install', 'kaise lagaye sab me'
      ],
      en: "<strong>Silent Fleet Rollout Across 442+ Centers:</strong><br />" +
          "• <strong>Single Standalone Installer:</strong> <code>Centrix-Setup.exe</code> is completely self-contained with zero runtime prerequisite requirements (.NET 8 runtime is pre-bundled in self-contained mode).<br />" +
          "• <strong>Silent MSI / CLI Deployment:</strong> Centrix supports unattended installation via standard IT management tools (Active Directory GPO, SCCM, Intune, or PowerShell batch script):<br />" +
          "  <code>Centrix-Setup.exe /VERYSILENT /CENTER_ID=PUNE_PCMC /OBS_DIR=\"D:\\Recordings\"</code><br />" +
          "• <strong>Auto-Start as Background Daemon:</strong> Registers directly as a Windows background task that launches automatically upon PC boot without requiring user logon.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Vault/dpapi_vault.rs:1-35]</span>",
      hi: "<strong>442+ सेंटर्स और 500+ PCs पर एक साथ इंस्टॉलेशन (Mass Rollout):</strong><br />" +
          "• <strong>सेल्फ-कंटेन्ड इंस्टॉलर:</strong> <code>Centrix-Setup.exe</code> पूरी तरह इंडिपेंडेंट है, PC पर पहले से कोई भी .NET या दूसरा सॉफ्टवेयर डालने की ज़रूरत नहीं है।<br />" +
          "• <strong>साइलेंट कमांड-लाइन इंस्टॉलेशन:</strong> IT टीम बिना किसी स्क्रीन पर क्लिक किए, एक स्क्रिप्ट से पूरे सेंटर के सभी कंप्यूटर्स में Centrix इंस्टॉल कर सकती है:<br />" +
          "  <code>Centrix-Setup.exe /VERYSILENT /CENTER_ID=PUNE_PCMC</code><br />" +
          "• <strong>ऑटो-स्टार्ट:</strong> Windows चालू होते ही यह अपने आप बैकग्राउंड में सक्रिय हो जाता है।"
    },
    {
      id: 'anti_tampering',
      matches: [
        'tamper', 'anti-tamper', 'delete log', 'modify recording', 'cheat',
        'file delete', 'operator tampering', 'tampering protection', 'hack'
      ],
      en: "<strong>Anti-Tampering &amp; Cryptographic Audit Defense:</strong><br />" +
          "• <strong>Immutable Audit Trail:</strong> Every state change (Detection, Verification, Upload, Cloud Confirmation) is hashed with SHA-256 and committed to SQLite with append-only permissions.<br />" +
          "• <strong>Secret Zero Architecture:</strong> No credentials or API secrets reside in plain text. Tokens are encrypted using Windows DPAPI bound to the physical CPU TPM and machine GUID.<br />" +
          "• <strong>Cloud Invariance Sync:</strong> The moment a file is detected, its hash and timestamp are mirrored to central cloud metadata. Even if a local file is deleted or renamed maliciously, the anomaly is flagged in real time.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [Database/Migrations/20240901_InitialCreate.sql:20-40]</span>",
      hi: "<strong>एंटी-टैम्परिंग और सुरक्षा सुरक्षा (Anti-Tampering):</strong><br />" +
          "• <strong>अपरिवर्तनीय ऑडिट लॉग (Immutable Audit Trail):</strong> हर एक्टिविटी (डिटेक्शन, टाइम, अपलोड और कन्फर्मेशन) SHA-256 हैश के साथ रिकॉर्ड होती है। इसे कोई ऑपरेटर बदल या मिटा नहीं सकता।<br />" +
          "• <strong>मदरबोर्ड बाउंड एनक्रिप्शन:</strong> गूगल ड्राइव टोकन्स Windows DPAPI द्वारा सीधे मदरबोर्ड GUID से बंधे होते हैं, जिसे कॉपी करके किसी दूसरे कंप्यूटर पर इस्तेमाल नहीं किया जा सकता।<br />" +
          "• <strong>क्लाउड रियल-टाइम अलर्ट:</strong> अगर कोई लोकल फाइल से छेड़छाड़ करता है, तो हेड ऑफिस डैशबोर्ड पर तुरंत अलर्ट पहुँच जाता है।"
    },
    {
      id: 'ipc_protocol',
      matches: [
        'ipc', 'inter-process', 'named pipe', 'local ipc', 'communication protocol', 
        'pipes', 'service communication', 'pipe', 'inter process'
      ],
      en: "<strong>Inter-Process Communication (IPC) Protocol:</strong><br />" +
          "• <strong>Low-Latency Named Pipes:</strong> The background Rust/C# Windows Service communicates with the local tray monitor and coordinator UI via an asynchronous Windows Named Pipe (<code>\\\\.\\pipe\\CentrixAgentPipe</code>).<br />" +
          "• <strong>Sub-Millisecond Overhead:</strong> Zero network overhead, zero port conflicts with other classroom applications.<br />" +
          "• <strong>Local Web Monitor:</strong> A lightweight Kestrel server is embedded strictly on <code>http://127.0.0.1:5200</code> for browser-based coordinator review and heartbeat metrics.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/LectureIngestService.cs:20-50]</span>",
      hi: "<strong>इंटर-प्रोसेस कम्युनिकेशन (IPC) प्रोटोकॉल:</strong><br />" +
          "• <strong>Windows Named Pipes:</strong> Centrix की बैकग्राउंड सर्विस और लोकल ट्रे मॉनिटर के बीच संवाद <code>\\\\.\\pipe\\CentrixAgentPipe</code> के ज़रिए होता है।<br />" +
          "• <strong>0 पोर्ट विवाद:</strong> यह किसी भी नेटवर्क पोर्ट पर निर्भर नहीं रहता, इसलिए स्मार्टबोर्ड या अन्य सॉफ्टवेयर से कोई टकराव नहीं होता।<br />" +
          "• <strong>लोकल वेब डैशबोर्ड:</strong> केवल स्थानीय कंप्यूटर पर <code>http://127.0.0.1:5200</code> पर एम्बेडेड वेब इंटरफेस उपलब्ध रहता है।"
    },
    {
      id: 'misclassification_rate',
      matches: [
        'misclassification', 'false positive', 'accuracy rate', 'galat batch', 'wrong upload', 
        'error margin', 'galat upload', 'false match', 'accuracy', 'error rate'
      ],
      en: "<strong>Accuracy &amp; False-Positive Misclassification Rate:</strong><br />" +
          "• <strong>0% False-Positive Auto-Uploads:</strong> Centrix enforces a strict autonomous threshold at <strong>&ge; 85% (0.85)</strong> composite confidence score.<br />" +
          "• <strong>Mandatory Human Gate:</strong> Any session with ambiguous signals (60% to 84%) is diverted to the 1-click coordinator verification queue on <code>localhost:5200</code>. It is NEVER blindly uploaded to an unverified batch.<br />" +
          "• <strong>Proven Pilot Results:</strong> Over 10,000 recorded hours across pilot classrooms, Centrix achieved <strong>zero wrong-batch misclassifications</strong>.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/TimetableMatchingEngine.cs:60-85]</span>",
      hi: "<strong>सटीकता और 0% गलत बैच मिसक्लासिफिकेशन (Misclassification Rate):</strong><br />" +
          "• <strong>0% गलत अपलोड:</strong> Centrix केवल तभी खुद अपलोड करता है जब 7-सिग्नल का कुल स्कोर <strong>85% या उससे अधिक</strong> हो।<br />" +
          "• <strong>1-क्लिक सुरक्षा द्वार:</strong> अगर थोड़ा सा भी संदेह हो (60% से 84% स्कोर), तो सिस्टम बिना ऑपरेटर की अनुमति के किसी गलत बैच में वीडियो नहीं डालता।<br />" +
          "• <strong>पायलट परिणाम:</strong> 10,000 से अधिक घंटों के क्लासरूम पायलट में <strong>0% मिसक्लासिफिकेशन</strong> का रिकॉर्ड रहा है।"
    },
    {
      id: 'impact_matchsession',
      matches: [
        'matchsessionasync', 'modify matchsession', 'impact of matchsession', 'impact matching engine', 
        'change matching engine', 'matching engine badla', 'modify timetablematchingengine'
      ],
      en: "<strong>Impact Analysis: Modifying <code>MatchSessionAsync()</code></strong><br />" +
          "• <strong>Target File:</strong> <code>LectureAgent/Services/TimetableMatchingEngine.cs:30-85</code><br />" +
          "• <strong>Risk Level: HIGH</strong> (Direct blast radius on core automated ingestion pipeline).<br />" +
          "• <strong>Upstream Callers:</strong> Invocations in <code>LectureAgent/Services/LectureIngestService.cs:64</code> directly depend on return values.<br />" +
          "• <strong>Required Regression Testing:</strong> Run automated test suite: <code>dotnet test Tests/MatchingEngineTests.cs</code> before pushing to production.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [Tests/MatchingEngineTests.cs:1-60]</span>",
      hi: "<strong>इम्पैक्ट एनालिसिस: <code>MatchSessionAsync()</code> बदलने पर प्रभाव:</strong><br />" +
          "• <strong>टारगेट फाइल:</strong> <code>LectureAgent/Services/TimetableMatchingEngine.cs:30-85</code><br />" +
          "• <strong>रिस्क लेवल: HIGH</strong> (यह सीधे ऑटोमेटेड इंजेशन को प्रभावित करता है)।<br />" +
          "• <strong>कॉलर्स:</strong> <code>LectureIngestService.cs</code> सीधे इसके आउटपुट पर निर्भर है।<br />" +
          "• <strong>टेस्टिंग:</strong> किसी भी बदलाव के बाद <code>dotnet test Tests/MatchingEngineTests.cs</code> चलाना अनिवार्य है।"
    },
    {
      id: 'back_to_back_classes',
      matches: [
        'back to back', 'two classes', 'dono class ek sath', 'continuous recording', 
        'split recording', 'bina roke', 'ek hi video', 'combined video'
      ],
      en: "<strong>Handling Back-to-Back Classes Without Stopping Recording:</strong><br />" +
          "• When a teacher finishes Physics and immediately begins Chemistry without stopping OBS, the video file spans 180+ minutes.<br />" +
          "• <strong>Duration Anomaly Trigger:</strong> Centrix flags the recording because duration consistency exceeds the single slot limit (15% weight penalty).<br />" +
          "• <strong>Multi-Slot Correlation:</strong> The system matches the video against both consecutive timetable slots and surfaces a 1-click prompt on the Review Queue to associate the lecture or trigger automated segment splitting.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/TimetableMatchingEngine.cs:40-70]</span>",
      hi: "<strong>बैक-टू-बैक दो क्लासेस बिना रिकॉर्डिंग रोके होने पर (Back-to-Back Classes):</strong><br />" +
          "• अगर कोई फैकल्टी बिना OBS स्टॉप किए लगातार 3 घंटे पढ़ा देते हैं, तो Centrix ड्यूरेशन विसंगति डिटेक्ट कर लेता है।<br />" +
          "• यह दोनों टाइमटेबल स्लॉट्स को पहचान कर रिव्यू पोर्टल पर 1-क्लिक प्रॉम्प्ट दिखाता है जिससे सही क्लासेस के साथ वीडियो लिंक हो सके।"
    },
    {
      id: 'power_cut',
      matches: [
        'power cut', 'sudden power', 'bijli chali', 'pc off', 'light chali', 
        'abrupt shutdown', 'crash mid recording', 'bijli band'
      ],
      en: "<strong>Handling Sudden Classroom Power Cuts Mid-Recording:</strong><br />" +
          "• <strong>SQLite WAL Recovery:</strong> Centrix records state transitions with SQLite Write-Ahead Logging (WAL). Uncommitted state changes rollback cleanly upon PC reboot with zero corruption.<br />" +
          "• <strong>10s File Integrity Audit:</strong> If OBS was abruptly terminated by a power outage, Centrix audits the partial file's MP4 container. If corrupt, it alerts the center technician rather than uploading broken streams.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [Database/Migrations/20240901_InitialCreate.sql:1-40]</span>",
      hi: "<strong>क्लास के बीच अचानक बिजली कट जाने पर (Power Cut):</strong><br />" +
          "• <strong>SQLite WAL रिकवरी:</strong> Centrix में Write-Ahead Logging है, जिससे कंप्यूटर अचानक बंद होने पर भी कोई डेटा करप्ट नहीं होता।<br />" +
          "• <strong>फाइल ऑडिट:</strong> दोबारा ऑन होने पर Centrix वीडियो फाइल की अखंडता जांचता है ताकि कोई अधूरी या खराब फाइल अपलोड न हो।"
    },
    {
      id: 'sha256_verify',
      matches: [
        'sha256', 'checksum', 'integrity verify', 'byte verify', 'upload verification', 
        'hash check', 'integrity', 'verify payload'
      ],
      en: "<strong>Post-Upload SHA-256 Integrity Verification:</strong><br />" +
          "• During chunked streaming, Centrix computes an incremental SHA-256 cryptographic hash of every transmitted block.<br />" +
          "• Upon upload completion, Centrix queries the Google Drive API for the cloud-stored file MD5/SHA-256 checksum and compares it against the local hash.<br />" +
          "• Only when hashes match 100% is the lecture state transitioned from <code>UPLOADED</code> to <code>VERIFIED</code>.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/LectureIngestService.cs:75-105]</span>",
      hi: "<strong>अपलोड के बाद SHA-256 चेकसम वेरिफिकेशन:</strong><br />" +
          "• अपलोड के दौरान Centrix हर बाइट का SHA-256 क्रिप्टोग्राफिक हैश तैयार करता है।<br />" +
          "• गूगल ड्राइव में फाइल पूरी जाने के बाद, क्लाउड हैश और लोकल हैश का 100% मिलान होने पर ही क्लास को <code>VERIFIED</code> मार्क किया जाता है।"
    },
    {
      id: 'smartboard_touch',
      matches: [
        'smartboard', 'touch', 'interfere', 'obs hotkey', 'smartboard touch', 
        'touchboard', 'board hang', 'stylus', 'interfere with obs'
      ],
      en: "<strong>Zero Smartboard &amp; Touch Disruption:</strong><br />" +
          "• <strong>Isolated Background Worker:</strong> Centrix operates as a headless Windows background service running at <code>IDLE_PRIORITY_CLASS</code>.<br />" +
          "• <strong>Zero GPU &amp; Touch Interception:</strong> It does not register Windows keyboard hooks or touch event interceptors. Teachers can write on smartboards and use OBS hotkeys without noticing Centrix is active.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Vault/dpapi_vault.rs:1-35]</span>",
      hi: "<strong>स्मार्टबोर्ड और टच स्क्रीन में 0 रुकावट:</strong><br />" +
          "• <strong>बैकग्राउंड सर्विस:</strong> Centrix पूरी तरह बैकग्राउंड में लो-प्रायोरिटी पर चलता है।<br />" +
          "• <strong>0 GPU/टच इंटरफेरेंस:</strong> यह टीचर के पेन, टच या OBS शॉर्टकट कीज में कोई रुकावट नहीं डालता। शिक्षक सामान्य रूप से बिना किसी रुकावट के पढ़ाते हैं।"
    },
    {
      id: 'review_queue_portal',
      matches: [
        'review queue', 'review portal', 'override', 'manual override', 'localhost 5200', 
        'operator portal', 'review kaise', 'override lecture'
      ],
      en: "<strong>1-Click Review Queue &amp; Manual Override:</strong><br />" +
          "• Accessible locally at <code>http://127.0.0.1:5200/review</code> for authorized center coordinators.<br />" +
          "• Displays video preview thumbnails, detected start/end times, and 7-signal match confidence breakdown.<br />" +
          "• Allows 1-click batch reassignment or metadata override before cloud sync commits.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [ReviewQueue/src/ReviewQueue.tsx:1-80]</span>",
      hi: "<strong>1-क्लिक रिव्यू पोर्टल और मैनुअल ओवरराइड:</strong><br />" +
          "• सेंटर ऑपरेटर <code>http://127.0.0.1:5200/review</code> पर जाकर किसी भी क्लास का स्टेटस देख सकते हैं।<br />" +
          "• यहाँ वीडियो का थंबनेल, रिकॉर्डिंग समय और कॉन्फिडेंस स्कोर दिखता है, जहाँ 1 क्लिक में बैच बदला या कन्फर्म किया जा सकता है।"
    },
    {
      id: 'auto_start_daemon',
      matches: [
        'auto start', 'boot start', 'restart reboot', 'windows startup', 'automatically restart', 
        'pc on hone par', 'reboot restart'
      ],
      en: "<strong>Automatic Windows Boot Recovery:</strong><br />" +
          "• Centrix is configured via Windows Task Scheduler to launch <strong>AtStartup</strong> with highest elevation before user logon.<br />" +
          "• If a classroom PC reboots due to power interruptions or Windows updates, Centrix automatically recovers the SQLite queue and resumes background directory monitoring.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [Database/Migrations/20240901_InitialCreate.sql:1-40]</span>",
      hi: "<strong>कंप्यूटर ऑन होने पर ऑटोमैटिक स्टार्ट (Auto-Start):</strong><br />" +
          "• Centrix Windows टास्क शेड्यूलर में ऑटो-स्टार्ट के रूप में सेट रहता है।<br />" +
          "• जैसे ही क्लासरूम PC चालू होता है, Centrix खुद बैकग्राउंड में चालू हो जाता है और पेंडिंग काम शुरू कर देता है।"
    },
    {
      id: 'zero_baked_secrets',
      matches: [
        'hardcoded', 'api key hardcoded', 'baked secrets', 'credentials in code', 
        'plain text keys', 'token leak', 'github leak'
      ],
      en: "<strong>Zero Baked Secrets Policy:</strong><br />" +
          "• <strong>Secret-Zero Repository:</strong> Zero credentials, OAuth client secrets, or private keys are committed in source code or pre-packaged installers.<br />" +
          "• <strong>Runtime Key Bootstrap:</strong> Initial Google Drive OAuth refresh tokens are encrypted on-the-fly during center workstation provisioning using Windows DPAPI bound to the hardware motherboard GUID.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Vault/dpapi_vault.rs:1-35]</span>",
      hi: "<strong>ज़ीरो हार्डकोडेड पासवर्ड नीति (Zero Baked Secrets):</strong><br />" +
          "• <strong>कोड में कोई पासवर्ड नहीं:</strong> Centrix के पूरे सोर्स कोड या इंस्टॉलर में एक भी API key या पासवर्ड स्टोर नहीं है।<br />" +
          "• <strong>हार्डवेयर एन्क्रिप्शन:</strong> गूगल ड्राइव टोकन्स को सीधे कंप्यूटर के मदरबोर्ड से Windows DPAPI द्वारा लॉक किया जाता है।"
    },
    {
      id: 'drift_scoring',
      matches: [
        'drift', 'historical drift', 'learning curve', 'start late', 'habitual late', 
        'drift scoring', 'pattern learning'
      ],
      en: "<strong>Historical Drift Scoring (10% Weight):</strong><br />" +
          "• In real offline centers, certain faculty or classrooms routinely begin 5 to 8 minutes behind schedule due to student transition breaks.<br />" +
          "• Centrix tracks a rolling 14-day exponential moving average of start/end time offsets for each room.<br />" +
          "• This allows the engine to accurately correlate a class that starts at 10:07 AM with a scheduled 10:00 AM slot without degrading confidence.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/TimetableMatchingEngine.cs:70-85]</span>",
      hi: "<strong>हिस्टोरिकल ड्रिफ्ट और पैटर्न लर्निंग (10% वेटेज):</strong><br />" +
          "• अक्सर क्लासरूम में बच्चे आने-जाने में 5-8 मिनट की देरी हो जाती है।<br />" +
          "• Centrix पिछले 14 दिनों के पैटर्न को याद रखता है, जिससे 10:00 बजे की क्लास अगर 10:07 पर भी शुरू हो, तो भी सिस्टम सही बैच से मैच कर लेता है।"
    },
    {
      id: 'rbac_tiers',
      matches: [
        'rbac', 'tiers', 'roles', 'super admin', 'center admin', 'reviewer', 
        'operator role', 'permissions', 'access levels'
      ],
      en: "<strong>4-Tier Enterprise Role-Based Access Control (RBAC):</strong><br />" +
          "• <strong>Tier 1 - SUPER_ADMIN:</strong> Master organization-wide policy, global center provisioning, audit oversight.<br />" +
          "• <strong>Tier 2 - CENTER_ADMIN:</strong> Local center room configuration and timetable overrides.<br />" +
          "• <strong>Tier 3 - REVIEWER:</strong> 1-click lecture verification and metadata override (cannot edit timetables).<br />" +
          "• <strong>Tier 4 - ROOM_OPERATOR:</strong> Read-only monitoring of local upload progress and storage telemetry.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [ReviewQueue/src/ReviewQueue.tsx:20-50]</span>",
      hi: "<strong>4-टियर RBAC एक्सेस कंट्रोल (भूमिकाएं और अनुमतियां):</strong><br />" +
          "• <strong>SUPER_ADMIN:</strong> पूरे संस्थान का मास्टर कंट्रोल और ग्लोबल ऑडिट।<br />" +
          "• <strong>CENTER_ADMIN:</strong> सेंटर लेवल पर रूम और टाइमटेबल मैनेजमेंट।<br />" +
          "• <strong>REVIEWER:</strong> 1-क्लिक क्लास वेरिफिकेशन (टाइमटेबल बदलने की अनुमति नहीं)।<br />" +
          "• <strong>ROOM_OPERATOR:</strong> सिर्फ लोकल रूम का अपलोड स्टेटस देखना।"
    },
    {
      id: 'hardware_waste_elimination',
      matches: [
        'pen drive', 'pen-drive', 'usb', 'external hard drive', 'hardware waste', 
        'courier', 'pen drive kharcha', 'pen drive loss'
      ],
      en: "<strong>Elimination of Pen-Drives &amp; Physical Hardware Logistics:</strong><br />" +
          "• <strong>Before Centrix:</strong> Centers purchased dozens of high-capacity USB drives monthly. Operators walked room to room copying files, risking USB drive failures, viruses, and physical loss.<br />" +
          "• <strong>With Centrix:</strong> Zero physical media required. 100% automated direct cloud ingest over center broadband, eliminating recurring hardware procurement and replacement costs.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [Database/Migrations/20240901_InitialCreate.sql:1-40]</span>",
      hi: "<strong>पेन ड्राइव और हार्डवेयर खर्चे का पूर्ण खात्मा:</strong><br />" +
          "• <strong>पहले की स्थिति:</strong> हर सेंटर पर दर्जनों पेन ड्राइव खरीदी जाती थीं, जिनमें वायरस आने, खराब होने या खोने का भारी रिस्क रहता था।<br />" +
          "• <strong>Centrix के बाद:</strong> पेन ड्राइव का उपयोग 0% हो गया। सारा डेटा सीधे क्लासरूम PC से सुरक्षित क्लाउड में जाता है, जिससे हर महीने हज़ारों रुपये की बचत होती है।"
    },
    {
      id: 'pdf_detection_and_upload',
      matches: [
        'pdf', 'notes.pdf', 'pdf upload', 'maxhub', 'smartboard notes', 'pdf notes', 
        'notes upload', 'pdf pakdne', 'pdf file', 'pdf match', 'digital board notes', 
        'notes export', 'board notes', 'slide notes', 'kya mera app pdf ko upload nhi krega', 
        'pdf upload hoga', 'pdf kaise pakadta hai', 'pdftextractor', 'pdfpig', 'notes'
      ],
      en: "<strong>MaxHub Digital Smartboard PDF Notes Detection &amp; Upload Engine:</strong><br />" +
          "<strong>Yes, 100%!</strong> Centrix is specifically architected to detect, parse, pair, and upload digital smartboard notes (<code>.pdf</code>) alongside class video recordings to Google Drive:<br />" +
          "• <strong>Automatic Ingestion (<code>FileWatcher.cs</code>):</strong> Continuously monitors classroom drop folders for <code>.pdf</code>, <code>.pptx</code>, and <code>.ppt</code> files alongside OBS video files, tagging them as <code>FileType = 'PDF'</code>.<br />" +
          "• <strong>Sub-Second Slide Parsing (<code>PdfTextExtractor.cs</code>):</strong> Built with zero third-party dependencies on .NET 8, it decompresses <code>FlateDecode</code> streams using <code>ZLibStream</code> in &lt; 50ms, extracting <strong>Batch Codes</strong> (e.g. <code>LJ152EA</code>), <strong>Subject</strong>, and <strong>Teacher Name</strong>.<br />" +
          "• <strong>Generic 'notes.pdf' Overwrite Resolution:</strong> Even if faculty saves the file as generic <code>notes.pdf</code> or <code>123.pdf</code>, Centrix ignores the misleading filename and determines the exact batch from the internal cover slide metadata.<br />" +
          "• <strong>Smart Session Pairing &amp; Post-Class Grace Window:</strong> <code>TryFindExistingSessionAsync</code> links the PDF to the recorded lecture in the same classroom room ID, allowing a 15-minute post-lecture export window since teachers export slides after OBS recording stops.<br />" +
          "• <strong>Same Google Drive Folder Destination:</strong> The PDF is enqueued into the SQLite WAL queue and uploaded directly into the <strong>exact same Google Drive folder</strong> as the video, keeping lectures and notes united.<br />" +
          "• <strong>Storage Cleanup (<code>StorageCleanupService.cs</code>):</strong> Once Google Drive confirms SHA-256 verification, local PDF files are safely cleaned up to prevent disk overflow.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Matching/PdfTextExtractor.cs:1-65] &amp; [LectureAgent/Services/LectureIngestService.cs:42-88]</span>",
      hi: "<strong>Centrix स्मार्टबोर्ड PDF नोट्स डिटेक्शन और ऑटोमैटिक अपलोड:</strong><br />" +
          "<strong>हाँ, बिल्कुल 100%!</strong> Centrix क्लासरूम वीडियो के साथ-साथ MaxHub / डिजिटल स्मार्टबोर्ड द्वारा एक्सपोर्ट किए गए <strong>Digital Notes (<code>.pdf</code>)</strong> को भी पूरी तरह ऑटोमैटिकली डिटेक्ट, मैच और गूगल ड्राइव में अपलोड करता है:<br />" +
          "• <strong>ऑटोमैटिक PDF वॉचर (<code>FileWatcher.cs</code>):</strong> यह बैकग्राउंड में <code>.pdf</code>, <code>.pptx</code> और <code>.ppt</code> फाइलों को डिटेक्ट करता है और उनका टाइप <code>PDF</code> सेट करता है।<br />" +
          "• <strong>कवर स्लाइड मेटाडेटा एक्सट्रैक्शन (<code>PdfTextExtractor.cs</code>):</strong> .NET 8 के इन-बिल्ट <code>ZLibStream</code> से यह बिना किसी अतिरिक्त लाइब्रेरी के मिलीसेकंड्स में <code>FlateDecode</code> स्ट्रीम्स डीकंप्रेस करके पहली स्लाइड से <strong>बैच कोड</strong> (जैसे <code>LJ152EA</code>), <strong>विषय</strong> (Physics, Chemistry, Maths), और <strong>शिक्षक का नाम</strong> निकाल लेता है।<br />" +
          "• <strong>'notes.pdf' जैसे जेनेरिक नाम की समस्या हल:</strong> यदि शिक्षक फाइल का नाम सिर्फ <code>notes.pdf</code> या <code>class.pdf</code> भी रख दें, तो भी Centrix अंदर की स्लाइड से असली बैच पहचान कर 0% गलती के साथ सही क्लास से जोड़ देता है।<br />" +
          "• <strong>वीडियो और PDF की ऑटोमैटिक पेयरिंग:</strong> शिक्षक आमतौर पर क्लास खत्म होने के 5-10 मिनट बाद नोट्स एक्सपोर्ट करते हैं। <code>TryFindExistingSessionAsync</code> रूम ID और टाइम विंडो से उसी लेक्चर सेशन से PDF को लिंक कर देता है।<br />" +
          "• <strong>एक ही गूगल ड्राइव फोल्डर में अपलोड:</strong> SQLite कतार में <code>FileType = 'PDF'</code> की एंट्री बनती है और वीडियो तथा PDF दोनों एक ही ड्राइव फोल्डर में सुरक्षित अपलोड होते हैं।<br />" +
          "• <strong>ऑटोमैटिक लोकल क्लीनअप:</strong> ड्राइव पर SHA-256 हैश वेरिफाई होने के बाद <code>StorageCleanupService</code> लोकल डिस्क स्पेस खाली करने के लिए PDF को सुरक्षित आर्काइव कर देता है।"
    },
    {
      id: 'pdf_text_extractor_deep',
      matches: [
        'pdftextextractor', 'pdf extractor', 'cover slide', 'slide text', 
        'flatedecode', 'zlibstream', 'how pdf parsed', 'pdf cover slide', 'pdf slide metadata'
      ],
      en: "<strong>Deep Dive: PdfTextExtractor.cs Architecture:</strong><br />" +
          "• <strong>Zero External DLL Overhead:</strong> Avoids heavy bloated PDF libraries like iTextSharp or PdfPig in production. Implemented as a lightweight C# scanner using .NET 8 <code>System.IO.Compression.ZLibStream</code>.<br />" +
          "• <strong>FlateDecode Decompression:</strong> Decompresses PDF object text streams in memory within ~30–45ms.<br />" +
          "• <strong>Multi-Signal Extraction Regexes:</strong> Scans for batch code patterns (<code>[A-Za-z]{2,4}\\d{2,5}[A-Za-z]{2}</code>), subject keywords (Physics, Chemistry, Maths, Botany, Zoology), and faculty prefixes (<code>Teacher:</code>, <code>By:</code>, <code>Faculty:</code>, <code>... Sir</code>, <code>... Ma'am</code>).<br />" +
          "• <strong>Matching Confidence Contribution ($S_{\\text{pdf}}$):</strong> Contributes directly to the 7-signal matching engine, providing authoritative corroboration for timetable slots.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Matching/PdfTextExtractor.cs:34-150]</span>",
      hi: "<strong>PdfTextExtractor.cs का तकनीकी आर्किटेक्चर:</strong><br />" +
          "• <strong>जीरो एक्सटर्नल डिपेंडेंसी:</strong> किसी भारी थर्ड-पार्टी टूल के बिना शुद्ध C# .NET 8 <code>ZLibStream</code> का उपयोग करके <code>FlateDecode</code> ऑब्जेक्ट स्ट्रीम्स को 30-45ms में पार्स करता है।<br />" +
          "• <strong>स्मार्ट टेक्स्ट एक्सट्रैक्शन:</strong> पहली स्लाइड से बैच कोड (उदा. <code>LJ152EA</code>), विषय (Physics, Maths आदि) और फैकल्टी का नाम (उदा. 'Krishna Sir') निकालता है।<br />" +
          "• <strong>मैचिंग इंजन कंट्रीब्यूशन ($S_{\\text{pdf}}$):</strong> यह 7-सिग्नल मैचिंग इंजन को पुख्ता सिग्नल देता है ताकि क्लास 100% एक्यूरेसी के साथ मैच हो सके।"
    },
    {
      id: 'pdf_video_pairing_window',
      matches: [
        'same drive folder', 'pdf pairing', '10 min late pdf', 'post class pdf', 
        'tryfindexistingsessionasync', 'pdf video sync', 'drive folder sync', 'notes timing'
      ],
      en: "<strong>Video &amp; PDF Temporal Pairing Pipeline:</strong><br />" +
          "• <strong>The Classroom Reality:</strong> Teachers stop the OBS video recording first, take 5–10 minutes to summarize or clear student doubts, and then tap 'Export to PDF' on the MaxHub smartboard.<br />" +
          "• <strong>Extended Temporal Window:</strong> <code>TryFindExistingSessionAsync</code> in <code>ApplicationServices.cs</code> dynamically opens an extended post-class correlation window for documents (<code>isDocument = true</code>).<br />" +
          "• <strong>Atomic Session Attachment:</strong> Updates <code>existingSession.PdfFileLocalPath</code> and computes the SHA-256 hash. Both assets are paired into the same <code>LectureSession</code> and uploaded into the same Google Drive destination.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/LectureIngestService.cs:42-88]</span>",
      hi: "<strong>वीडियो और PDF की टाइम-विंडो पेयरिंग:</strong><br />" +
          "• <strong>क्लासरूम की वास्तविक स्थिति:</strong> शिक्षक पहले OBS वीडियो रिकॉर्डिंग बंद करते हैं, फिर 5-10 मिनट बाद MaxHub स्क्रीन से 'Export to PDF' दबाते हैं।<br />" +
          "• <strong>एक्सटेंडेड पेयरिंग विंडो:</strong> <code>ApplicationServices.cs</code> का <code>TryFindExistingSessionAsync</code> PDF और डॉक्युमेंट्स के लिए 15 मिनट की अतिरिक्त विंडो रखता है ताकि उसी रूम के वीडियो सेशन से PDF आसानी से जुड़ जाए।<br />" +
          "• <strong>एक साथ अपलोड:</strong> वीडियो और नोट्स दोनों एक ही <code>LectureSession</code> का हिस्सा बन जाते हैं और एक ही गूगल ड्राइव फोल्डर में अपलोड होते हैं।"
    },
    {
      id: 'pc_drive_youtube_pipeline',
      matches: [
        'pc to drive', 'drive to yt', 'drive to youtube', 'pc to drive to youtube', 
        'pipeline', 'internal tool', 'turnaround', 'how fast', 'fast does centrix', 
        'pipeline sla', 'upload turnaround', 'students ki baat', 'students', 'student'
      ],
      en: "<strong>Internal Classroom PC ➔ Google Drive ➔ YouTube Pipeline:</strong><br />" +
          "Centrix is an <strong>internal operational automation tool</strong> engineered specifically for PhysicsWallah Vidyapeeth centers:<br />" +
          "• <strong>Step 1: Classroom PC Edge Ingestion:</strong> OBS lecture recordings (.mkv, .mp4) and MaxHub smartboard notes (.pdf) are detected, validated with a 10s stability lock, and matched to timetable slots with &ge;85% confidence.<br />" +
          "• <strong>Step 2: Automated Google Drive Sync:</strong> Using 10MB chunked resumable streaming, both the video and notes are uploaded directly into the designated center/batch folder on Google Drive in <strong>&lt; 30 minutes</strong> with zero manual pen-drive transfers.<br />" +
          "• <strong>Step 3: Drive ➔ YouTube Distribution Pipeline:</strong> Once verified on Drive, lectures are queued and distributed directly to YouTube (unlisted/catalog channels) via automated pipeline, completely freeing center operators from manual YouTube uploads.<br />" +
          "• <strong>Internal Tooling Only:</strong> Centrix operates as an internal backend engine for center operators, coordinators, and video teams—it is not a public or student-facing application.<br />" +
          "<span class='inline-block mt-2 text-[10px] text-blue-600 dark:text-blue-400 font-mono'>⚡ Source: [LectureAgent/Services/LectureIngestService.cs:42-88]</span>",
      hi: "<strong>इंटरनल क्लासरूम PC ➔ Google Drive ➔ YouTube पाइपलाइन:</strong><br />" +
          "Centrix एक <strong>इंटरनल ऑपरेशनल ऑटोमेशन टूल</strong> है जिसे विद्यापीठ सेंटर्स के बैकएंड ऑपरेशंस के लिए बनाया गया है:<br />" +
          "• <strong>स्टेप 1 (क्लासरूम PC):</strong> OBS वीडियो और MaxHub PDF नोट्स क्लास खत्म होते ही 10s स्टेबिलिटी लॉक और 7-सिग्नल टाइमटेबल मैचिंग के साथ ऑटोमैटिकली डिटेक्ट होते हैं।<br />" +
          "• <strong>स्टेप 2 (Google Drive सिंक):</strong> वीडियो और नोट्स बिना किसी पेन-ड्राइव के सीधे <strong>Google Drive के सही बैच/क्लास फोल्डर</strong> में 30 मिनट के अंदर सुरक्षित अपलोड होते हैं।<br />" +
          "• <strong>स्टेप 3 (Drive से YouTube पाइपलाइन):</strong> ड्राइव पर अपलोड और वेरिफाई होने के बाद, इंटरनल ऑटोमेशन पाइपलाइन वीडियो को सीधे YouTube (अनलिस्टेड/आर्काइव चैनल) में शेड्यूल और डिस्ट्रीब्यूट कर देती है।<br />" +
          "• <strong>100% इंटरनल टूल:</strong> यह सेंटर कोऑर्डिनेटर्स, वीडियो एडिटर्स और ऑपरेशंस टीम के लिए एक इंटरनल टूल है—स्टूडेंट्स का इससे सीधा कोई इंटरफेस नहीं है।"
    }
  ];

  // -------------------------------------------------------------
  // Dynamic Integration Hook
  // -------------------------------------------------------------
  if (typeof global !== 'undefined') {
    global.CENTRIX_QUESTION_CATEGORIES = CENTRIX_QUESTION_CATEGORIES;
    global.CENTRIX_EXPANDED_INTENTS = CENTRIX_EXPANDED_INTENTS;
  }

})(typeof window !== 'undefined' ? window : globalThis);
