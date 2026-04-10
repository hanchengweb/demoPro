const CATEGORIES = [
  { id: 'physics', name: '物理学', icon: '⚛', color: '#0ea5e9', desc: '力学、电磁、光学与热学可视化。' },
  { id: 'chemistry', name: '化学', icon: '🧪', color: '#10b981', desc: '反应过程、滴定实验与分子结构演示。' },
  { id: 'biology', name: '生物学', icon: '🧬', color: '#f59e0b', desc: '细胞结构、代谢与生态过程模拟。' },
  { id: 'mathematics', name: '数学', icon: '∑', color: '#8b5cf6', desc: '函数、统计与几何动态展示。' },
  { id: 'engineering', name: '工程学', icon: '⚙', color: '#f97316', desc: '结构、流体、热传导与仪表盘。' },
  { id: 'electronics', name: '电子电路', icon: '🔌', color: '#14b8a6', desc: '串并联、RC 电路与信号流。' },
  { id: 'geography', name: '地理天文', icon: '🌍', color: '#84cc16', desc: '天体、水循环与地理过程演示。' },
  { id: 'medicine', name: '医学', icon: '🩺', color: '#ec4899', desc: '病理生理、器官系统与临床教学。' },
  { id: 'computer', name: '计算机', icon: '💻', color: '#6366f1', desc: '算法、网络与数据结构可视化。' },
  { id: 'environment', name: '环境科学', icon: '🌱', color: '#22c55e', desc: '生态、扩散、监测与污染路径。' },
  { id: 'materials', name: '材料科学', icon: '💎', color: '#fb7185', desc: '材料性能、晶体与相变模拟。' },
  { id: 'psychology', name: '心理学', icon: '🧠', color: '#a855f7', desc: '认知实验、反应时与行为分析。' },
  { id: 'economics', name: '经济学', icon: '📈', color: '#06b6d4', desc: '供需、博弈与宏观经济图景。' },
];

const QUICK_PROMPTS = {
  physics: [
    '单摆运动仿真，可调节摆长、重力加速度和初始角度，实时显示周期。',
    '抛体运动实验，展示速度分量、轨迹和落点变化。',
    '双缝干涉演示，显示波前、干涉条纹和波长参数。'
  ],
  chemistry: [
    '酸碱滴定实验，动态显示 pH 曲线与指示剂颜色变化。',
    '化学反应速率与温度关系，展示分子运动和速率常数。',
    '理想气体状态方程演示，展示压强、体积、温度联动。'
  ],
  biology: [
    '细胞有丝分裂过程，按时期切换并带教学说明。',
    'DNA 复制过程演示，显示双螺旋拆解和配对过程。',
    '光合作用系统，展示光反应和暗反应的能量流。'
  ],
  medicine: [
    '肺水肿病理生理演示系统，左侧控制台，中间仿真区，右侧数据面板。',
    '心脏泵血和血液循环演示，带实时心率与流量曲线。',
    '药代动力学实验，比较不同给药方式下血药浓度变化。'
  ],
  default: [
    '创建一个适合本科课堂演示的交互式虚拟实验。',
    '生成一个带控制台、动画区和数据面板的实验系统。',
    '做一个可下载分享的单文件 HTML 教学实验。'
  ]
};

const EXAMPLES = [
  { id: '1', title: '单摆运动', category: 'physics', desc: '实时显示角度、速度与周期。', prompt: '创建一个单摆运动仿真，可调节摆长、重力加速度和初始角度，实时显示周期与角位移曲线。' },
  { id: '2', title: '抛体运动', category: 'physics', desc: '展示初速度、角度与轨迹。', prompt: '设计一个抛体运动实验，展示速度分量、最高点和落点，允许调节初速度和发射角。' },
  { id: '3', title: '双缝干涉', category: 'physics', desc: '强调波前与条纹变化。', prompt: '生成双缝干涉实验，显示波前传播、干涉条纹和波长参数调节。' },
  { id: '4', title: '酸碱滴定', category: 'chemistry', desc: '显示 pH 曲线与颜色变化。', prompt: '创建酸碱滴定实验，动态显示滴定过程、pH 曲线、指示剂颜色变化与终点判断。' },
  { id: '5', title: '理想气体状态方程', category: 'chemistry', desc: '联动 P、V、T 参数。', prompt: '设计理想气体状态方程实验，展示压强、体积、温度的联动变化和微观粒子运动。' },
  { id: '6', title: '化学平衡移动', category: 'chemistry', desc: '展示勒夏特列原理。', prompt: '生成化学平衡移动实验，允许调节温度和浓度，展示勒夏特列原理与平衡状态变化。' },
  { id: '7', title: '细胞分裂', category: 'biology', desc: '按时期分段演示。', prompt: '创建细胞有丝分裂过程演示，按前期、中期、后期和末期切换，带结构标注和教学说明。' },
  { id: '8', title: 'DNA 复制', category: 'biology', desc: '双螺旋与配对过程。', prompt: '设计 DNA 复制演示，展示双螺旋展开、碱基配对和复制过程。' },
  { id: '9', title: '光合作用', category: 'biology', desc: '突出能量转换。', prompt: '生成光合作用实验，展示光反应、暗反应和能量转换路径，并带数据面板。' },
  { id: '10', title: '正态分布', category: 'mathematics', desc: '动态调整均值和方差。', prompt: '创建正态分布可视化实验，可调节均值与标准差，并显示概率密度曲线和置信区间。' },
  { id: '11', title: '导数几何意义', category: 'mathematics', desc: '切线动态变化。', prompt: '设计导数几何意义演示，动态展示切线斜率与函数图像联动，适合课堂讲解。' },
  { id: '12', title: '蒙特卡洛估算 π', category: 'mathematics', desc: '随机点与收敛曲线。', prompt: '创建蒙特卡洛估算圆周率实验，显示随机点分布、命中率与收敛曲线。' },
  { id: '13', title: '桥梁受力', category: 'engineering', desc: '结构力学仪表盘。', prompt: '设计桥梁受力分析实验，展示结构节点、受力颜色变化和关键载荷数据。' },
  { id: '14', title: '伯努利原理', category: 'engineering', desc: '流速与压强联动。', prompt: '生成伯努利原理演示，展示流体流速、压强与截面积关系，界面风格偏工程仪表盘。' },
  { id: '15', title: '热传导', category: 'engineering', desc: '一维热传导过程。', prompt: '创建热传导实验，展示一维热传导过程、温度分布图与材料参数调节。' },
  { id: '16', title: '串并联电路', category: 'electronics', desc: '电压电流实时联动。', prompt: '设计串联和并联电路仿真实验，显示电阻、电压、电流变化和简洁电路图。' },
  { id: '17', title: 'RC 电路', category: 'electronics', desc: '充放电曲线。', prompt: '生成 RC 电路充放电实验，展示电压、电流随时间变化和电容充放电动画。' },
  { id: '18', title: '太阳系运行', category: 'geography', desc: '轨道与周期演示。', prompt: '创建太阳系行星运行演示，展示轨道、周期和缩放关系，适合课堂讲解。' },
  { id: '19', title: '水循环', category: 'geography', desc: '蒸发凝结降水全过程。', prompt: '设计自然界水循环实验，展示蒸发、凝结、降水与径流过程，并配教学说明。' },
  { id: '20', title: '肺水肿演示', category: 'medicine', desc: '病理生理 + 监测面板。', prompt: '创建肺水肿病理生理演示系统，左侧控制台、中间仿真区、右侧教学指南和实时数据。' },
  { id: '21', title: '血液循环', category: 'medicine', desc: '心脏泵血过程。', prompt: '设计心脏血液循环实验，展示心腔、血流方向、心率变化和血氧指标。' },
  { id: '22', title: '斯特鲁普效应', category: 'psychology', desc: '反应时测量实验。', prompt: '创建斯特鲁普效应实验，展示颜色词不一致刺激、反应时记录和结果统计。' },
  { id: '23', title: '遗忘曲线', category: 'psychology', desc: '记忆衰减过程。', prompt: '设计艾宾浩斯遗忘曲线实验，显示时间与记忆强度变化，并带复习频率控制。' },
  { id: '24', title: '供需均衡', category: 'economics', desc: '供需曲线与成交点。', prompt: '创建供需均衡实验，展示供给曲线、需求曲线、均衡点和价格波动。' },
];

