// 1. Footer轉換
// (1)取得導覽列與 Footer 動態區域
const nav = document.getElementById("top-nav");
const footerDynamic = document.getElementById("footer-dynamic");

// (2)預先準備好目錄的 HTML 代碼 (把原本 HTML 裡那段複製過來)
const menuHtml = `
<nav class="footer-nav">
  <a href="#atsumu" class="footer-link">atsumu</a>
  <a href="#akari" class="footer-link">akari</a>
  <a href="#miyakiri" class="footer-link">miyakiri</a>
  <a href="#timeline" class="footer-link">timeline</a>
  <a href="#moments" class="footer-link">moments</a>
</nav>`;

// (3)準備好版權文字
const copyrightHtml = `<span class="copyright-text">© acariexe 2025</span>`;

window.onscroll = function () {
  if (window.pageYOffset > 300) {
    // i. 顯示 Navbar
    nav.style.opacity = "1";
    nav.style.pointerEvents = "auto"; // 讓 Navbar 可以點擊

    // ii. 變換 Footer 為版權資訊
    if (footerDynamic.innerHTML !== copyrightHtml) {
      footerDynamic.style.opacity = "0"; // 先淡出
      setTimeout(() => {
        footerDynamic.innerHTML = copyrightHtml;
        footerDynamic.style.opacity = "1"; // 替換後淡入
      }, 300);
    }
  } else {
    // i. 隱藏 Navbar
    nav.style.opacity = "0";
    nav.style.pointerEvents = "none"; // 防止隱藏時點到

    // ii. 變換 Footer 回到目錄
    if (footerDynamic.innerHTML !== menuHtml) {
      footerDynamic.style.opacity = "0";
      setTimeout(() => {
        footerDynamic.innerHTML = menuHtml;
        footerDynamic.style.opacity = "1";
      }, 300);
    }
  }
};

// 2. 檔案袋圖片切換
// (1)定義圖片清單 (請根據你資料夾內的檔名修改)
const imageList = [
  "img/behavior.png",
  "img/photo.png", // 替換成你的第二張圖
  "img/idCard.png", // 替換成你的第三張圖
];

let currentIndex = 0; // 目前顯示的圖片索引
const targetImg = document.getElementById("switch-img");

// (2)監聽點擊事件
targetImg.addEventListener("click", () => {
  // 計算下一張圖片的索引 (用餘數運算確保循環)
  currentIndex = (currentIndex + 1) % imageList.length;

  // 增加一個淡出的特效 (選配，提升設計感)
  targetImg.style.opacity = "0";

  setTimeout(() => {
    // 切換圖片路徑
    targetImg.src = imageList[currentIndex];
    // 重新淡入
    targetImg.style.opacity = "1";
  }, 200); // 這裡的毫秒數要跟 CSS 的 transition 對應
});

// 3. moments滑動拍立得
function nextCard(cardElement) {
  // (1)執行滑開動畫
  cardElement.classList.add("flipped");

  // (2)找到下一張卡片並獲取它的連結
  const cards = document.querySelectorAll(".card:not(.flipped)");
  const btn = document.getElementById("moment-link-btn");

  if (cards.length > 0) {
    // 更新按鈕連結為目前最上面那張卡片的 data-link
    const nextLink = cards[0].getAttribute("data-link");
    if (nextLink) {
      btn.href = nextLink;
      btn.style.opacity = "1";
    } else {
      // 如果是最後一張(View All)，隱藏下方按鈕
      btn.style.opacity = "0";
    }
  }
}
