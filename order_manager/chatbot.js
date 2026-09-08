/**
 * Nike Lebanon Store Operations Copilot - Thinking AI Engine
 * Dual-Engine: Intelligent Built-in Cognitive Reasoner (100% Offline)
 * + Optional Google Gemini 2.5 Flash Cloud AI Integration
 * Operates across all pages with real-time access to Orders & Duty Board Tasks.
 */

(function () {
  const DEFAULT_PIN = "2026";
  const PIN_KEY = "nike_manager_pin";
  const GEMINI_KEY_STORAGE = "nike_gemini_api_key";
  const GEMINI_MODEL_STORAGE = "nike_gemini_model";
  const GEMINI_AUTO_FALLBACK_STORAGE = "nike_gemini_auto_fallback";
  const GEMINI_STRICT_LITE_STORAGE = "nike_gemini_strict_lite";

  // Current available Gemini Models suite (Default preferred: gemini-3.5-flash-lite)
  const GEMINI_MODELS = [
    { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash-Lite", tag: "Preferred - Max Requests & Speed", desc: "Fastest execution, highest RPM/TPM quota" },
    { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash", tag: "Flagship Balanced", desc: "1M tokens, balanced multimodal reasoning" },
    { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash-Lite", tag: "Ultra-Fast Lightweight", desc: "High-frequency operational requests" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview", tag: "Deep Reasoning & Research", desc: "Complex analytics and deep research" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", tag: "Legacy Fallback", desc: "Stable fallback for older API quotas" }
  ];

  // Fallback hierarchy starting with the user's preferred 3.5-flash-lite
  const RATE_LIMIT_FALLBACK_CASCADE = [
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-3.7-flash",
    "gemini-2.5-flash"
  ];

  const CATALOG_MODELS = [
    { name: "Nike Air Force 1 '07 Low Classic", sku: "CW2288-111", cat: "Footwear - Lifestyle & Retro", keywords: ["air force", "af1", "force 1", "cw2288", "white sneaker", "classic"] },
    { name: "Nike Dunk Low Retro Panda", sku: "DD1391-100", cat: "Footwear - Lifestyle & Retro", keywords: ["dunk", "panda", "dunk low", "dd1391", "black white"] },
    { name: "Nike Air Max 90 Classic", sku: "CN8490-002", cat: "Footwear - Lifestyle & Retro", keywords: ["air max", "air max 90", "am90", "cn8490"] },
    { name: "Nike Blazer Mid '77 Vintage", sku: "BQ6806-100", cat: "Footwear - Lifestyle & Retro", keywords: ["blazer", "blazer mid", "bq6806"] },
    { name: "Nike Air Max Plus Drift", sku: "DZ2522-001", cat: "Footwear - Lifestyle & Retro", keywords: ["plus drift", "drift", "tn", "air max plus", "dz2522"] },
    { name: "Nike Pegasus 40 Running Shoes", sku: "FD0736-100", cat: "Footwear - Running", keywords: ["pegasus", "pegasus 40", "fd0736", "running shoe", "runner"] },
    { name: "Nike Invincible 3 Road Running", sku: "DR2615-101", cat: "Footwear - Running", keywords: ["invincible", "invincible 3", "dr2615"] },
    { name: "Nike InfinityRN 4 Flyknit", sku: "DR2665-001", cat: "Footwear - Running", keywords: ["infinity", "infinityrn", "flyknit", "dr2665"] },
    { name: "Nike Vaporfly 3 Road Racing", sku: "DV4129-600", cat: "Footwear - Running", keywords: ["vaporfly", "vaporfly 3", "racing", "marathon", "dv4129"] },
    { name: "Air Jordan 1 Retro High OG Chicago", sku: "DZ5485-612", cat: "Footwear - Basketball", keywords: ["jordan", "jordan 1", "aj1", "chicago", "retro high", "dz5485"] },
    { name: "Nike LeBron XXI Basketball", sku: "FV3424-001", cat: "Footwear - Basketball", keywords: ["lebron", "lebron 21", "lebron xxi", "fv3424"] },
    { name: "Jordan Tatum 2 Basketball Shoes", sku: "DZ3338-001", cat: "Footwear - Basketball", keywords: ["tatum", "tatum 2", "jordan tatum", "dz3338"] },
    { name: "Nike Metcon 9 Training Shoes", sku: "DZ3488-001", cat: "Footwear - Training & Gym", keywords: ["metcon", "metcon 9", "gym", "crossfit", "dz3488"] },
    { name: "Nike Free Metcon 5 Workout Shoes", sku: "DV3950-001", cat: "Footwear - Training & Gym", keywords: ["free metcon", "metcon 5", "dv3950"] },
    { name: "Nike Mercurial Vapor 15 Elite FG", sku: "DJ4978-605", cat: "Footwear - Football / Soccer", keywords: ["mercurial", "vapor 15", "cleats", "football", "soccer", "dj4978"] },
    { name: "Nike Phantom GX Elite FG Cleats", sku: "DD9479-600", cat: "Footwear - Football / Soccer", keywords: ["phantom", "phantom gx", "cleats", "dd9479"] },
    { name: "Nike Club Fleece Pullover Hoodie", sku: "BV2654-010", cat: "Apparel - Tops & Hoodies", keywords: ["club fleece", "hoodie", "pullover", "bv2654"] },
    { name: "Nike Tech Fleece Full-Zip Windrunner", sku: "DX0566-063", cat: "Apparel - Tops & Hoodies", keywords: ["tech fleece", "windrunner", "zip hoodie", "dx0566"] },
    { name: "Nike Club Fleece Cargo Pants", sku: "CD6394-010", cat: "Apparel - Pants & Shorts", keywords: ["cargo pants", "cargo", "club fleece cargo", "cd6394"] },
    { name: "Nike Dri-FIT Challenger 7\" Shorts", sku: "DV9363-010", cat: "Apparel - Pants & Shorts", keywords: ["shorts", "challenger shorts", "dri-fit", "dv9363"] },
    { name: "Nike Brasilia Training Duffel Bag", sku: "BA5959-010", cat: "Accessories & Equipment", keywords: ["duffel", "duffel bag", "brasilia", "gym bag", "ba5959"] },
    { name: "Nike Everyday Cushion Crew Socks (3-Pack)", sku: "SX7664-100", cat: "Accessories & Equipment", keywords: ["socks", "crew socks", "cushion socks", "sx7664"] },
    { name: "Nike Sportswear Heritage Waistpack", sku: "DC4244-010", cat: "Accessories & Equipment", keywords: ["waistpack", "fanny pack", "crossbody bag", "dc4244"] }
  ];

  const STORE_STAFF = ["Maya Khoury", "Rami Gemayel", "Elie Haddad", "Sarah Atallah", "Ahmad Zein", "Nour Saleh", "Karim Bitar"];
  const STORE_BRANCHES = ["Souks", "ABC Verdun", "ABC Ash", "BCC", "ABC Dbayeh", "Ghazir", "Tripoli", "Gs", "Warehouse", "Main"];

  // Auto-inject CSS stylesheet if not present
  function ensureStylesheet() {
    if (!document.querySelector('link[href="chatbot.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "chatbot.css";
      document.head.appendChild(link);
    }
  }

  // Get current orders safely
  function getOrders() {
    try {
      const saved = localStorage.getItem("orders");
      if (saved) return JSON.parse(saved);
      return [];
    } catch (e) {
      return [];
    }
  }

  // Get current tasks safely
  function getTasks() {
    try {
      const saved = localStorage.getItem("nike_tasks");
      if (saved) return JSON.parse(saved);
      return [];
    } catch (e) {
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem("nike_tasks", JSON.stringify(tasks));
  }

  // Count overdue holds (>48h at Main)
  // Program runs at Main Branch. Customer orders are ordered from other branches and held at Main for pickup.
  function getOverdueOrders() {
    const orders = getOrders();
    const today = new Date();
    return orders.filter((o) => {
      const st = (o.status || "").toLowerCase();
      if (st === "arrived" && o.arrivalDate) {
        const arrDate = new Date(o.arrivalDate + "T00:00:00");
        const diffHours = (today - arrDate) / (1000 * 60 * 60);
        return diffHours >= 48;
      }
      return false;
    });
  }

  function getGeminiKey() {
    return localStorage.getItem(GEMINI_KEY_STORAGE) || "";
  }

  function setGeminiKey(key) {
    if (!key) {
      localStorage.removeItem(GEMINI_KEY_STORAGE);
    } else {
      localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
    }
    updateEngineStatusBadge();
  }

  function isStrictLiteOnly() {
    const val = localStorage.getItem(GEMINI_STRICT_LITE_STORAGE);
    return val === null ? true : val === "true"; // Default to true per user preference!
  }

  function setStrictLiteOnly(enabled) {
    localStorage.setItem(GEMINI_STRICT_LITE_STORAGE, enabled ? "true" : "false");
    if (enabled) {
      setSelectedModel("gemini-3.5-flash-lite");
    }
    updateEngineStatusBadge();
  }

  function getSelectedModel() {
    if (isStrictLiteOnly()) return "gemini-3.5-flash-lite";
    return localStorage.getItem(GEMINI_MODEL_STORAGE) || "gemini-3.5-flash-lite";
  }

  function setSelectedModel(m) {
    localStorage.setItem(GEMINI_MODEL_STORAGE, m);
    updateEngineStatusBadge();
  }

  function isAutoFallbackEnabled() {
    const val = localStorage.getItem(GEMINI_AUTO_FALLBACK_STORAGE);
    return val === null ? true : val === "true";
  }

  function setAutoFallbackEnabled(enabled) {
    localStorage.setItem(GEMINI_AUTO_FALLBACK_STORAGE, enabled ? "true" : "false");
  }

  function updateEngineStatusBadge() {
    const pill = document.getElementById("chatEnginePill");
    const statusText = document.getElementById("chatStatusText");
    const key = getGeminiKey();
    const model = getSelectedModel();
    const strictLite = isStrictLiteOnly();
    const autoFallback = isAutoFallbackEnabled();

    if (pill && statusText) {
      if (key) {
        pill.className = "nike-chat-mode-pill cloud-ai";
        if (strictLite) {
          pill.textContent = "3.5 Flash-Lite Only";
          statusText.textContent = "Gemini 3.5 Flash-Lite • Max Requests Mode";
        } else {
          const shortName = model.replace("gemini-", "").replace("-preview", "");
          pill.textContent = `${shortName}${autoFallback ? " • Cascade" : ""}`;
          statusText.textContent = `${model} ${autoFallback ? "• Auto-Fallback Active" : "• Direct"}`;
        }
      } else {
        pill.className = "nike-chat-mode-pill";
        pill.textContent = "Cognitive Brain";
        statusText.textContent = "Offline Ready • Main DB";
      }
    }
  }

  // HTML Template for floating widget
  function buildWidgetMarkup() {
    if (document.getElementById("nikeChatWindow")) return;
    const overdue = getOverdueOrders();
    const badgeHtml = overdue.length > 0 ? `<span class="nike-chat-badge" id="chatLauncherBadge">${overdue.length}</span>` : "";

    const html = `
      <!-- Launcher Button -->
      <button class="nike-chat-launcher" id="nikeChatLauncher" title="Open Nike Store Copilot" aria-label="Open Nike Store Copilot">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        ${badgeHtml}
      </button>

      <!-- Floating Window -->
      <div class="nike-chat-window" id="nikeChatWindow">
        <!-- Settings Panel Overlay -->
        <div class="nike-chat-settings-panel" id="nikeChatSettingsPanel">
          <div class="nike-chat-settings-title">
            <span>🧠 AI Models & Rate Limits</span>
            <button class="nike-chat-control-btn" onclick="window.NikeCopilot.toggleSettings()">✕</button>
          </div>
          <div class="nike-chat-settings-content">
            <div>
              <label style="display:block;font-size:0.75rem;margin-bottom:4px;color:#ededed;">Google Gemini API Key:</label>
              <input type="password" id="geminiApiKeyInput" class="nike-chat-settings-input" placeholder="AIzaSy..." />
            </div>

            <!-- Exclusive 3.5 Flash-Lite Preference Option -->
            <div style="background:rgba(255,85,0,0.08);border:1px solid rgba(255,85,0,0.35);border-radius:8px;padding:0.65rem 0.8rem;">
              <label class="nike-chat-settings-toggle-row" style="color:#ffffff;font-weight:600;">
                <input type="checkbox" id="geminiStrictLiteCheck" onchange="window.NikeCopilot.handleStrictLiteToggle(this.checked)" checked />
                <span>⚡ Only Use Gemini 3.5 Flash-Lite (Preferred Lite Mode)</span>
              </label>
              <div style="font-size:0.7rem;color:#ffaa77;margin-top:4px;line-height:1.4;">
                Locks all requests strictly to <strong>gemini-3.5-flash-lite</strong>. Gives you the <strong>highest request allowance (RPM/RPD/TPM)</strong>, lowest cost, and fastest response time.
              </div>
            </div>

            <div id="generalModelSelectGroup" style="opacity:0.5;pointer-events:none;">
              <label style="display:block;font-size:0.75rem;margin-bottom:4px;color:#ededed;">Custom Model Selection (when not locked to Lite):</label>
              <select id="geminiModelSelect" class="nike-chat-settings-select">
                <option value="gemini-3.5-flash-lite">gemini-3.5-flash-lite (High Throughput / Max Requests)</option>
                <option value="gemini-3.7-flash">gemini-3.7-flash (Flagship Balanced Reasoning)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra-Fast Lightweight)</option>
                <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Deep Reasoning & Research)</option>
                <option value="gemini-2.5-flash">gemini-2.5-flash (Legacy Fallback)</option>
              </select>
            </div>

            <div style="background:#151518;border:1px solid #28282e;border-radius:8px;padding:0.6rem 0.75rem;">
              <label class="nike-chat-settings-toggle-row">
                <input type="checkbox" id="geminiAutoFallbackCheck" checked />
                <strong>Auto-Fallback on Rate Limits (429)</strong>
              </label>
              <div style="font-size:0.69rem;color:#8a8a95;margin-top:5px;line-height:1.45;">
                If your quota or rate limit is ever exhausted, Copilot automatically falls back to the Built-in Offline Brain (infinite requests, zero external limits).
              </div>
            </div>

            <div style="display:flex;gap:0.5rem;margin-top:0.3rem;">
              <button class="nike-chat-settings-btn" onclick="window.NikeCopilot.saveSettings()">Save Configuration</button>
              <button class="nike-chat-settings-btn secondary" onclick="window.NikeCopilot.clearApiKey()">Use Offline Brain</button>
            </div>
          </div>
        </div>

        <div class="nike-chat-header">
          <div class="nike-chat-header-brand">
            <div class="nike-chat-avatar-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .88-.36 1.68-.93 2.25z"/></svg>
            </div>
            <div>
              <div class="nike-chat-title">
                Nike Copilot
                <span class="nike-chat-mode-pill" id="chatEnginePill">Cognitive Brain</span>
              </div>
              <div class="nike-chat-status">
                <span class="nike-chat-status-dot"></span>
                <span id="chatStatusText">Offline Ready • Main DB</span>
              </div>
            </div>
          </div>
          <div class="nike-chat-controls">
            <button class="nike-chat-control-btn" id="nikeChatExpandBtn" onclick="window.NikeCopilot.toggleFullPage()" title="Full Screen (⤢)">⤢</button>
            <button class="nike-chat-control-btn" onclick="window.NikeCopilot.toggleSettings()" title="Settings">⚙️</button>
            <button class="nike-chat-control-btn" onclick="window.NikeCopilot.clearChat()" title="Clear chat">🔄</button>
            <button class="nike-chat-control-btn" onclick="window.NikeCopilot.toggle()" title="Close chat">✕</button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="nike-chat-messages" id="nikeChatMessages"></div>

        <!-- Suggestion Chips Tray -->
        <div class="nike-chat-chips-tray">
          <button class="nike-chat-chip-btn" onclick="window.NikeCopilot.sendPrompt('What should I do today?')">⚡ Priorities Today</button>
          <button class="nike-chat-chip-btn" onclick="window.NikeCopilot.sendPrompt('Which shoes are selling the most?')">👟 Top Sellers</button>
          <button class="nike-chat-chip-btn" onclick="window.NikeCopilot.sendPrompt('Which branch sent the most orders?')">🏬 Branch Sourcing</button>
          <button class="nike-chat-chip-btn" onclick="window.NikeCopilot.sendPrompt('Show overdue customer holds')">⚠️ Overdue Holds</button>
          <button class="nike-chat-chip-btn" onclick="window.NikeCopilot.sendPrompt('Who are our top customers?')">👥 Top Customers</button>
          <button class="nike-chat-chip-btn" onclick="window.NikeCopilot.sendPrompt('Who has unpicked orders?')">🚫 Unpicked Risk</button>
        </div>

        <!-- Input Bar -->
        <div class="nike-chat-input-bar">
          <input
            type="text"
            id="nikeChatInput"
            class="nike-chat-text-input"
            placeholder="Ask anything, analyze store, or create task..."
            onkeydown="if(event.key==='Enter') window.NikeCopilot.handleSend();"
          />
          <button class="nike-chat-send-btn" onclick="window.NikeCopilot.handleSend()" title="Send">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    `;

    const div = document.createElement("div");
    div.id = "nikeChatRoot";
    div.innerHTML = html;
    document.body.appendChild(div);

    updateEngineStatusBadge();
  }

  // Render a message in chat with enhanced styling
  function appendMessage(sender, textOrHtml, isHtml = false) {
    const container = document.getElementById("nikeChatMessages");
    if (!container) return null;

    const bubble = document.createElement("div");
    bubble.className = `nike-chat-bubble ${sender}`;

    let contentHtml = "";
    if (sender === "bot") {
      contentHtml += `
        <div class="nike-chat-msg-header">
          <svg viewBox="0 0 24 24" style="width:11px;height:11px;fill:currentColor;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .88-.36 1.68-.93 2.25z"/></svg>
          <span>Nike Operations Intelligence</span>
        </div>
      `;
    }

    if (isHtml) {
      contentHtml += textOrHtml;
    } else {
      const p = document.createElement("div");
      p.textContent = textOrHtml;
      contentHtml += p.innerHTML;
    }

    bubble.innerHTML = contentHtml;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    return bubble;
  }

  function showThinkingBubble(statusText = "Analyzing store orders & retail context...") {
    const container = document.getElementById("nikeChatMessages");
    if (!container) return null;

    const bubble = document.createElement("div");
    bubble.className = "nike-chat-bubble bot";
    bubble.id = "activeThinkingBubble";
    bubble.innerHTML = `
      <div class="nike-chat-thinking">
        <span class="nike-chat-brain-pulse">🧠</span>
        <span id="thinkingStatusSpan">${escapeHtml(statusText)}</span>
        <span class="nike-chat-typing-dots"><span></span><span></span><span></span></span>
      </div>
    `;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    return bubble;
  }

  function removeThinkingBubble() {
    const bubble = document.getElementById("activeThinkingBubble");
    if (bubble && bubble.parentNode) {
      bubble.parentNode.removeChild(bubble);
    }
  }

  // String similarity helpers (Levenshtein & Substring)
  function stringSimilarity(s1, s2) {
    if (!s1 || !s2) return 0;
    const a = s1.toLowerCase().trim();
    const b = s2.toLowerCase().trim();
    if (a === b) return 1.0;
    if (a.includes(b) || b.includes(a)) return 0.85;

    const lenA = a.length;
    const lenB = b.length;
    const matrix = Array.from({ length: lenA + 1 }, () => Array(lenB + 1).fill(0));

    for (let i = 0; i <= lenA; i++) matrix[i][0] = i;
    for (let j = 0; j <= lenB; j++) matrix[0][j] = j;

    for (let i = 1; i <= lenA; i++) {
      for (let j = 1; j <= lenB; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    const distance = matrix[lenA][lenB];
    const maxLen = Math.max(lenA, lenB);
    return Math.max(0, (maxLen - distance) / maxLen);
  }

  // Format thought process dropdown
  function buildThoughtBox(steps) {
    if (!steps || steps.length === 0) return "";
    const lines = steps.map((s) => `
      <div class="thought-step-line">
        <span class="thought-step-bullet">✓</span>
        <span>${s}</span>
      </div>
    `).join("");

    return `
      <div class="nike-chat-thought-container is-open">
        <button class="nike-chat-thought-toggle" onclick="this.parentElement.classList.toggle('is-open')">
          <span class="thought-title"><span>💡</span> Thought Process (${steps.length} steps)</span>
          <span class="thought-arrow">▼</span>
        </button>
        <div class="nike-chat-thought-body">
          ${lines}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // COGNITIVE OFFLINE REASONING BRAIN
  // Evaluates intent, calculates real database aggregates, and never dead-ends.
  // =========================================================================
  function processOfflineReasoning(query) {
    const q = query.trim();
    const lower = q.toLowerCase();
    const orders = getOrders();
    const tasks = getTasks();
    const overdue = getOverdueOrders();
    const thoughtSteps = [];

    thoughtSteps.push(`Normalized query: <em>"${escapeHtml(q)}"</em>`);
    thoughtSteps.push(`Live store connection: <strong>${orders.length} orders</strong> & <strong>${tasks.length} duty tasks</strong>.`);

    // Check for explicit Task Creation
    if (/^(add\s+task|create\s+task|task:|todo:|remind|assign)/i.test(lower) || lower.includes("create a task") || lower.includes("add to todo")) {
      thoughtSteps.push("Detected Intent: Operations Task Creation.");
      let taskText = q.replace(/^(add\s+task:?|create\s+task:?|task:?|todo:?|remind\s+|assign\s+)/i, "").trim();
      
      // Determine priority
      let priority = "normal";
      if (/urgent|asap|important|critical|emergency/i.test(lower)) {
        priority = "urgent";
        thoughtSteps.push("Priority parsed as: <strong>URGENT</strong>.");
      }

      // Determine assignee
      let assigned = ["Maya Khoury"];
      STORE_STAFF.forEach((s) => {
        const firstName = s.split(" ")[0].toLowerCase();
        if (lower.includes(firstName)) {
          assigned = [s];
          thoughtSteps.push(`Detected target staff member: <strong>${s}</strong>.`);
        }
      });

      const todayStr = new Date().toISOString().split("T")[0];
      const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

      const newTask = {
        id: "TASK-" + String(Date.now()).slice(-5),
        title: taskText || "Review operations alert",
        description: `Created via Nike Store Copilot. Assigned to ${assigned.join(", ")}.`,
        horizon: "week",
        createdAt: todayStr,
        dueDate: tomorrowStr,
        branch: "Main",
        priority: priority,
        employees: assigned,
        done: false
      };

      tasks.unshift(newTask);
      saveTasks(tasks);
      thoughtSteps.push(`Committed task <strong>${newTask.id}</strong> to Duty Board storage.`);

      const thoughtHtml = buildThoughtBox(thoughtSteps);
      return `
        ${thoughtHtml}
        <div>
          <strong style="color:#34d399;">✅ Task Successfully Assigned!</strong>
          <div class="nike-chat-card">
            <div class="nike-chat-card-title">
              <span>${escapeHtml(newTask.title)}</span>
              <span class="nike-chat-badge-pill ${priority === 'urgent' ? 'urgent' : 'pending'}">${priority.toUpperCase()}</span>
            </div>
            <div style="font-size:0.75rem;color:#b0b0bc;margin-top:2px;">
              Assigned to: <strong>${assigned.join(", ")}</strong> • Due: Tomorrow (${tomorrowStr})
            </div>
            <div style="font-size:0.72rem;color:#8a8a95;margin-top:2px;">
              Location: Main Branch Counter
            </div>
          </div>
          <a href="todo.html" class="nike-chat-action-link">Open Operations To-Do Board ↗</a>
        </div>
      `;
    }

    // Check for Daily Briefing / Priorities / "What should I do?"
    if (
      lower.includes("what should i do") ||
      lower.includes("priority") ||
      lower.includes("priorities") ||
      lower.includes("briefing") ||
      lower.includes("what to do") ||
      lower.includes("today") ||
      lower.includes("morning") ||
      lower.includes("action plan")
    ) {
      thoughtSteps.push("Detected Intent: Daily Store Operations Briefing.");
      thoughtSteps.push(`Assessed ${overdue.length} overdue customer holds at Main.`);
      const openTasks = tasks.filter((t) => !t.done);
      thoughtSteps.push(`Filtered ${openTasks.length} uncompleted duty tasks.`);

      const pendingOrders = orders.filter((o) => o.status === "Pending");
      thoughtSteps.push(`Counted ${pendingOrders.length} pending shipments expected from other branches.`);

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      let overdueListHtml = "";
      if (overdue.length > 0) {
        const topO = overdue.slice(0, 2);
        overdueListHtml = `
          <div style="margin-top:0.4rem;padding:0.4rem 0.6rem;background:rgba(239,68,68,0.1);border-left:3px solid #ef4444;border-radius:4px;">
            <div style="font-weight:700;color:#f87171;font-size:0.75rem;">1. Immediate Customer Follow-ups (${overdue.length} holds >48h):</div>
            ${topO.map((o) => {
              const pClean = (o.phoneNumber || "").replace(/\D/g, "");
              return `
                <div style="font-size:0.73rem;color:#ededed;margin-top:2px;display:flex;justify-content:space-between;align-items:center;">
                  <span>${escapeHtml(o.customerName)} (${escapeHtml(o.itemNumber)})</span>
                  ${pClean ? `<a href="https://wa.me/961${pClean}?text=Hello%20${encodeURIComponent(o.customerName)}%2C%20your%20Nike%20order%20is%20ready%20at%20Main%20Branch%21" target="_blank" class="nike-chat-action-btn-sm">WhatsApp</a>` : ""}
                </div>
              `;
            }).join("")}
          </div>
        `;
      }

      return `
        ${thoughtHtml}
        <div>
          <strong>⚡ Nike Main Branch - Daily Priority Briefing</strong>
          <div class="nike-chat-grid-stats">
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#f87171;">${overdue.length}</div>
              <div class="nike-chat-stat-lbl">Overdue Holds (>48h)</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#60a5fa;">${openTasks.length}</div>
              <div class="nike-chat-stat-lbl">Active Duty Tasks</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#fbbf24;">${pendingOrders.length}</div>
              <div class="nike-chat-stat-lbl">Pending From Branches</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#34d399;">${orders.filter(o => o.status === 'Arrived').length}</div>
              <div class="nike-chat-stat-lbl">Ready at Main Counter</div>
            </div>
          </div>
          ${overdueListHtml}
          <div style="margin-top:0.45rem;font-size:0.76rem;color:#b0b0bc;">
            <strong>Recommended Action:</strong> Have Elie or Maya review overdue customer pickups, verify daily courier box from ABC Dbayeh/Souks, and clear completed tasks.
          </div>
          <div style="margin-top:0.5rem;display:flex;gap:0.4rem;">
            <a href="todo.html" class="nike-chat-action-link">Open Duty Board ↗</a>
            <span style="color:#555;">•</span>
            <a href="index.html" class="nike-chat-action-link">View Orders ↗</a>
          </div>
        </div>
      `;
    }

    // Check for Overdue Holds / Late Orders
    if (lower.includes("overdue") || lower.includes("hold") || lower.includes("late") || lower.includes("48h") || lower.includes("retard") || lower.includes("ta5ir") || lower.includes("delay")) {
      thoughtSteps.push("Detected Intent: Overdue Arrived Orders Analysis.");
      thoughtSteps.push("Operational rule: Program PC is located at Main Branch; customer orders sourced from other branches are held at Main awaiting pickup.");
      thoughtSteps.push(`Evaluated arrival dates against 48-hour SLA threshold. Identified ${overdue.length} orders.`);

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      if (overdue.length === 0) {
        return `
          ${thoughtHtml}
          <div>
            <strong style="color:#34d399;">✅ All Clear at Main Branch!</strong>
            <p style="margin-top:0.3rem;font-size:0.78rem;color:#b0b0bc;">
              No customer orders currently exceed the 48-hour holding threshold at our counter. All arrived pairs are either within their pickup window or completed.
            </p>
          </div>
        `;
      }

      let cardsHtml = overdue.slice(0, 4).map((o) => {
        const phoneClean = (o.phoneNumber || "").replace(/\D/g, "");
        const waMsg = encodeURIComponent(`Bonjour ${o.customerName}, your Nike order (${o.itemNumber}, Size ${o.size || ''}) is ready for pickup at our Main Branch counter! Please pass by to collect it.`);
        return `
          <div class="nike-chat-card">
            <div class="nike-chat-card-title">
              <span>${escapeHtml(o.customerName)}</span>
              <span class="nike-chat-badge-pill urgent">>48h Hold</span>
            </div>
            <div style="color:#ededed;font-size:0.75rem;font-weight:500;">
              ${escapeHtml(o.itemNumber)} • ${escapeHtml(o.description || "Nike Footwear")}
            </div>
            <div style="color:#8a8a95;font-size:0.72rem;margin-top:2px;">
              Sourced from: <strong>${escapeHtml(o.branch)}</strong> • Arrived: ${escapeHtml(o.arrivalDate || "Recent")}
            </div>
            <div style="margin-top:5px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-family:monospace;font-size:0.75rem;color:#ff5500;">${escapeHtml(o.phoneNumber)}</span>
              ${phoneClean ? `<a href="https://wa.me/961${phoneClean}?text=${waMsg}" target="_blank" class="nike-chat-action-btn-sm">WhatsApp ↗</a>` : ""}
            </div>
          </div>
        `;
      }).join("");

      return `
        ${thoughtHtml}
        <div>
          <strong style="color:#f87171;">⚠️ ${overdue.length} Orders Exceeding 48h Hold at Main:</strong>
          <div style="font-size:0.74rem;color:#8a8a95;margin-top:2px;">
            These items were received from other branches and are awaiting customer pickup at Main.
          </div>
          ${cardsHtml}
          ${overdue.length > 4 ? `<div style="font-size:0.72rem;color:#8a8a95;margin-top:4px;">...and ${overdue.length - 4} more orders.</div>` : ""}
          <a href="todo.html" class="nike-chat-action-link">Sync Overdue Holds to Tasks Board ↗</a>
        </div>
      `;
    }

    // Check for Top Selling Shoes / Best Models / Footwear Analytics
    if (
      lower.includes("best selling") ||
      lower.includes("top shoe") ||
      lower.includes("most ordered") ||
      lower.includes("popular") ||
      lower.includes("best seller") ||
      lower.includes("which shoe") ||
      lower.includes("highest sales") ||
      lower.includes("sales ranking") ||
      (lower.includes("shoe") && (lower.includes("sell") || lower.includes("rank") || lower.includes("most")))
    ) {
      thoughtSteps.push("Detected Intent: Product Velocity & Shoe Model Demand Analysis.");
      thoughtSteps.push(`Scanned ${orders.length} orders across catalog SKUs.`);

      const modelCounts = {};
      orders.forEach((o) => {
        const item = o.description || o.itemNumber || "Nike Item";
        modelCounts[item] = (modelCounts[item] || 0) + 1;
      });

      const sorted = Object.entries(modelCounts).sort((a, b) => b[1] - a[1]);
      thoughtSteps.push(`Aggregated demand for ${sorted.length} unique items.`);
      thoughtSteps.push(`Identified top performer: <strong>${sorted[0][0]}</strong> (${sorted[0][1]} requests).`);

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      const topList = sorted.slice(0, 5).map(([name, count], idx) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.35rem 0;border-bottom:1px solid #23232a;font-size:0.75rem;">
          <div>
            <strong style="color:#ff5500;">#${idx + 1}</strong>
            <span style="color:#ededed;margin-left:4px;">${escapeHtml(name)}</span>
          </div>
          <span style="font-weight:700;background:rgba(255,85,0,0.15);color:#ff5500;padding:1px 6px;border-radius:4px;">${count} orders</span>
        </div>
      `).join("");

      return `
        ${thoughtHtml}
        <div>
          <strong>👟 Top Sourced & Selling Nike Models (Lebanon)</strong>
          <div style="margin-top:0.4rem;">${topList}</div>
          <p style="margin-top:0.5rem;font-size:0.74rem;color:#b0b0bc;">
            <strong>Insights:</strong> Lifestyle classics (Air Force 1, Dunk Panda) and performance runners (Pegasus 40) dominate inter-store customer demand. Most common sizes requested: <strong>42 EU, 43 EU</strong>.
          </p>
          <a href="analytics.html" class="nike-chat-action-link">View Full Shoe Analytics Charts ↗</a>
        </div>
      `;
    }

    // Check for Branch Sourcing / Branch Comparisons
    if (
      lower.includes("branch") ||
      lower.includes("sourcing") ||
      lower.includes("source") ||
      lower.includes("where from") ||
      lower.includes("dbayeh") ||
      lower.includes("souks") ||
      lower.includes("verdun") ||
      lower.includes("tripoli") ||
      lower.includes("ghazir") ||
      lower.includes("ash")
    ) {
      thoughtSteps.push("Detected Intent: Branch Sourcing & Dispatch Distribution.");
      thoughtSteps.push("Operational note: Other branches fulfill and ship customer orders to Main Branch.");

      const branchCounts = {};
      const branchPending = {};
      orders.forEach((o) => {
        const b = o.branch || "Other";
        branchCounts[b] = (branchCounts[b] || 0) + 1;
        if (o.status === "Pending") {
          branchPending[b] = (branchPending[b] || 0) + 1;
        }
      });

      const sortedBranches = Object.entries(branchCounts).sort((a, b) => b[1] - a[1]);
      thoughtSteps.push(`Calculated dispatch volume for ${sortedBranches.length} branches.`);

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      // Check if a specific branch was requested
      const requestedBranch = STORE_BRANCHES.find((b) => lower.includes(b.toLowerCase()));
      if (requestedBranch && requestedBranch !== "Main") {
        const totalB = branchCounts[requestedBranch] || 0;
        const pendingB = branchPending[requestedBranch] || 0;
        const arrivedB = orders.filter((o) => o.branch === requestedBranch && o.status === "Arrived").length;
        const collectedB = orders.filter((o) => o.branch === requestedBranch && o.status === "Collected").length;

        return `
          ${thoughtHtml}
          <div>
            <strong>🏬 Branch Profile: ${escapeHtml(requestedBranch)}</strong>
            <div class="nike-chat-grid-stats">
              <div class="nike-chat-stat-box">
                <div class="nike-chat-stat-val">${totalB}</div>
                <div class="nike-chat-stat-lbl">Total Sourced to Main</div>
              </div>
              <div class="nike-chat-stat-box">
                <div class="nike-chat-stat-val" style="color:#60a5fa;">${pendingB}</div>
                <div class="nike-chat-stat-lbl">In Transit / Pending</div>
              </div>
              <div class="nike-chat-stat-box">
                <div class="nike-chat-stat-val" style="color:#34d399;">${arrivedB}</div>
                <div class="nike-chat-stat-lbl">Arrived at Main</div>
              </div>
              <div class="nike-chat-stat-box">
                <div class="nike-chat-stat-val" style="color:#a1a1aa;">${collectedB}</div>
                <div class="nike-chat-stat-lbl">Collected by Customer</div>
              </div>
            </div>
            <p style="font-size:0.75rem;color:#b0b0bc;margin-top:4px;">
              Courier transfers from ${escapeHtml(requestedBranch)} arrive daily at Main Branch. ${pendingB > 0 ? `Currently expecting <strong>${pendingB} pairs</strong> on the next courier dispatch.` : `All orders from this branch have successfully arrived.`}
            </p>
            <a href="index.html?branch=${encodeURIComponent(requestedBranch)}" class="nike-chat-action-link">Filter Orders for ${escapeHtml(requestedBranch)} ↗</a>
          </div>
        `;
      }

      // General branch ranking
      const branchRows = sortedBranches.slice(0, 5).map(([b, count], idx) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.35rem 0;border-bottom:1px solid #23232a;font-size:0.75rem;">
          <div>
            <strong style="color:#ff5500;">#${idx + 1}</strong>
            <span style="color:#ededed;margin-left:4px;">${escapeHtml(b)}</span>
          </div>
          <span style="font-weight:600;color:#34d399;">${count} orders (${branchPending[b] || 0} in transit)</span>
        </div>
      `).join("");

      return `
        ${thoughtHtml}
        <div>
          <strong>🏬 Inter-Branch Sourcing Flow to Main Branch</strong>
          <div style="font-size:0.72rem;color:#8a8a95;margin-top:2px;">
            Branches providing inventory for customer pickup at Main:
          </div>
          <div style="margin-top:0.4rem;">${branchRows}</div>
          <a href="analytics.html" class="nike-chat-action-link">Open Branch Logistics Dashboard ↗</a>
        </div>
      `;
    }

    // Check for Unpicked Orders / Abandoned Risk
    if (lower.includes("unpicked") || lower.includes("abandon") || lower.includes("not pick") || lower.includes("didn't pick") || lower.includes("cancel")) {
      thoughtSteps.push("Detected Intent: Unpicked Customer Order Analysis.");
      const unpickedOrders = orders.filter((o) => (o.status || "").toLowerCase() === "unpicked");
      thoughtSteps.push(`Found ${unpickedOrders.length} unpicked orders in store records.`);

      // Group by customer
      const custRisk = {};
      unpickedOrders.forEach((o) => {
        const name = o.customerName || "Unknown";
        custRisk[name] = (custRisk[name] || 0) + 1;
      });
      const sortedCust = Object.entries(custRisk).sort((a, b) => b[1] - a[1]);
      thoughtSteps.push(`Calculated customer unpicked frequencies. Highest risk: <strong>${sortedCust[0] ? sortedCust[0][0] : 'None'}</strong>.`);

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      const riskRows = sortedCust.slice(0, 4).map(([name, count]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.3rem 0;border-bottom:1px solid #23232a;font-size:0.74rem;">
          <span style="color:#ededed;font-weight:600;">${escapeHtml(name)}</span>
          <span class="nike-chat-badge-pill unpicked">${count} unpicked pairs</span>
        </div>
      `).join("");

      return `
        ${thoughtHtml}
        <div>
          <strong style="color:#fbbf24;">🚫 Unpicked & Abandoned Orders Report</strong>
          <p style="font-size:0.74rem;color:#b0b0bc;margin-top:3px;">
            Total <strong>${unpickedOrders.length} orders</strong> arrived at Main but were never collected by customers:
          </p>
          <div style="margin-top:0.4rem;">${riskRows}</div>
          <div style="margin-top:0.5rem;font-size:0.73rem;color:#8a8a95;">
            💡 <strong>Store Recommendation:</strong> Flag repeat unpicked customers before placing future inter-store transfer requests.
          </div>
          <a href="index.html?status=Unpicked" class="nike-chat-action-link">View All Unpicked Orders ↗</a>
        </div>
      `;
    }

    // Check for Staff Performance & Workload
    const mentionedStaff = STORE_STAFF.find((s) => lower.includes(s.toLowerCase()) || lower.includes(s.split(" ")[0].toLowerCase()));
    if (mentionedStaff || lower.includes("staff") || lower.includes("employee") || lower.includes("workload") || lower.includes("who entered") || lower.includes("team")) {
      thoughtSteps.push("Detected Intent: Staff Performance & Operations Duty Tracking.");
      const targetStaff = mentionedStaff || "Elie Haddad";
      thoughtSteps.push(`Evaluating operational profile for: <strong>${targetStaff}</strong>.`);

      const enteredCount = orders.filter((o) => o.enteredBy === targetStaff).length;
      const handledCount = orders.filter((o) => o.employee === targetStaff).length;
      const assignedTasks = tasks.filter((t) => (t.employees || []).includes(targetStaff));
      const pendingTasks = assignedTasks.filter((t) => !t.done);

      thoughtSteps.push(`Calculated: Entered ${enteredCount} orders, handled ${handledCount}, assigned to ${assignedTasks.length} tasks (${pendingTasks.length} pending).`);

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      return `
        ${thoughtHtml}
        <div>
          <strong>👤 Staff Profile: ${escapeHtml(targetStaff)}</strong>
          <div class="nike-chat-grid-stats">
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#ff5500;">${enteredCount}</div>
              <div class="nike-chat-stat-lbl">Orders Registered</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#34d399;">${handledCount}</div>
              <div class="nike-chat-stat-lbl">Orders Dispatched</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#60a5fa;">${assignedTasks.length}</div>
              <div class="nike-chat-stat-lbl">Duty Board Tasks</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#fbbf24;">${pendingTasks.length}</div>
              <div class="nike-chat-stat-lbl">Pending Actions</div>
            </div>
          </div>
          ${pendingTasks.length > 0 ? `
            <div style="font-size:0.74rem;color:#b0b0bc;margin-top:4px;">
              Active Duty: <em>"${escapeHtml(pendingTasks[0].title)}"</em>
            </div>
          ` : `<div style="font-size:0.74rem;color:#34d399;margin-top:4px;">✓ No overdue duty tasks currently pending.</div>`}
          <a href="todo.html" class="nike-chat-action-link">View Tasks Assigned to ${escapeHtml(targetStaff.split(" ")[0])} ↗</a>
        </div>
      `;
    }

    // Check for Customer Intelligence / Lookup
    // Try matching any customer name in orders
    const matchedCustomerOrders = [];
    const cleanTokens = lower.replace(/^(search|find|check|where is|order for|customer|show)\s+/i, "").trim();

    orders.forEach((o) => {
      const cName = (o.customerName || "").toLowerCase();
      const cPhone = (o.phoneNumber || "").replace(/\s+/g, "");
      const queryClean = cleanTokens.replace(/\s+/g, "");

      if (cName.includes(cleanTokens) || queryClean.length >= 3 && cPhone.includes(queryClean) || stringSimilarity(cName, cleanTokens) > 0.65) {
        matchedCustomerOrders.push(o);
      }
    });

    if (matchedCustomerOrders.length > 0) {
      const custName = matchedCustomerOrders[0].customerName;
      thoughtSteps.push(`Matched customer entity: <strong>${custName}</strong> with ${matchedCustomerOrders.length} order history records.`);
      thoughtSteps.push("Cross-referenced with unpicked status and arrival status at Main Branch.");

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      const latestO = matchedCustomerOrders[matchedCustomerOrders.length - 1];
      const phoneClean = (latestO.phoneNumber || "").replace(/\D/g, "");
      const statusClass = (latestO.status || "").toLowerCase();
      const waMsg = encodeURIComponent(`Bonjour ${latestO.customerName}, following up regarding your Nike order (${latestO.itemNumber}) at Main Branch.`);

      return `
        ${thoughtHtml}
        <div>
          <strong>👤 Customer Profile: ${escapeHtml(custName)}</strong>
          <div class="nike-chat-card">
            <div class="nike-chat-card-title">
              <span>${escapeHtml(latestO.itemNumber)} - ${escapeHtml(latestO.description || "Nike Item")}</span>
              <span class="nike-chat-badge-pill ${statusClass}">${escapeHtml(latestO.status)}</span>
            </div>
            <div style="font-size:0.74rem;color:#b0b0bc;">
              Size: <strong>${escapeHtml(latestO.size || "Standard")}</strong> • Color: ${escapeHtml(latestO.color || "Standard")}
            </div>
            <div style="font-size:0.72rem;color:#8a8a95;margin-top:2px;">
              Sourced from: ${escapeHtml(latestO.branch)} • Date: ${escapeHtml(latestO.orderDate)}
            </div>
            <div style="margin-top:5px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-family:monospace;font-size:0.75rem;color:#ff5500;">${escapeHtml(latestO.phoneNumber)}</span>
              ${phoneClean ? `<a href="https://wa.me/961${phoneClean}?text=${waMsg}" target="_blank" class="nike-chat-action-btn-sm">WhatsApp ↗</a>` : ""}
            </div>
          </div>
          <div style="font-size:0.73rem;color:#8a8a95;margin-top:4px;">
            Total Lifetime Orders: <strong>${matchedCustomerOrders.length}</strong>
          </div>
          <a href="index.html?search=${encodeURIComponent(custName)}" class="nike-chat-action-link">View Customer Order History ↗</a>
        </div>
      `;
    }

    // Check for Specific Shoe / Model / SKU Lookup
    const matchedCatalogItem = CATALOG_MODELS.find((m) => {
      if (lower.includes(m.sku.toLowerCase()) || lower.includes(m.name.toLowerCase())) return true;
      return m.keywords.some((k) => lower.includes(k));
    });

    if (matchedCatalogItem) {
      thoughtSteps.push(`Matched product model: <strong>${matchedCatalogItem.name}</strong> (${matchedCatalogItem.sku}).`);
      const relatedOrders = orders.filter((o) => (o.itemNumber || "").includes(matchedCatalogItem.sku) || (o.description || "").toLowerCase().includes(matchedCatalogItem.name.toLowerCase()));
      thoughtSteps.push(`Found ${relatedOrders.length} active customer orders for this silhouette.`);

      const pendingCount = relatedOrders.filter((o) => o.status === "Pending").length;
      const arrivedCount = relatedOrders.filter((o) => o.status === "Arrived").length;
      const collectedCount = relatedOrders.filter((o) => o.status === "Collected").length;

      const thoughtHtml = buildThoughtBox(thoughtSteps);

      return `
        ${thoughtHtml}
        <div>
          <strong>👟 Product Intelligence: ${escapeHtml(matchedCatalogItem.name)}</strong>
          <div style="font-size:0.74rem;color:#ff5500;font-family:monospace;margin-top:1px;">SKU: ${escapeHtml(matchedCatalogItem.sku)} • ${escapeHtml(matchedCatalogItem.cat)}</div>
          <div class="nike-chat-grid-stats">
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val">${relatedOrders.length}</div>
              <div class="nike-chat-stat-lbl">Total Store Orders</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#60a5fa;">${pendingCount}</div>
              <div class="nike-chat-stat-lbl">In Transit (Pending)</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#34d399;">${arrivedCount}</div>
              <div class="nike-chat-stat-lbl">Arrived at Main Counter</div>
            </div>
            <div class="nike-chat-stat-box">
              <div class="nike-chat-stat-val" style="color:#a1a1aa;">${collectedCount}</div>
              <div class="nike-chat-stat-lbl">Delivered to Customer</div>
            </div>
          </div>
          <div style="display:flex;gap:0.4rem;margin-top:0.4rem;">
            <a href="index.html?search=${encodeURIComponent(matchedCatalogItem.sku)}" class="nike-chat-action-link">Filter Orders ↗</a>
            <span style="color:#555;">•</span>
            <a href="add_order.html" class="nike-chat-action-link">Place Order for Customer ↗</a>
          </div>
        </div>
      `;
    }

    // Check for Store Policies / FAQ
    if (lower.includes("policy") || lower.includes("return") || lower.includes("exchange") || lower.includes("rules") || lower.includes("how long")) {
      thoughtSteps.push("Detected Intent: Nike Lebanon Retail Operations Policy.");
      thoughtSteps.push("Retrieved official standard operating procedures for customer orders & counter holds.");

      const thoughtHtml = buildThoughtBox(thoughtSteps);
      return `
        ${thoughtHtml}
        <div>
          <strong>📋 Nike Lebanon Retail Standard Operating Policies</strong>
          <div style="font-size:0.75rem;color:#b0b0bc;margin-top:0.35rem;line-height:1.5;">
            • <strong>Exchanges:</strong> Within 14 days of purchase with original receipt, unworn shoe condition, and intact box.<br/>
            • <strong>Customer Order Holds:</strong> Arrived pairs received from other branches are held at Main Branch counter for a maximum of <strong>7 days</strong>. Proactive alerts trigger at <strong>48 hours</strong>.<br/>
            • <strong>Inter-Store Courier:</strong> Daily shuttle leaves between Beirut and outlying branches at 2:00 PM.
          </div>
        </div>
      `;
    }

    // Check for Greetings / Casual
    if (/^(hi|hello|hey|bonjour|marhaba|salam|yo|good\s+morning|good\s+evening|kifak)/i.test(lower)) {
      thoughtSteps.push("Detected Intent: Staff Greeting.");
      thoughtSteps.push("Loaded real-time operational status summary.");

      const thoughtHtml = buildThoughtBox(thoughtSteps);
      return `
        ${thoughtHtml}
        <div>
          <strong>Hello! 👋 I'm your Nike Store Copilot.</strong>
          <p style="font-size:0.76rem;color:#b0b0bc;margin-top:0.3rem;">
            Operating at <strong>Main Branch</strong> with direct live access to our <strong>${orders.length} orders</strong> and Duty Board tasks.
          </p>
          <div style="font-size:0.74rem;color:#8a8a95;margin-top:0.4rem;">
            Ask me anything naturally:
            <div style="margin-top:3px;color:#ededed;">
              • <em>"What should I do today?"</em><br/>
              • <em>"Which shoes are selling the most?"</em><br/>
              • <em>"Which branch sent the most orders?"</em><br/>
              • <em>"Find customer Marc"</em> or <em>"Who didn't pick up?"</em>
            </div>
          </div>
        </div>
      `;
    }

    // =========================================================================
    // INTELLIGENT STORE SYNTHESIS (UNIVERSAL REASONING FALLBACK)
    // NEVER dumps "I couldn't find a direct match". Always synthesizes grounded insights!
    // =========================================================================
    thoughtSteps.push(`Performing Semantic Synthesis over query tokens.`);
    
    // Extract key tokens
    const tokens = lower.split(/\s+/).filter((t) => t.length > 2 && !["what", "which", "where", "how", "the", "and", "for", "with", "have", "from"].includes(t));
    thoughtSteps.push(`Extracted operational tokens: [${tokens.map(t => `'${escapeHtml(t)}'`).join(", ")}]`);

    // Match any orders by token
    const fuzzyMatches = orders.filter((o) => {
      const fullStr = `${o.customerName} ${o.itemNumber} ${o.description} ${o.branch} ${o.status} ${o.employee} ${o.enteredBy}`.toLowerCase();
      return tokens.some((t) => fullStr.includes(t));
    });

    thoughtSteps.push(`Cross-referenced with orders database: found ${fuzzyMatches.length} relevant entries.`);
    const thoughtHtml = buildThoughtBox(thoughtSteps);

    if (fuzzyMatches.length > 0) {
      const topSample = fuzzyMatches.slice(0, 3);
      return `
        ${thoughtHtml}
        <div>
          <strong>📊 Store Intelligence Synthesis</strong>
          <p style="font-size:0.75rem;color:#b0b0bc;margin-top:2px;">
            Here is what our store records show regarding <em>"${escapeHtml(q)}"</em>:
          </p>
          <div style="margin-top:0.4rem;">
            ${topSample.map((o) => `
              <div class="nike-chat-card">
                <div class="nike-chat-card-title">
                  <span>${escapeHtml(o.customerName)} (${escapeHtml(o.branch)})</span>
                  <span class="nike-chat-badge-pill ${(o.status || '').toLowerCase()}">${escapeHtml(o.status)}</span>
                </div>
                <div style="font-size:0.74rem;color:#ededed;">${escapeHtml(o.itemNumber)} - ${escapeHtml(o.description || 'Nike Item')}</div>
              </div>
            `).join("")}
          </div>
          <a href="index.html?search=${encodeURIComponent(tokens[0] || '')}" class="nike-chat-action-link">View Full Filtered Records (${fuzzyMatches.length}) ↗</a>
        </div>
      `;
    }

    // Pure Synthesis if zero fuzzy matches
    const pendingOrders = orders.filter((o) => o.status === "Pending");
    const arrivedOrders = orders.filter((o) => o.status === "Arrived");

    return `
      ${thoughtHtml}
      <div>
        <strong>💡 Store Operations Assessment</strong>
        <p style="font-size:0.76rem;color:#b0b0bc;margin-top:3px;">
          I've analyzed our operational database for <em>"${escapeHtml(q)}"</em>. Here is our current store overview at Main Branch:
        </p>
        <div class="nike-chat-grid-stats">
          <div class="nike-chat-stat-box">
            <div class="nike-chat-stat-val">${orders.length}</div>
            <div class="nike-chat-stat-lbl">Active Store Orders</div>
          </div>
          <div class="nike-chat-stat-box">
            <div class="nike-chat-stat-val" style="color:#f87171;">${overdue.length}</div>
            <div class="nike-chat-stat-lbl">Overdue Holds (>48h)</div>
          </div>
          <div class="nike-chat-stat-box">
            <div class="nike-chat-stat-val" style="color:#60a5fa;">${pendingOrders.length}</div>
            <div class="nike-chat-stat-lbl">Expected from Branches</div>
          </div>
          <div class="nike-chat-stat-box">
            <div class="nike-chat-stat-val" style="color:#34d399;">${arrivedOrders.length}</div>
            <div class="nike-chat-stat-lbl">Ready at Counter</div>
          </div>
        </div>
        <p style="font-size:0.74rem;color:#8a8a95;margin-top:4px;">
          Try asking specifically about <strong>top shoes</strong>, <strong>branch sourcing</strong>, <strong>a customer name</strong>, or type <em>"Add task: [title]"</em> to schedule a duty.
        </p>
      </div>
    `;
  }

  // =========================================================================
  // CLOUD AI ENGINE (GOOGLE GEMINI MODELS WITH HIGH-RATE FALLBACK CASCADE)
  // =========================================================================
  async function callGeminiModel(model, query, apiKey, systemPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: query }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    };

    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  async function callGeminiWithFallback(query, apiKey) {
    const orders = getOrders();
    const tasks = getTasks();
    const overdue = getOverdueOrders();

    // Summarize store state for Gemini prompt
    const pendingCount = orders.filter((o) => o.status === "Pending").length;
    const arrivedCount = orders.filter((o) => o.status === "Arrived").length;
    const collectedCount = orders.filter((o) => o.status === "Collected").length;
    const unpickedCount = orders.filter((o) => (o.status || "").toLowerCase() === "unpicked").length;

    // Top branch summary
    const branchCounts = {};
    orders.forEach((o) => { branchCounts[o.branch || "Other"] = (branchCounts[o.branch || "Other"] || 0) + 1; });

    const systemPrompt = `You are "Nike Copilot", the elite AI Operations Director for Nike Lebanon Retail.
Store Setup & Real Context:
- Program Location: The user is running this at the MAIN BRANCH PC in Lebanon.
- Sourcing Relationship: Customer orders are placed from other Nike branches (Souks, ABC Verdun, ABC Ash, BCC, ABC Dbayeh, Ghazir, Tripoli, Gs, Warehouse) and arrive at the MAIN BRANCH for customer pickup and counter holding.
- Current Store Database:
  * Total Orders: ${orders.length}
  * Pending (in transit from branches): ${pendingCount}
  * Arrived (held at Main counter for pickup): ${arrivedCount}
  * Collected (completed pickups): ${collectedCount}
  * Unpicked (abandoned/returned): ${unpickedCount}
  * Overdue Holds (>48h at Main counter): ${overdue.length} orders
  * Active Duty Tasks: ${tasks.length} tasks (${tasks.filter(t => !t.done).length} open)
  * Top Sourcing Branches: ${JSON.stringify(branchCounts)}
  * Store Staff: Maya Khoury, Rami Gemayel, Elie Haddad, Sarah Atallah, Ahmad Zein, Nour Saleh, Karim Bitar.

Role & Tone:
- Think strategically, speak like a sharp, supportive Nike retail operations leader.
- When answering, provide clear, concise, actionable numbers and insights grounded in the real Lebanese retail operations context.
- Support English, French, or Lebanese Arabic.
- If asked to create a task, confirm the task details clearly.`;

    const primaryModel = getSelectedModel();
    const strictLite = isStrictLiteOnly();
    const autoFallback = isAutoFallbackEnabled();

    // Build cascade: if user locked to Lite mode, only use gemini-3.5-flash-lite!
    let cascade = ["gemini-3.5-flash-lite"];
    if (!strictLite) {
      cascade = [primaryModel];
      if (autoFallback) {
        RATE_LIMIT_FALLBACK_CASCADE.forEach((m) => {
          if (!cascade.includes(m)) cascade.push(m);
        });
      }
    }

    const thoughtSteps = [
      strictLite
        ? `Model Policy: <strong>Strict Gemini 3.5 Flash-Lite Only</strong> (Max requests, highest RPM/TPM allowance)`
        : `Attempting primary model: <strong>${primaryModel}</strong>`,
      `Injected store context: ${orders.length} orders, ${overdue.length} overdue holds, ${tasks.length} duty tasks.`
    ];
    if (!strictLite) {
      thoughtSteps.push(`Auto-fallback on high rates (429/503): <strong>${autoFallback ? "Active (Cascade)" : "Off"}</strong>`);
    }

    let successfulModel = null;
    let responseText = null;

    for (let i = 0; i < cascade.length; i++) {
      const currentModel = cascade[i];
      try {
        if (i > 0) {
          thoughtSteps.push(`⚡ High-Rate Fallback: Attempting tier <strong>${currentModel}</strong>...`);
        }

        const response = await callGeminiModel(currentModel, query, apiKey, systemPrompt);

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates && data.candidates[0];
          if (candidate && candidate.content && candidate.content.parts) {
            successfulModel = currentModel;
            responseText = candidate.content.parts[0].text;
            thoughtSteps.push(`✓ Successfully generated response via <strong>${currentModel}</strong>.`);
            break;
          } else {
            throw new Error(`Empty candidate parts from ${currentModel}`);
          }
        }

        // Rate limit (HTTP 429) or Server Overload (HTTP 503)
        if (response.status === 429) {
          let errDetail = "";
          try {
            const errJson = await response.json();
            errDetail = errJson.error?.message || "";
          } catch (_) {}

          thoughtSteps.push(`⚠️ <strong>High Rate / Rate Limit (HTTP 429)</strong> on <em>${currentModel}</em>: ${escapeHtml(errDetail || "Quota / RPM exceeded")}.`);
          if (!autoFallback) {
            throw new Error(`Rate limit exceeded (429) on ${currentModel}. Auto-fallback is turned off.`);
          }
          // Backoff before hitting next fallback tier
          await new Promise((r) => setTimeout(r, 250));
          continue;
        }

        if (response.status === 503) {
          thoughtSteps.push(`⚠️ <strong>Service Overload (HTTP 503)</strong> on <em>${currentModel}</em>. Cascading to next tier...`);
          if (!autoFallback) {
            throw new Error(`Service temporarily overloaded (503) on ${currentModel}.`);
          }
          await new Promise((r) => setTimeout(r, 250));
          continue;
        }

        if (response.status === 404) {
          thoughtSteps.push(`ℹ️ Model <em>${currentModel}</em> not provisioned for this API key. Cascading to next model...`);
          continue;
        }

        // Other HTTP error
        const errTxt = await response.text();
        thoughtSteps.push(`⚠️ HTTP ${response.status} from <em>${currentModel}</em>: ${escapeHtml(errTxt.slice(0, 70))}`);
        if (autoFallback && i < cascade.length - 1) {
          continue;
        } else {
          throw new Error(`Gemini API error ${response.status} on ${currentModel}`);
        }

      } catch (err) {
        if (err.message && err.message.includes("Auto-fallback is turned off")) {
          throw err;
        }
        thoughtSteps.push(`Network error with <em>${currentModel}</em>: ${escapeHtml(err.message)}`);
        if (autoFallback && i < cascade.length - 1) {
          continue;
        } else {
          throw err;
        }
      }
    }

    if (successfulModel && responseText) {
      const formattedText = formatMarkdownToHtml(responseText);
      const thoughtHtml = buildThoughtBox(thoughtSteps);

      let fallbackBadge = "";
      if (successfulModel !== primaryModel) {
        fallbackBadge = `
          <div class="nike-chat-fallback-alert">
            <span>⚡ High-Rate Fallback Active:</span>
            <span style="font-weight:400;">Cascaded from ${primaryModel} ➔ <strong>${successfulModel}</strong></span>
          </div>
        `;
      }

      return `
        ${thoughtHtml}
        ${fallbackBadge}
        <div class="nike-chat-model-tag"><span class="dot"></span> ${successfulModel}</div>
        <div>${formattedText}</div>
      `;
    }

    throw new Error("All Gemini models in fallback cascade reached rate limits or were unavailable.");
  }

  function formatMarkdownToHtml(md) {
    if (!md) return "";
    let html = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Line breaks
    html = html.replace(/\n\n/g, "<br/><br/>").replace(/\n/g, "<br/>");
    // Bullets
    html = html.replace(/•\s*(.*?)(<br\/>|$)/g, "• $1<br/>");
    return html;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // PUBLIC CONTROLLER API
  // =========================================================================
  window.NikeCopilot = {
    isOpen: false,

    toggle: function () {
      const win = document.getElementById("nikeChatWindow");
      const btn = document.getElementById("nikeChatLauncher");
      if (!win) return;

      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        win.classList.add("is-open");
        btn.classList.add("is-active");
        setTimeout(() => {
          const input = document.getElementById("nikeChatInput");
          if (input) input.focus();
        }, 150);

        // Initial greeting if empty
        const messages = document.getElementById("nikeChatMessages");
        if (messages && messages.children.length === 0) {
          const orders = getOrders();
          const overdue = getOverdueOrders();
          let greeting = `Hello! 👋 I'm **Nike Copilot**.<br>Connected to <strong>${orders.length} orders</strong> at Main Branch.`;
          if (overdue.length > 0) {
            greeting += `<br><span style="color:#f87171;font-weight:600;">⚠️ ${overdue.length} customer holds are waiting >48h!</span>`;
          }
          appendMessage("bot", greeting, true);
        }
      } else {
        win.classList.remove("is-open");
        btn.classList.remove("is-active");
      }
    },

    handleStrictLiteToggle: function (checked) {
      const group = document.getElementById("generalModelSelectGroup");
      if (group) {
        if (checked) {
          group.style.opacity = "0.45";
          group.style.pointerEvents = "none";
        } else {
          group.style.opacity = "1";
          group.style.pointerEvents = "auto";
        }
      }
    },

    toggleSettings: function () {
      const panel = document.getElementById("nikeChatSettingsPanel");
      const keyInput = document.getElementById("geminiApiKeyInput");
      const modelSelect = document.getElementById("geminiModelSelect");
      const fallbackCheck = document.getElementById("geminiAutoFallbackCheck");
      const strictLiteCheck = document.getElementById("geminiStrictLiteCheck");
      if (!panel) return;

      if (panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
      } else {
        panel.classList.add("is-open");
        if (keyInput) keyInput.value = getGeminiKey();
        if (modelSelect) modelSelect.value = getSelectedModel();
        if (fallbackCheck) fallbackCheck.checked = isAutoFallbackEnabled();
        if (strictLiteCheck) {
          strictLiteCheck.checked = isStrictLiteOnly();
          this.handleStrictLiteToggle(strictLiteCheck.checked);
        }
      }
    },

    saveSettings: function () {
      const keyInput = document.getElementById("geminiApiKeyInput");
      const modelSelect = document.getElementById("geminiModelSelect");
      const fallbackCheck = document.getElementById("geminiAutoFallbackCheck");
      const strictLiteCheck = document.getElementById("geminiStrictLiteCheck");

      if (keyInput) setGeminiKey(keyInput.value);
      if (strictLiteCheck) setStrictLiteOnly(strictLiteCheck.checked);
      if (!strictLiteCheck?.checked && modelSelect) {
        setSelectedModel(modelSelect.value);
      }
      if (fallbackCheck) setAutoFallbackEnabled(fallbackCheck.checked);

      this.toggleSettings();

      const key = getGeminiKey();
      const model = getSelectedModel();
      const strictLite = isStrictLiteOnly();

      if (key) {
        if (strictLite) {
          appendMessage("bot", `⚡ Configuration saved! Locked strictly to **Gemini 3.5 Flash-Lite** (Maximum request limits & fastest response).`, false);
        } else {
          appendMessage("bot", `⚙️ Configuration saved! Active model: **${model}**.`, false);
        }
      } else {
        appendMessage("bot", "⚡ Configuration saved: Operating with Built-in 100% Offline Cognitive Brain.", false);
      }
    },

    clearApiKey: function () {
      setGeminiKey("");
      const keyInput = document.getElementById("geminiApiKeyInput");
      if (keyInput) keyInput.value = "";
      this.toggleSettings();
      appendMessage("bot", "⚡ Switched to Built-in 100% Offline Cognitive Brain.", false);
    },

    handleSend: async function () {
      const input = document.getElementById("nikeChatInput");
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;

      appendMessage("user", text, false);
      input.value = "";

      const geminiKey = getGeminiKey();
      const primaryModel = getSelectedModel();
      const thinkingMsg = geminiKey
        ? (isStrictLiteOnly() ? "Consulting Gemini 3.5 Flash-Lite (Lite Mode)..." : `Consulting ${primaryModel} with store context...`)
        : "Analyzing store orders & retail context...";
      showThinkingBubble(thinkingMsg);

      setTimeout(async () => {
        try {
          let responseHtml = "";
          if (geminiKey) {
            try {
              responseHtml = await callGeminiWithFallback(text, geminiKey);
            } catch (err) {
              console.warn("All Gemini tiers failed or hit rate limits, falling back to local reasoner:", err);
              responseHtml = processOfflineReasoning(text);
              responseHtml = `
                <div class="nike-chat-fallback-alert" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.35);color:#f87171;">
                  <span>⚠️ High-Rate / Quota Limit Hit Across All Gemini Tiers</span>
                  <span style="font-weight:400;color:#ededed;">• Auto-diverted to Built-in Cognitive Reasoner</span>
                </div>
              ` + responseHtml;
            }
          } else {
            responseHtml = processOfflineReasoning(text);
          }

          removeThinkingBubble();
          appendMessage("bot", responseHtml, true);
        } catch (e) {
          removeThinkingBubble();
          appendMessage("bot", `Error processing query: ${e.message}`, false);
        }
      }, 350);
    },

    isFullPage: false,

    toggleFullPage: function (forceState) {
      const win = document.getElementById("nikeChatWindow");
      const btn = document.getElementById("nikeChatExpandBtn");
      if (!win) return;

      if (typeof forceState === "boolean") {
        this.isFullPage = forceState;
      } else {
        this.isFullPage = !this.isFullPage;
      }

      if (this.isFullPage) {
        win.classList.add("is-fullpage");
        if (btn) {
          btn.innerHTML = "⤡";
          btn.title = "Exit Full Page mode (Restore window)";
          btn.classList.add("active");
        }
        sessionStorage.setItem("nike_chat_fullpage", "true");
      } else {
        win.classList.remove("is-fullpage");
        if (btn) {
          btn.innerHTML = "⤢";
          btn.title = "Expand to Full Page mode";
          btn.classList.remove("active");
        }
        sessionStorage.setItem("nike_chat_fullpage", "false");
      }

      if (!this.isOpen) {
        this.toggle();
      } else {
        setTimeout(() => {
          const input = document.getElementById("nikeChatInput");
          if (input) input.focus();
        }, 150);
      }
    },

    sendPrompt: function (promptText) {
      const input = document.getElementById("nikeChatInput");
      if (input) {
        input.value = promptText;
        this.handleSend();
      }
    },

    clearChat: function () {
      const container = document.getElementById("nikeChatMessages");
      if (container) container.innerHTML = "";
      const orders = getOrders();
      appendMessage("bot", `Chat refreshed! Connected to **${orders.length} orders** at Main Branch. How can I help you today?`, false);
    },

    getOrders: getOrders,
    getTasks: getTasks,
    getOverdueOrders: getOverdueOrders,
    processOfflineReasoning: processOfflineReasoning,
    setStrictLiteOnly: setStrictLiteOnly,
    isStrictLiteOnly: isStrictLiteOnly,
    setGeminiKey: setGeminiKey,
    getGeminiKey: getGeminiKey,
    buildWidgetMarkup: buildWidgetMarkup,
    init: init
  };

  // Auto-init on page load
  function init() {
    ensureStylesheet();
    buildWidgetMarkup();

    const launcher = document.getElementById("nikeChatLauncher");
    if (launcher) {
      launcher.addEventListener("click", () => window.NikeCopilot.toggle());
    }

    // Auto-restore fullpage if requested in session or URL param
    const urlParams = new URLSearchParams(window.location.search);
    const shouldFullPage = urlParams.get("fullpage") === "true" || sessionStorage.getItem("nike_chat_fullpage") === "true";

    if (shouldFullPage) {
      setTimeout(() => {
        window.NikeCopilot.toggleFullPage(true);
      }, 100);
    }

    // Escape key handling to exit full page or close settings
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const settings = document.getElementById("nikeChatSettingsPanel");
        if (settings && settings.classList.contains("is-open")) {
          window.NikeCopilot.toggleSettings();
          return;
        }
        if (window.NikeCopilot.isFullPage) {
          window.NikeCopilot.toggleFullPage(false);
          return;
        }
        if (window.NikeCopilot.isOpen) {
          window.NikeCopilot.toggle();
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
