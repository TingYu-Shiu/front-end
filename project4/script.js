// 全局變數
let currentLevel = 1;
let totalScore = 0;
let missions = [
  {
    type: 'choice',
    question: '你知道「保麗龍」該如何分類嗎？',
    options: ['可回收', '不可回收'],
    correct: 1,
    knowledgeTitle: '保麗龍是什麼？',
    knowledgeContent: '保麗龍（發泡聚苯乙烯）雖然看起來像塑膠，但多數地區無法回收，需視各地資源回收政策決定。保麗龍體積大但重量輕，回收過程中運輸成本高，且處理困難，因此常被排除在回收項目外。'
  },
  {
    type: 'choice',
    question: '哪一種紙製品不適合放入紙類回收？',
    options: ['報紙', '雜誌', '食品外帶紙盒'],
    correct: 2,
    knowledgeTitle: '紙類回收小知識',
    knowledgeContent: '沾有油漬或食物殘渣的紙類（如披薩盒、食品外帶紙盒）會污染其他可回收紙類，應丟入一般垃圾。乾淨的紙類可回收再製成新的紙製品，節省樹木及能源。'
  },
  {
    type: 'drag',
    question: '拖曳下列塑膠製品至正確的回收類別',
    items: [
      { id: 'pet', name: 'PET寶特瓶（編號1）', bin: 'recycle' },
      { id: 'pp', name: 'PP優格盒（編號5）', bin: 'recycle' },
      { id: 'ps', name: 'PS塑膠餐具（編號6）', bin: 'special' }
    ],
    bins: [
      { id: 'recycle', name: '可回收' },
      { id: 'trash', name: '不可回收' },
      { id: 'special', name: '依地區政策' }
    ],
    knowledgeTitle: '塑膠回收編碼系統',
    knowledgeContent: '塑膠製品底部通常有1-7的編號標示。編號1（PET）和編號2（HDPE）最容易回收，幾乎所有回收計劃都接受。編號3-7因地區而異，回收前請確認當地政策。'
  },
  {
    type: 'choice',
    question: '舊手機應該如何處理？',
    options: ['丟入一般垃圾桶', '送到電子回收點', '存放在家中不管'],
    correct: 1,
    knowledgeTitle: '電子廢棄物的重要性',
    knowledgeContent: '電子產品含有鉛、鎘等有害物質，若隨意丟棄會污染環境及地下水。同時，它們也含有金、銀等貴重金屬可回收再利用。許多電子商店和回收中心都有專門的電子廢棄物回收服務。'
  },
  {
    type: 'choice',
    question: '哪種洗澡方式最節水？',
    options: ['泡澡20分鐘', '淋浴10分鐘', '淋浴5分鐘'],
    correct: 2,
    knowledgeTitle: '家庭節水小撇步',
    knowledgeContent: '淋浴5分鐘約使用60公升水，而泡澡則需要150-200公升。此外，安裝節水龍頭、修復漏水設備、使用節水馬桶，都能大幅減少家庭用水量。水資源有限，珍惜每一滴水！'
  },
  {
    type: 'choice',
    question: '哪一種做法能最有效節省家庭用電？',
    options: ['使用節能家電', '關閉不使用的電器插頭', '改用LED燈泡'],
    correct: 0,
    knowledgeTitle: '家庭節能大作戰',
    knowledgeContent: '家庭用電中，約60-70%來自大型家電如冰箱、洗衣機和冷氣機。選擇節能認證的家電可節省20-30%的電力。同時，關閉待機電源可節省5-10%電力，而使用LED燈泡比傳統燈泡省電約75%。綜合多種節能方法效果最佳！'
  },
  {
    type: 'sort',
    question: '排序下列減塑行動的環保效益（從高到低）',
    items: [
      { id: 1, text: '自帶購物袋' },
      { id: 3, text: '使用不鏽鋼吸管' },
      { id: 2, text: '自備餐具' }
    ],
    correctOrder: [1, 2, 3],
    knowledgeTitle: '告別塑膠的生活革命',
    knowledgeContent: '塑膠袋平均使用12分鐘，但分解需要500-1000年。每年全球使用超過5兆個塑膠袋！相比之下，吸管雖小，但每日使用量驚人，達5億支。自備購物袋和餐具能顯著減少塑膠廢棄物，從源頭減量是解決塑膠污染的關鍵。'
  },
  {
    type: 'choice',
    question: '哪一種飲食方式對環境影響最小？',
    options: ['進口有機食品', '本地傳統農法食品', '本地有機食品'],
    correct: 2,
    knowledgeTitle: '食物里程與碳足跡',
    knowledgeContent: '「食物里程」指食物從產地到餐桌的距離。進口食品需長途運輸，產生大量碳排放。本地有機食品不僅減少運輸碳排放，有機耕作也能減少農藥使用和提高土壤健康。選擇當季、本地食材是支持環保的簡單方式。'
  },
  {
    type: 'choice',
    question: '以下哪項不屬於循環經濟模式？',
    options: ['分享工具平台', '購買二手衣物', '買新品替換舊品'],
    correct: 2,
    knowledgeTitle: '循環經濟新思維',
    knowledgeContent: '循環經濟強調「重複使用、維修、回收」，而非「製造、使用、丟棄」的線性模式。全球時裝產業是第二大污染產業，製造一件T恤需要2700公升水！購買二手物品、租借不常用物品、維修而非替換，都能減少資源浪費，延長產品生命週期。'
  },
  {
    type: 'calculator',
    question: '計算你的日常碳足跡',
    knowledgeTitle: '認識你的碳足跡',
    knowledgeContent: '「碳足跡」是指個人或組織活動產生的溫室氣體總量。全球平均每人每年碳足跡約4.8噸CO2，但永續發展目標需將此數字降至2噸以下。了解自己的碳足跡來源是採取行動的第一步。小改變匯集成大影響！'
  }
];