const PROMPTS = {
  optimizeSystem: `你是虚拟实验产品里的“实验策划顾问”。你的任务是把用户原始想法改写成更适合生成交互式虚拟实验的 brief。

要求：
1. 输出 JSON，不要输出 markdown。
2. JSON 结构必须为：
{
  "title": "简洁标题",
  "improvedPrompt": "改写后的完整 brief，包含实验目的、核心现象、交互控件、数据面板与教学说明",
  "highlights": ["亮点1","亮点2","亮点3"],
  "warning": "可选提醒，没有则返回空字符串"
}
3. 文风专业、清晰、适合教学场景。`,
  specSystem: `你是虚拟实验产品里的“实验架构师”。你只负责把用户需求转成结构化实验规格，不直接写 HTML。

输出规则：
1. 只输出 JSON，不要输出 markdown。
2. JSON 必须包含以下字段：
{
  "title": "实验标题",
  "subject": "学科领域",
  "audience": "受众层级",
  "goal": "实验目标",
  "summary": "一句话概括实验成品",
  "learningObjectives": ["目标1","目标2"],
  "layout": "推荐布局说明",
  "visualStyle": "视觉风格总结",
  "simulationCore": "核心模拟对象与变化逻辑",
  "controls": [
    { "id": "param1", "label": "参数名", "type": "range|select|toggle|number", "default": "默认值", "min": "最小值", "max": "最大值", "step": "步长", "unit": "单位", "purpose": "用途" }
  ],
  "dataPanels": ["需要展示的关键指标"],
  "charts": ["需要出现的图表"],
  "teachingGuidance": ["教师可讲解的知识点"],
  "animationCues": ["应出现的关键动画"],
  "acceptanceChecks": ["最终页面必须满足的检查项"]
}
3. controls 至少给出 3 个。
4. acceptanceChecks 必须覆盖交互、可视化、教学说明和响应式布局。`,
  generateSystem: `You are a senior front-end engineer and interaction designer for education products.

Your task: generate a complete standalone HTML file for an interactive virtual experiment.

Non-negotiable constraints:
- Output only HTML, starting with <!DOCTYPE html>.
- Single-file HTML only. Inline CSS and JS. No markdown fences.
- The result must run directly in a browser without build tools.
- Use modern, polished UI with clear hierarchy and strong visual intent.
- Avoid generic admin-dashboard aesthetics. It should feel like an experiment studio.
- Use responsive layout for desktop and mobile.
- Include: controls panel, main simulation area, data panel, teaching guidance.
- Include meaningful animation tied to the phenomenon.
- Prefer SVG for core diagrams. Chart.js may be used for charts if needed.
- Every control must visibly affect the experiment.
- Add concise comments only where a block is genuinely complex.

Quality bar:
- The page should look intentionally designed, not like placeholder output.
- The simulation must be coherent with the scientific topic.
- The teaching guide should help an instructor explain the result.
- Buttons and controls must feel production-ready.

Return only the HTML.`,
  critiqueSystem: `你是虚拟实验产品里的“质量评审官”。你要检查生成结果是否真的适合教学使用。

只输出 JSON，不要输出 markdown。JSON 结构必须是：
{
  "pass": true,
  "summary": "一句话结论",
  "issues": [
    { "severity": "low|medium|high", "title": "问题标题", "detail": "问题说明" }
  ],
  "revisionPrompt": "如果需要修复，这里给出一段明确的修复指令；如果通过则返回空字符串"
}

检查重点：
1. 页面是否是完整的 HTML。
2. 是否真的有控件、仿真区、数据面板、教学说明。
3. 控件是否看起来会驱动实验，而不是摆设。
4. 视觉是否有成品感，避免平庸后台风。
5. 是否适合当前学科和教学目标。
6. 是否存在明显的脚本、结构或内容占位问题。`,
  repairSystem: `You are fixing an existing virtual experiment HTML file.

Rules:
- Return only the full fixed HTML.
- Preserve the successful parts of the current output.
- Fix the issues called out in the review.
- Keep the experience polished and coherent.
- Do not explain your changes.`,
};