// 初始化應用程式
function startApp() {
  document.querySelector('.hero').classList.add('hidden');
  document.getElementById('progress-bar').classList.remove('hidden');
  document.getElementById('mission-container').classList.remove('hidden');
  loadMission(currentLevel);
  updateProgressBar();
}

// 載入關卡
function loadMission(level) {
  // 重置所有容器
  document.getElementById('drag-drop-container').classList.add('hidden');
  document.getElementById('calculator-container').classList.add('hidden');
  document.getElementById('sorting-container').classList.add('hidden');
  document.getElementById('options-container').innerHTML = '';
  document.getElementById('missionResult').textContent = '';
  
  const mission = missions[level - 1];
  document.getElementById('mission-question').textContent = mission.question;
  
  // 更新當前關卡顯示
  document.getElementById('current-level').textContent = level;
  
  // 根據任務類型載入不同內容
  switch(mission.type) {
    case 'choice':
      loadChoiceOptions(mission);
      break;
    case 'drag':
      loadDragDropGame(mission);
      break;
    case 'sort':
      loadSortingGame(mission);
      break;
    case 'calculator':
      loadCalculator(mission);
      break;
  }
}

// 載入選擇題選項
function loadChoiceOptions(mission) {
  const optionsContainer = document.getElementById('options-container');
  mission.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkAnswer(index, mission.correct);
    optionsContainer.appendChild(button);
  });
}

// 載入拖放遊戲
function loadDragDropGame(mission) {
  document.getElementById('drag-drop-container').classList.remove('hidden');
  
  // 載入可拖曳物品
  const itemsContainer = document.getElementById('draggable-items');
  itemsContainer.innerHTML = '';
  mission.items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'draggable';
    itemElement.id = item.id;
    itemElement.textContent = item.name;
    itemElement.draggable = true;
    itemElement.dataset.bin = item.bin;
    itemElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
    });
    itemsContainer.appendChild(itemElement);
  });
  
  // 載入回收桶
  const binsContainer = document.getElementById('bins');
  binsContainer.innerHTML = '';
  mission.bins.forEach(bin => {
    const binElement = document.createElement('div');
    binElement.className = 'bin';
    binElement.id = bin.id;
    binElement.textContent = bin.name;
    binElement.addEventListener('dragover', (e) => e.preventDefault());
    binElement.addEventListener('drop', (e) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData('text/plain');
      const item = mission.items.find(i => i.id === itemId);
      if (item && item.bin === bin.id) {
        document.getElementById(itemId).classList.add('correct-drop');
        checkDragComplete(mission);
      } else {
        showFeedback('嘗試其他分類', '這個物品屬於不同的回收類別，再試一次！');
      }
    });
    binsContainer.appendChild(binElement);
  });
}

// 載入排序遊戲
function loadSortingGame(mission) {
  document.getElementById('sorting-container').classList.remove('hidden');
  
  const sortableList = document.getElementById('sortable-list');
  sortableList.innerHTML = '';
  
  // 隨機打亂排序項目
  const shuffledItems = [...mission.items].sort(() => Math.random() - 0.5);
  
  shuffledItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'sortable-item';
    li.textContent = item.text;
    li.dataset.value = item.id;
    li.draggable = true;
    
    // 拖曳事件
    li.addEventListener('dragstart', () => {
      li.classList.add('dragging');
    });
    
    li.addEventListener('dragend', () => {
      li.classList.remove('dragging');
    });
    
    sortableList.appendChild(li);
  });
  
  // 排序列表的拖曳功能
  sortableList.addEventListener('dragover', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(sortableList, e.clientY);
    if (afterElement == null) {
      sortableList.appendChild(dragging);
    } else {
      sortableList.insertBefore(dragging, afterElement);
    }
  });
}

// 輔助函數 - 確定拖曳後的位置
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];
  
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// 確認排序答案
function checkSorting() {
  const sortableList = document.getElementById('sortable-list');
  const currentOrder = Array.from(sortableList.children).map(item => parseInt(item.dataset.value));
  const mission = missions[currentLevel - 1];
  
  // 檢查是否順序正確
  const isCorrect = currentOrder.every((val, idx) => val === mission.correctOrder[idx]);
  
  if (isCorrect) {
    totalScore++;
    document.getElementById('missionResult').textContent = '✅ 答對了！排序完全正確！';
    setTimeout(showKnowledge, 1500);
  } else {
    document.getElementById('missionResult').textContent = '❌ 排序不正確，再試一次！';
  }
}

// 載入碳足跡計算器
function loadCalculator(mission) {
  document.getElementById('calculator-container').classList.remove('hidden');
}

// 計算碳足跡結果
function calculateFootprint() {
  const transportation = parseInt(document.getElementById('transportation').value);
  const diet = parseInt(document.getElementById('diet').value);
  const shopping = parseInt(document.getElementById('shopping').value);
  
  const total = transportation + diet + shopping;
  let result;
  
  if (total <= 3) {
    result = '低碳生活者 🌱 你的生活方式非常環保！年碳排放約2噸CO2，達到永續發展目標！';
  } else if (total <= 6) {
    result = '中等碳足跡 🌿 還有改善空間，年碳排放約4噸CO2，接近全球平均值。';
  } else {
    result = '高碳足跡 🍃 可考慮調整生活習慣，年碳排放超過6噸CO2，高於全球平均值。';
  }
  
  document.getElementById('missionResult').textContent = result;
  totalScore++; // 完成計算就給分
  setTimeout(showKnowledge, 2000);
}