const PIPELINE_TEMPLATE = [
  { id: 'brief', label: '规划 brief', description: '把用户需求转成更完整的实验 brief。', status: 'pending' },
  { id: 'spec', label: '生成规格', description: '把需求拆成控件、图表、教学说明和布局。', status: 'pending' },
  { id: 'build', label: '生成成品', description: '输出可运行的单文件 HTML 实验。', status: 'pending' },
  { id: 'review', label: '质量自检', description: '检查交互完整性并在必要时做一次修复。', status: 'pending' },
];

const FALLBACK_PRESETS = [
  { id: 'quick', label: '快速', description: '偏向低成本与高吞吐，适合快速试跑。', provider: 'deepseek', model: 'deepseek-chat', available: false },
  { id: 'balanced', label: '平衡', description: '默认推荐，兼顾理解、代码稳定性和成品感。', provider: 'zhipu', model: 'glm-5.1', available: false },
  { id: 'premium', label: '精品', description: '偏向界面成品感和最终导出质量。', provider: 'moonshot', model: 'kimi-k2.5', available: false },
];

const state = {
  user: null,
  selectedCategory: 'medicine',
  selectedPreset: 'balanced',
  models: [...FALLBACK_PRESETS],
  isGenerating: false,
  previewMode: 'preview',
  history: [],
  userCases: [],
  schoolCases: [],
  userList: [
    { id: '1', username: 'admin', password: 'admin123', name: '系统管理员', role: 'admin', college: '信息中心' },
    { id: '2', username: 'teacher', password: '123456', name: '张老师', role: 'teacher', college: '医学院' },
  ],
  activeCaseTab: 'my',
  exampleFilter: 'all',
  currentExperiment: null,
  optimizedDraft: null,
  currentSpec: null,
  currentCritique: null,
  pipeline: clonePipeline(),
  generationDraft: {
    prompt: '',
    notes: '',
    goal: 'exploration',
    audience: 'college',
    complexity: 'standard',
    chartLevel: 'basic',
    visualStyle: 'research-blue',
  },
};

function clonePipeline() {
  return PIPELINE_TEMPLATE.map((item) => ({ ...item }));
}

function saveState() {
  const snapshot = {
    history: state.history,
    userCases: state.userCases,
    schoolCases: state.schoolCases,
    userList: state.userList,
    selectedCategory: state.selectedCategory,
    selectedPreset: state.selectedPreset,
    generationDraft: state.generationDraft,
  };
  localStorage.setItem('wemoreai_state_v2', JSON.stringify(snapshot));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('wemoreai_state_v2'));
    if (!saved) return;

    state.history = saved.history || [];
    state.userCases = saved.userCases || [];
    state.schoolCases = saved.schoolCases || [];
    state.userList = saved.userList || state.userList;
    state.selectedCategory = saved.selectedCategory || state.selectedCategory;
    state.selectedPreset = saved.selectedPreset || state.selectedPreset;
    state.generationDraft = { ...state.generationDraft, ...(saved.generationDraft || {}) };
  } catch (_err) {
    // Ignore malformed local state
  }
}

function byId(id) {
  return document.getElementById(id);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCategory(categoryId) {
  return CATEGORIES.find((item) => item.id === categoryId) || CATEGORIES[0];
}

function getPreset(presetId) {
  return state.models.find((item) => item.id === presetId) || state.models[0];
}

function showToast(message) {
  window.alert(message);
}

function setPipelineStep(stepId, status, message) {
  state.pipeline = state.pipeline.map((item) => {
    if (item.id === stepId) {
      return { ...item, status, message: message || item.message };
    }
    if (status === 'active' && item.status === 'active' && item.id !== stepId) {
      return { ...item, status: 'done' };
    }
    return item;
  });
  renderPipeline();
}

function resetPipeline(message = '等待输入实验 brief') {
  state.pipeline = clonePipeline();
  byId('pipeline-status-text').textContent = message;
  renderPipeline();
}

function renderPipeline() {
  byId('pipeline-board').innerHTML = state.pipeline.map((item) => `
    <article class="pipeline-step ${item.status}">
      <div class="pipeline-badge">
        <span>${item.status === 'done' ? '✓' : item.status === 'active' ? '✦' : '·'}</span>
        ${item.label}
      </div>
      <p class="mt-3 text-sm leading-7 text-slate-600">${item.message || item.description}</p>
    </article>
  `).join('');
}

function renderPortalSubjects() {
  byId('portal-subjects').innerHTML = CATEGORIES.map((item) => `
    <article class="card-panel p-4">
      <div class="text-2xl">${item.icon}</div>
      <div class="mt-3 text-sm font-semibold text-slate-900">${item.name}</div>
      <div class="mt-2 text-xs leading-6 text-slate-500">${item.desc}</div>
    </article>
  `).join('');
}

function renderCategoryTags() {
  byId('category-tags').innerHTML = CATEGORIES.map((item) => `
    <button class="category-chip ${state.selectedCategory === item.id ? 'active' : ''}" onclick="selectCategory('${item.id}')">${item.icon} ${item.name}</button>
  `).join('');
}

function renderQuickPrompts() {
  const prompts = QUICK_PROMPTS[state.selectedCategory] || QUICK_PROMPTS.default;
  byId('quick-prompts').innerHTML = prompts.map((prompt) => `
    <button class="quick-chip" onclick="useQuickPrompt(${JSON.stringify(prompt)})">${escapeHtml(prompt)}</button>
  `).join('');
}

function renderPresetCards() {
  byId('preset-cards').innerHTML = state.models.map((item) => `
    <button class="preset-card ${state.selectedPreset === item.id ? 'active' : ''} ${item.available ? '' : 'disabled'}" onclick="selectPreset('${item.id}')">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-base font-semibold text-slate-900">${item.label}</div>
          <div class="mt-2 text-sm leading-7 text-slate-600">${item.description}</div>
        </div>
        <span class="status-dot ${item.available ? 'available' : ''}"></span>
      </div>
      <div class="preset-meta mt-4">
        <span>${item.provider}</span>
        <span>·</span>
        <span>${item.model}</span>
      </div>
    </button>
  `).join('');
}

function renderExamples() {
  byId('examples-filter').innerHTML = `
    <button class="filter-chip ${state.exampleFilter === 'all' ? 'active' : ''}" onclick="filterExamples('all')">全部</button>
    ${CATEGORIES.map((item) => `<button class="filter-chip ${state.exampleFilter === item.id ? 'active' : ''}" onclick="filterExamples('${item.id}')">${item.icon} ${item.name}</button>`).join('')}
  `;

  const filtered = state.exampleFilter === 'all' ? EXAMPLES : EXAMPLES.filter((item) => item.category === state.exampleFilter);
  byId('examples-grid').innerHTML = filtered.map((item) => {
    const category = getCategory(item.category);
    return `
      <article class="card-panel cursor-pointer p-5 transition hover:-translate-y-0.5" onclick="useExample('${item.id}')">
        <div class="flex items-center gap-3">
          <div class="feature-icon" style="background:${category.color}20;color:${category.color}">${category.icon}</div>
          <div>
            <div class="text-lg font-semibold text-slate-900">${item.title}</div>
            <div class="text-xs text-slate-400">${category.name}</div>
          </div>
        </div>
        <p class="mt-4 text-sm leading-7 text-slate-600">${item.desc}</p>
      </article>
    `;
  }).join('');
}

function renderCaseLibrary() {
  const collection = state.activeCaseTab === 'my' ? state.userCases : state.schoolCases;

  byId('case-list').innerHTML = collection.length ? collection.map((item) => {
    const category = getCategory(item.category);
    return `
      <article class="card-panel p-4">
        <div class="flex items-start gap-4">
          <div class="feature-icon" style="background:${category.color}20;color:${category.color}">${category.icon}</div>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">${item.title}</h3>
                <p class="mt-2 text-sm leading-7 text-slate-500">${item.description}</p>
              </div>
              <div class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500">${category.name}</div>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <button class="studio-action-btn" onclick="loadCase('${item.id}')">打开预览</button>
              ${state.activeCaseTab === 'my' ? `<button class="studio-action-btn" onclick="removeCase('${item.id}')">删除</button>` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('') : `<div class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm leading-7 text-slate-500">${state.activeCaseTab === 'my' ? '还没有收藏案例，生成完成后可以把满意的实验加入案例库。' : '当前没有学校共享案例，这部分后续可接入真实的审核与共享流程。'}</div>`;
}

function renderHistory() {
  byId('history-list').innerHTML = state.history.length ? state.history.map((item) => {
    const category = getCategory(item.category);
    return `
      <article class="card-panel p-4">
        <div class="flex items-start gap-4">
          <div class="feature-icon" style="background:${category.color}20;color:${category.color}">${category.icon}</div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">${item.title}</h3>
                <p class="text-xs text-slate-400">${new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <div class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500">${category.name}</div>
            </div>
            <p class="mt-3 text-sm leading-7 text-slate-600">${item.description}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <button class="studio-action-btn" onclick="loadHistory('${item.id}')">打开</button>
              <button class="studio-action-btn" onclick="reuseHistoryPrompt('${item.id}')">继续迭代</button>
              <button class="studio-action-btn" onclick="deleteHistory('${item.id}')">删除</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('') : `<div class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm leading-7 text-slate-500">暂时没有历史记录，先生成一个实验吧。</div>`;
}

function renderRecentHistory() {
  const recent = state.history.slice(0, 3);
  byId('recent-history').innerHTML = recent.length ? recent.map((item) => {
    const category = getCategory(item.category);
    return `
      <button class="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-sky-200 hover:bg-white" onclick="loadHistory('${item.id}')">
        <div class="flex items-center gap-3">
          <div class="feature-icon" style="background:${category.color}20;color:${category.color}">${category.icon}</div>
          <div class="min-w-0">
            <div class="truncate text-sm font-semibold text-slate-900">${item.title}</div>
            <div class="text-xs text-slate-400">${new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      </button>
    `;
  }).join('') : `<div class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-500">这里会出现最近生成的实验，方便你快速回到上一个版本。</div>`;
}

function renderUserManagement() {
  byId('user-management-content').innerHTML = `
    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div class="text-sm leading-7 text-slate-500">当前仍是本地演示版用户体系，便于你走通产品体验。</div>
      <button onclick="showAddUserForm()" class="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600">新增用户</button>
    </div>
    <div id="add-user-form" class="hidden rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div class="grid gap-3 md:grid-cols-2">
        <input id="new-username" class="field-input" placeholder="用户名">
        <input id="new-password" class="field-input" placeholder="密码">
        <input id="new-name" class="field-input" placeholder="姓名">
        <input id="new-college" class="field-input" placeholder="学院">
        <select id="new-role" class="field-select">
          <option value="teacher">教师</option>
          <option value="admin">管理员</option>
        </select>
      </div>
      <div class="mt-4 flex gap-2">
        <button onclick="addUser()" class="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600">确认添加</button>
        <button onclick="byId('add-user-form').classList.add('hidden')" class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 transition hover:border-sky-200 hover:text-sky-600">取消</button>
      </div>
    </div>
    <div class="mt-5 overflow-hidden rounded-3xl border border-slate-200">
      <table class="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 text-left font-medium text-slate-500">用户名</th>
            <th class="px-4 py-3 text-left font-medium text-slate-500">姓名</th>
            <th class="px-4 py-3 text-left font-medium text-slate-500">角色</th>
            <th class="px-4 py-3 text-left font-medium text-slate-500">学院</th>
            <th class="px-4 py-3 text-right font-medium text-slate-500">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${state.userList.map((user) => `
            <tr>
              <td class="px-4 py-3 text-slate-700">${user.username}</td>
              <td class="px-4 py-3 text-slate-700">${user.name}</td>
              <td class="px-4 py-3 text-slate-700">${user.role === 'admin' ? '管理员' : '教师'}</td>
              <td class="px-4 py-3 text-slate-500">${user.college}</td>
              <td class="px-4 py-3 text-right">
                ${user.username !== 'admin' ? `<button class="text-rose-500 transition hover:text-rose-600" onclick="removeUser('${user.id}')">删除</button>` : '<span class="text-slate-300">-</span>'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderSpecSummary() {
  if (!state.currentSpec) {
    byId('spec-summary').innerHTML = `<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">还没有实验规格。先优化或生成一个实验。</div>`;
    return;
  }

  byId('spec-summary').innerHTML = `
    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div class="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">标题</div>
      <div class="mt-2 text-lg font-semibold text-slate-900">${escapeHtml(state.currentSpec.title || '未命名实验')}</div>
      <div class="mt-2 text-sm leading-7 text-slate-600">${escapeHtml(state.currentSpec.summary || '')}</div>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">布局与风格</div>
      <div class="mt-2 text-sm leading-7 text-slate-600">${escapeHtml(state.currentSpec.layout || '')}</div>
      <div class="mt-3 rounded-2xl bg-slate-50 p-3 text-sm leading-7 text-slate-600">${escapeHtml(state.currentSpec.visualStyle || '')}</div>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">控件与图表</div>
      <div class="mt-3 flex flex-wrap gap-2">
        ${(state.currentSpec.controls || []).slice(0, 5).map((control) => `<span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">${escapeHtml(control.label || control.id || '控件')}</span>`).join('')}
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        ${(state.currentSpec.charts || []).map((chart) => `<span class="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700">${escapeHtml(chart)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderCritiqueSummary() {
  if (!state.currentCritique) {
    byId('critique-summary').innerHTML = '生成完成后，这里会显示交互完整性、视觉成品感和修复建议。';
    return;
  }

  const issues = Array.isArray(state.currentCritique.issues) ? state.currentCritique.issues : [];
  byId('critique-summary').innerHTML = `
    <div class="rounded-2xl border border-${state.currentCritique.pass ? 'emerald' : 'amber'}-200 bg-${state.currentCritique.pass ? 'emerald' : 'amber'}-50 px-4 py-3 text-sm font-medium text-${state.currentCritique.pass ? 'emerald' : 'amber'}-700">
      ${escapeHtml(state.currentCritique.summary || (state.currentCritique.pass ? '校验通过' : '仍需优化'))}
    </div>
    ${issues.length ? issues.map((issue) => `
      <div class="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div class="text-sm font-semibold text-slate-900">${escapeHtml(issue.title || '待修复问题')}</div>
        <div class="mt-2 text-sm leading-7 text-slate-600">${escapeHtml(issue.detail || '')}</div>
      </div>
    `).join('') : `<div class="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600">这次结果通过了自动检查，没有发现明显的成品问题。</div>`}
  `;
}

function setDraftToForm() {
  byId('prompt-input').value = state.generationDraft.prompt || '';
  byId('notes-input').value = state.generationDraft.notes || '';
  byId('goal-select').value = state.generationDraft.goal || 'exploration';
  byId('audience-select').value = state.generationDraft.audience || 'college';
  byId('complexity-select').value = state.generationDraft.complexity || 'standard';
  byId('chart-select').value = state.generationDraft.chartLevel || 'basic';
  byId('style-select').value = state.generationDraft.visualStyle || 'research-blue';
}

function syncDraftFromForm() {
  state.generationDraft = {
    prompt: byId('prompt-input').value.trim(),
    notes: byId('notes-input').value.trim(),
    goal: byId('goal-select').value,
    audience: byId('audience-select').value,
    complexity: byId('complexity-select').value,
    chartLevel: byId('chart-select').value,
    visualStyle: byId('style-select').value,
  };
  saveState();
}

async function fetchModelCatalog() {
  try {
    const response = await fetch('/api/models');
    if (!response.ok) {
      throw new Error('模型目录加载失败');
    }
    const data = await response.json();
    state.models = data.presets?.length ? data.presets : [...FALLBACK_PRESETS];

    if (!state.models.find((item) => item.id === state.selectedPreset && item.available)) {
      state.selectedPreset = data.defaultPreset || state.models.find((item) => item.available)?.id || 'balanced';
    }
  } catch (_err) {
    state.models = [...FALLBACK_PRESETS];
  }

  renderPresetCards();
  renderProviderBanner();
}

function renderProviderBanner() {
  const preset = getPreset(state.selectedPreset);
  const availableCount = state.models.filter((item) => item.available).length;
  if (!availableCount) {
    byId('provider-banner').textContent = '未配置模型密钥';
    return;
  }

  byId('provider-banner').textContent = `${preset.label} · ${preset.provider} / ${preset.model}`;
}

function selectPreset(presetId) {
  const preset = getPreset(presetId);
  if (!preset || !preset.available) {
    showToast('这个生成模式还没有配置对应的模型密钥。');
    return;
  }
  state.selectedPreset = presetId;
  renderPresetCards();
  renderProviderBanner();
  saveState();
}

function selectCategory(categoryId) {
  state.selectedCategory = categoryId;
  renderCategoryTags();
  renderQuickPrompts();
  saveState();
}

function filterExamples(categoryId) {
  state.exampleFilter = categoryId;
  renderExamples();
}

function useQuickPrompt(prompt) {
  byId('prompt-input').value = prompt;
  syncDraftFromForm();
}

function useExample(exampleId) {
  const item = EXAMPLES.find((entry) => entry.id === exampleId);
  if (!item) return;
  state.selectedCategory = item.category;
  byId('prompt-input').value = item.prompt;
  byId('notes-input').value = `参考示例：${item.title}`;
  renderCategoryTags();
  renderQuickPrompts();
  syncDraftFromForm();
  toggleDialog('examples');
}

function toggleDialog(name) {
  const target = byId(`${name}-dialog`);
  if (!target) return;
  target.classList.toggle('active');

  if (target.classList.contains('active')) {
    if (name === 'examples') renderExamples();
    if (name === 'caseLibrary') renderCaseLibrary();
    if (name === 'history') renderHistory();
    if (name === 'userManagement') renderUserManagement();
  }
}

function showLoginDialog() {
  toggleDialog('login');
}

function handleLogin() {
  const username = byId('login-username').value.trim();
  const password = byId('login-password').value;
  const errorNode = byId('login-error');

  if (!username || !password) {
    errorNode.textContent = '请输入用户名和密码。';
    errorNode.classList.remove('hidden');
    return;
  }

  const user = state.userList.find((item) => item.username === username && item.password === password);
  if (!user) {
    errorNode.textContent = '用户名或密码错误。';
    errorNode.classList.remove('hidden');
    return;
  }

  state.user = user;
  errorNode.classList.add('hidden');
  byId('login-username').value = '';
  byId('login-password').value = '';
  toggleDialog('login');
  enterApp();
}

function enterApp() {
  byId('portal-page').classList.add('hidden');
  byId('app-page').classList.remove('hidden');
  byId('user-avatar').textContent = state.user.name.slice(0, 1);
  byId('user-name-display').textContent = state.user.name;
  byId('user-role-display').textContent = state.user.role === 'admin' ? '系统管理员' : `${state.user.college} · 教师`;
  if (state.user.role === 'admin') {
    byId('admin-btn').classList.remove('hidden');
  } else {
    byId('admin-btn').classList.add('hidden');
  }
  renderProviderBanner();
  renderRecentHistory();
  renderSpecSummary();
  renderCritiqueSummary();
  resetPipeline();
  setDraftToForm();
  showEmptyState();
}

function handleLogout() {
  state.user = null;
  state.currentExperiment = null;
  byId('portal-page').classList.remove('hidden');
  byId('app-page').classList.add('hidden');
}

function showEmptyState() {
  byId('empty-state').classList.remove('hidden');
  byId('generating-state').classList.add('hidden');
  byId('preview-iframe').classList.add('hidden');
  byId('code-view').classList.add('hidden');
}

function showGeneratingState() {
  byId('empty-state').classList.add('hidden');
  byId('generating-state').classList.remove('hidden');
  byId('preview-iframe').classList.add('hidden');
  byId('code-view').classList.add('hidden');
}

function showPreview(code) {
  byId('empty-state').classList.add('hidden');
  byId('generating-state').classList.add('hidden');

  if (state.previewMode === 'preview') {
    const iframe = byId('preview-iframe');
    iframe.classList.remove('hidden');
    byId('code-view').classList.add('hidden');
    iframe.srcdoc = code;
  } else {
    byId('preview-iframe').classList.add('hidden');
    byId('code-view').classList.remove('hidden');
    byId('code-content').textContent = code;
  }
}

function setPreviewMode(mode) {
  state.previewMode = mode;
  byId('btn-preview').classList.toggle('active', mode === 'preview');
  byId('btn-code').classList.toggle('active', mode === 'code');
  if (state.currentExperiment) {
    showPreview(state.currentExperiment.code);
  }
}

function handleDownload() {
  if (!state.currentExperiment) {
    showToast('请先生成实验。');
    return;
  }

  const blob = new Blob([state.currentExperiment.code], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${state.currentExperiment.title}.html`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function handleFullscreen() {
  const iframe = byId('preview-iframe');
  if (!state.currentExperiment || state.previewMode !== 'preview') {
    showToast('请先切换到预览模式。');
    return;
  }
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  }
}

function handleSaveToCase() {
  if (!state.currentExperiment) {
    showToast('请先生成实验。');
    return;
  }

  if (state.userCases.find((item) => item.id === state.currentExperiment.id)) {
    showToast('这个实验已经在你的案例库里了。');
    return;
  }

  state.userCases.unshift({ ...state.currentExperiment });
  saveState();
  renderCaseLibrary();
  showToast('已加入我的案例库。');
}

function handleNewExperiment() {
  state.currentExperiment = null;
  state.optimizedDraft = null;
  state.currentSpec = null;
  state.currentCritique = null;
  resetPipeline();
  byId('prompt-input').value = '';
  byId('notes-input').value = '';
  byId('optimized-prompt').value = '';
  byId('optimized-prompt-container').classList.add('hidden');
  syncDraftFromForm();
  renderSpecSummary();
  renderCritiqueSummary();
  showEmptyState();
}

function loadCase(caseId) {
  const item = [...state.userCases, ...state.schoolCases].find((entry) => entry.id === caseId);
  if (!item) return;
  state.currentExperiment = item;
  state.currentSpec = item.spec || null;
  state.currentCritique = item.critique || null;
  toggleDialog('caseLibrary');
  renderSpecSummary();
  renderCritiqueSummary();
  showPreview(item.code);
}

function removeCase(caseId) {
  state.userCases = state.userCases.filter((entry) => entry.id !== caseId);
  saveState();
  renderCaseLibrary();
  renderRecentHistory();
}

function loadHistory(historyId) {
  const item = state.history.find((entry) => entry.id === historyId);
  if (!item) return;
  state.currentExperiment = item;
  state.currentSpec = item.spec || null;
  state.currentCritique = item.critique || null;
  renderSpecSummary();
  renderCritiqueSummary();
  showPreview(item.code);
}

function reuseHistoryPrompt(historyId) {
  const item = state.history.find((entry) => entry.id === historyId);
  if (!item) return;
  state.selectedCategory = item.category;
  renderCategoryTags();
  renderQuickPrompts();
  byId('prompt-input').value = item.description;
  byId('notes-input').value = `在上一个版本“${item.title}”基础上继续优化，提升交互和视觉层次。`;
  syncDraftFromForm();
  toggleDialog('history');
}

function deleteHistory(historyId) {
  state.history = state.history.filter((entry) => entry.id !== historyId);
  saveState();
  renderHistory();
  renderRecentHistory();
}

function clearHistory() {
  if (!window.confirm('确定清空所有历史记录吗？')) return;
  state.history = [];
  saveState();
  renderHistory();
  renderRecentHistory();
}

function switchCaseTab(tab) {
  state.activeCaseTab = tab;
  byId('case-tab-my').classList.toggle('active', tab === 'my');
  byId('case-tab-school').classList.toggle('active', tab === 'school');
  renderCaseLibrary();
}

function showAddUserForm() {
  byId('add-user-form').classList.remove('hidden');
}

function addUser() {
  const username = byId('new-username').value.trim();
  const password = byId('new-password').value.trim();
  const name = byId('new-name').value.trim();
  const college = byId('new-college').value.trim();
  const role = byId('new-role').value;

  if (!username || !password || !name) {
    showToast('请填写完整信息。');
    return;
  }
  if (state.userList.find((item) => item.username === username)) {
    showToast('用户名已存在。');
    return;
  }

  state.userList.push({ id: Date.now().toString(), username, password, name, college, role });
  saveState();
  renderUserManagement();
}

function removeUser(userId) {
  if (!window.confirm('确定删除这个用户吗？')) return;
  state.userList = state.userList.filter((item) => item.id !== userId);
  saveState();
  renderUserManagement();
}

function collectBrief() {
  syncDraftFromForm();
  const category = getCategory(state.selectedCategory);
  const preset = getPreset(state.selectedPreset);
  const optimizedText = byId('optimized-prompt-container').classList.contains('hidden')
    ? ''
    : byId('optimized-prompt').value.trim();

  return {
    category,
    preset,
    prompt: optimizedText || state.generationDraft.prompt,
    rawPrompt: state.generationDraft.prompt,
    notes: state.generationDraft.notes,
    goal: state.generationDraft.goal,
    audience: state.generationDraft.audience,
    complexity: state.generationDraft.complexity,
    chartLevel: state.generationDraft.chartLevel,
    visualStyle: state.generationDraft.visualStyle,
  };
}

function ensureAvailablePreset() {
  const preset = getPreset(state.selectedPreset);
  if (!preset || !preset.available) {
    showToast('当前生成模式没有可用密钥，请先配置模型，或切换到已启用模式。');
    return false;
  }
  return true;
}

function getPlanningPresetId() {
  if (state.models.find((item) => item.id === 'balanced' && item.available)) {
    return 'balanced';
  }
  if (state.models.find((item) => item.id === state.selectedPreset && item.available)) {
    return state.selectedPreset;
  }
  return state.models.find((item) => item.available)?.id || 'balanced';
}

async function requestChat({ preset, messages, stream = false, temperature = 0.4, max_tokens = 8192 }) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ preset, messages, stream, temperature, max_tokens }),
  });

  if (!response.ok) {
    let message = '请求失败';
    try {
      const data = await response.json();
      message = data.error || message;
    } catch (_err) {
      message = await response.text();
    }
    throw new Error(message);
  }

  return response;
}

async function requestChatText(options) {
  const response = await requestChat(options);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

function extractJson(content) {
  const fenced = content.match(/```json\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : content;

  try {
    return JSON.parse(candidate);
  } catch (_err) {
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(candidate.slice(start, end + 1));
    }
    throw new Error('模型返回的 JSON 无法解析。');
  }
}

async function optimizeBrief(brief) {
  const content = await requestChatText({
    preset: getPlanningPresetId(),
    stream: false,
    temperature: 0.35,
    max_tokens: 2200,
    messages: [
      { role: 'system', content: PROMPTS.optimizeSystem },
      {
        role: 'user',
        content: JSON.stringify({
          subject: brief.category.name,
          goal: brief.goal,
          audience: brief.audience,
          complexity: brief.complexity,
          chartLevel: brief.chartLevel,
          visualStyle: brief.visualStyle,
          prompt: brief.rawPrompt,
          notes: brief.notes,
        }, null, 2),
      },
    ],
  });

  return extractJson(content);
}

async function buildSpec(brief) {
  const content = await requestChatText({
    preset: getPlanningPresetId(),
    stream: false,
    temperature: 0.25,
    max_tokens: 3200,
    messages: [
      { role: 'system', content: PROMPTS.specSystem },
      {
        role: 'user',
        content: JSON.stringify({
          subject: brief.category.name,
          categoryDescription: brief.category.desc,
          goal: brief.goal,
          audience: brief.audience,
          complexity: brief.complexity,
          chartLevel: brief.chartLevel,
          visualStyle: brief.visualStyle,
          prompt: brief.prompt,
          notes: brief.notes,
        }, null, 2),
      },
    ],
  });

  return extractJson(content);
}

async function streamExperimentFromSpec(spec, presetId, onChunk) {
  const response = await requestChat({
    preset: presetId,
    stream: true,
    temperature: 0.55,
    max_tokens: 10000,
    messages: [
      { role: 'system', content: PROMPTS.generateSystem },
      {
        role: 'user',
        content: `Use the following experiment spec as the sole source of truth.\n\n${JSON.stringify(spec, null, 2)}\n\nGenerate the full HTML now.`,
      },
    ],
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim();
      if (data === '[DONE]') {
        return extractCode(full);
      }
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content || '';
        if (delta) {
          full += delta;
          onChunk(full);
        }
      } catch (_err) {
        // ignore malformed chunks
      }
    }
  }

  return extractCode(full);
}

async function critiqueExperiment(spec, code) {
  const content = await requestChatText({
    preset: getPlanningPresetId(),
    stream: false,
    temperature: 0.2,
    max_tokens: 2200,
    messages: [
      { role: 'system', content: PROMPTS.critiqueSystem },
      {
        role: 'user',
        content: `实验规格：\n${JSON.stringify(spec, null, 2)}\n\n生成代码（截断检查可见部分即可）：\n${code.slice(0, 12000)}`,
      },
    ],
  });

  return extractJson(content);
}

async function repairExperiment(spec, code, critique, presetId, onChunk) {
  const response = await requestChat({
    preset: presetId,
    stream: true,
    temperature: 0.35,
    max_tokens: 10000,
    messages: [
      { role: 'system', content: PROMPTS.repairSystem },
      {
        role: 'user',
        content: `Experiment spec:\n${JSON.stringify(spec, null, 2)}\n\nCurrent HTML:\n${code}\n\nReview findings:\n${JSON.stringify(critique, null, 2)}\n\nReturn the fully revised HTML.`,
      },
    ],
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim();
      if (data === '[DONE]') {
        return extractCode(full);
      }
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content || '';
        if (delta) {
          full += delta;
          onChunk(full);
        }
      } catch (_err) {
        // ignore malformed chunks
      }
    }
  }

  return extractCode(full);
}

function extractCode(content) {
  const fencedHtml = content.match(/```html\s*([\s\S]*?)```/i);
  if (fencedHtml) return fencedHtml[1].trim();

  const fenced = content.match(/```\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();

  return content.trim();
}

function extractTitle(prompt, spec) {
  if (spec?.title) return spec.title;

  const match = prompt.match(/(?:创建|设计|生成|制作|搭建)(.{2,18}?)(?:实验|演示|系统|仿真)/);
  if (match) return match[1].trim();
  return prompt.slice(0, 18) + (prompt.length > 18 ? '…' : '');
}

function setGeneratingMessage(message) {
  byId('generating-status').textContent = message;
  byId('pipeline-status-text').textContent = message;
}

async function handleOptimizePrompt() {
  syncDraftFromForm();
  const brief = collectBrief();
  if (!brief.rawPrompt) {
    showToast('请先输入实验描述。');
    return;
  }
  if (!ensureAvailablePreset()) return;

  const button = byId('optimize-btn');
  const previous = button.textContent;
  button.disabled = true;
  button.textContent = '优化中…';

  try {
    const result = await optimizeBrief(brief);
    state.optimizedDraft = result;
    byId('optimized-prompt-container').classList.remove('hidden');
    byId('optimized-prompt').value = result.improvedPrompt || brief.rawPrompt;
    byId('optimize-highlights').innerHTML = (result.highlights || []).map((item) => `<span class="rounded-full bg-white px-3 py-1 text-xs text-violet-600">${escapeHtml(item)}</span>`).join('');
  } catch (err) {
    showToast(`优化 brief 失败：${err.message}`);
  } finally {
    button.disabled = false;
    button.textContent = previous;
  }
}

async function handleGenerate() {
  syncDraftFromForm();
  const brief = collectBrief();
  if (!brief.prompt) {
    showToast('请先输入实验描述。');
    return;
  }
  if (state.isGenerating) return;
  if (!ensureAvailablePreset()) return;

  state.isGenerating = true;
  state.currentExperiment = null;
  state.currentSpec = null;
  state.currentCritique = null;
  resetPipeline('准备开始生成实验');
  showGeneratingState();
  setGeneratingMessage('正在读取实验 brief…');
  byId('generate-btn').disabled = true;
  byId('generate-btn').innerHTML = '<span class="text-base">✦</span> 生成中…';

  let generatedCode = '';
  let critique = null;

  try {
    setPipelineStep('brief', 'done', '实验 brief 已准备完成。');
    setPipelineStep('spec', 'active', '正在拆解实验规格、控件和教学说明。');
    setGeneratingMessage('正在生成结构化实验规格…');
    const spec = await buildSpec(brief);
    state.currentSpec = spec;
    renderSpecSummary();
    setPipelineStep('spec', 'done', '实验规格已完成，准备生成成品。');

    setPipelineStep('build', 'active', `正在使用 ${getPreset(state.selectedPreset).label} 模式生成 HTML 成品。`);
    setGeneratingMessage('正在生成交互界面和实验逻辑…');
    generatedCode = await streamExperimentFromSpec(spec, state.selectedPreset, (content) => {
      setGeneratingMessage(`正在生成实验代码，已输出 ${content.length} 个字符…`);
    });

    setPipelineStep('build', 'done', 'HTML 成品已生成，开始质量自检。');
    setPipelineStep('review', 'active', '正在检查交互完整性与视觉成品感。');
    critique = await critiqueExperiment(spec, generatedCode);

    if (!critique.pass && critique.revisionPrompt) {
      setGeneratingMessage('发现可修复问题，正在自动修订成品…');
      generatedCode = await repairExperiment(spec, generatedCode, critique, state.selectedPreset, (content) => {
        setGeneratingMessage(`正在修订实验代码，已输出 ${content.length} 个字符…`);
      });
      critique = await critiqueExperiment(spec, generatedCode);
    }

    state.currentCritique = critique;
    renderCritiqueSummary();
    setPipelineStep('review', 'done', critique.summary || '质量自检完成。');

    const experiment = {
      id: Date.now().toString(),
      title: extractTitle(brief.prompt, spec),
      description: brief.prompt.slice(0, 90),
      code: generatedCode,
      createdAt: new Date().toISOString(),
      category: state.selectedCategory,
      spec,
      critique,
      preset: state.selectedPreset,
    };

    state.currentExperiment = experiment;
    state.history.unshift(experiment);
    if (state.history.length > 50) {
      state.history = state.history.slice(0, 50);
    }
    saveState();
    renderRecentHistory();
    showPreview(generatedCode);
    setGeneratingMessage('实验生成完成。');
  } catch (err) {
    resetPipeline('生成失败，请调整 brief 后重试');
    showEmptyState();
    showToast(`生成失败：${err.message}`);
  } finally {
    state.isGenerating = false;
    byId('generate-btn').disabled = false;
    byId('generate-btn').innerHTML = '<span class="text-base">✦</span> 生成实验';
  }
}

function bindDraftEvents() {
  ['prompt-input', 'notes-input', 'goal-select', 'audience-select', 'complexity-select', 'chart-select', 'style-select'].forEach((id) => {
    byId(id).addEventListener('change', syncDraftFromForm);
    byId(id).addEventListener('input', syncDraftFromForm);
  });
}

function init() {
  loadState();
  renderPortalSubjects();
  renderCategoryTags();
  renderQuickPrompts();
  renderRecentHistory();
  renderSpecSummary();
  renderCritiqueSummary();
  renderHistory();
  renderCaseLibrary();
  renderPipeline();
  bindDraftEvents();
  setDraftToForm();
  fetchModelCatalog();
}

window.selectCategory = selectCategory;
window.useQuickPrompt = useQuickPrompt;
window.filterExamples = filterExamples;
window.useExample = useExample;
window.toggleDialog = toggleDialog;
window.showLoginDialog = showLoginDialog;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleOptimizePrompt = handleOptimizePrompt;
window.handleGenerate = handleGenerate;
window.handleNewExperiment = handleNewExperiment;
window.handleDownload = handleDownload;
window.handleFullscreen = handleFullscreen;
window.handleSaveToCase = handleSaveToCase;
window.setPreviewMode = setPreviewMode;
window.switchCaseTab = switchCaseTab;
window.loadCase = loadCase;
window.removeCase = removeCase;
window.loadHistory = loadHistory;
window.reuseHistoryPrompt = reuseHistoryPrompt;
window.deleteHistory = deleteHistory;
window.clearHistory = clearHistory;
window.showAddUserForm = showAddUserForm;
window.addUser = addUser;
window.removeUser = removeUser;
window.selectPreset = selectPreset;

init();