// 檢查拖曳遊戲是否完成
function checkDragComplete(mission) {
  const allItems = mission.items;
  const correctItems = document.querySelectorAll('.correct-drop').length;
  
  if (correctItems === allItems.length) {
    totalScore++;
    document.getElementById('missionResult').textContent = '✅ 太棒了！所有物品都正確分類！';
    setTimeout(showKnowledge, 1500);
  }
}

// 檢查選擇題答案
function checkAnswer(selected, correct) {
  const result = document.getElementById('missionResult');
  if (selected === correct) {
    result.textContent = '✅ 答對了！';
    totalScore++;
  } else {
    result.textContent = '❌ 答錯了，正確答案是：' + missions[currentLevel - 1].options[correct];
  }
  setTimeout(showKnowledge, 1500);
}

// 顯示知識卡
function showKnowledge() {
  document.getElementById('mission-container').classList.add('hidden');
  document.getElementById('knowledge').classList.remove('hidden');
  
  const mission = missions[currentLevel - 1];
  document.getElementById('knowledge-title').textContent = mission.knowledgeTitle;
  document.getElementById('knowledge-content').textContent = mission.knowledgeContent;
}

// 進入下一關
function nextMission() {
  document.getElementById('knowledge').classList.add('hidden');
  
  if (currentLevel < missions.length) {
    currentLevel++;
    document.getElementById('mission-container').classList.remove('hidden');
    loadMission(currentLevel);
    updateProgressBar();
  } else {
    // 遊戲完成
    showCompletion();
  }
}

// 顯示遊戲完成畫面
function showCompletion() {
  document.getElementById('progress-bar').classList.add('hidden');
  document.getElementById('completion').classList.remove('hidden');
  document.getElementById('final-score').textContent = totalScore;
}

// 更新進度條
function updateProgressBar() {
  const percentage = (currentLevel / missions.length) * 100;
  document.getElementById('progress-fill').style.width = percentage + '%';
}

// 重新開始遊戲
function restartGame() {
  currentLevel = 1;
  totalScore = 0;
  document.getElementById('completion').classList.add('hidden');
  document.getElementById('progress-bar').classList.remove('hidden');
  document.getElementById('mission-container').classList.remove('hidden');
  loadMission(currentLevel);
  updateProgressBar();
}

// 分享到社群媒體
function shareSocial() {
  alert('分享功能開發中！🌱 敬請期待！');
}

// 顯示反饋訊息
function showFeedback(title, message) {
  document.getElementById('feedback-title').textContent = title;
  document.getElementById('feedback-message').textContent = message;
  document.getElementById('feedback-modal').classList.remove('hidden');
}

// 關閉反饋訊息
function closeFeedback() {
  document.getElementById('feedback-modal').classList.add('hidden');
}

// --- Button-based Sorting Version ---

function loadSortingGame(mission) {
  document.getElementById('sorting-container').classList.remove('hidden');

  const sortableList = document.getElementById('sortable-list');
  sortableList.innerHTML = '';

  // 打亂順序
  const shuffledItems = [...mission.items].sort(() => Math.random() - 0.5);
  shuffledItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'sortable-item';
    li.dataset.value = item.id;

    const text = document.createElement('span');
    text.textContent = item.text;
    li.appendChild(text);

    // 上移按鈕
    const upBtn = document.createElement('button');
    upBtn.textContent = '↑';
    upBtn.onclick = () => moveItem(li, -1);
    li.appendChild(upBtn);

    // 下移按鈕
    const downBtn = document.createElement('button');
    downBtn.textContent = '↓';
    downBtn.onclick = () => moveItem(li, 1);
    li.appendChild(downBtn);

    sortableList.appendChild(li);
  });
}

function moveItem(item, direction) {
  const list = item.parentNode;
  const index = Array.from(list.children).indexOf(item);
  const newIndex = index + direction;
  if (newIndex >= 0 && newIndex < list.children.length) {
    list.insertBefore(item, direction === -1 ? list.children[newIndex] : list.children[newIndex].nextSibling);
  }
}
