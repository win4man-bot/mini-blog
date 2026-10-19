const articles = [
{
title: "به وبلاگ من خوش آمدید",
date: "2026-10-19",
excerpt: "این اولین مقاله وبلاگ من است. اینجا درباره ایده‌ها و تجربه‌هایم می‌نویسم.",
content: "سلام! به وبلاگ من خوش آمدید. اینجا قرار است ایده‌ها، تجربه‌ها و مطالب مفید را با شما به اشتراک بگذارم."
},
{
title: "چرا یادگیری برنامه‌نویسی مهم است؟",
date: "2026-10-18",
excerpt: "برنامه‌نویسی به ما کمک می‌کند ایده‌هایمان را به ابزارهای واقعی تبدیل کنیم.",
content: "با یادگیری برنامه‌نویسی می‌توانیم وب‌سایت، ابزارهای کاربردی و پروژه‌های شخصی بسازیم. بهترین راه یادگیری، تمرین مستمر و ساخت پروژه‌های واقعی است."
},
{
title: "شروع یک پروژه جدید",
date: "2026-10-17",
excerpt: "برای شروع لازم نیست همه‌چیز کامل باشد؛ کافی است قدم اول را برداریم.",
content: "یک هدف کوچک انتخاب کنید، آن را به چند مرحله تقسیم کنید و از ساده‌ترین مرحله شروع کنید. با پیشرفت تدریجی، پروژه شما شکل خواهد گرفت."
}
];

const posts = document.getElementById("posts");
const search = document.getElementById("search");
const empty = document.getElementById("empty");

function renderArticles(query = "") {
const normalizedQuery = query.trim().toLowerCase();

const filtered = articles.filter(article =>
"${article.title} ${article.excerpt} ${article.content}"
.toLowerCase()
.includes(normalizedQuery)
);

posts.replaceChildren();
empty.hidden = filtered.length !== 0;

filtered.forEach(article => {
const card = document.createElement("article");
card.className = "post";

const date = document.createElement("div");
date.className = "date";
date.textContent = article.date;

const title = document.createElement("h3");
title.textContent = article.title;

const excerpt = document.createElement("p");
excerpt.textContent = article.excerpt;

const button = document.createElement("a");
button.href = "#";
button.className = "read";
button.textContent = "ادامه مطلب ←";

button.addEventListener("click", event => {
  event.preventDefault();

  const isOpen = button.dataset.open === "true";

  if (isOpen) {
    excerpt.textContent = article.excerpt;
    button.textContent = "ادامه مطلب ←";
    button.dataset.open = "false";
  } else {
    excerpt.textContent = article.content;
    button.textContent = "بستن مقاله ↑";
    button.dataset.open = "true";
  }
});

card.append(date, title, excerpt, button);
posts.appendChild(card);

});
}

search.addEventListener("input", () => {
renderArticles(search.value);
});

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("blog-theme") === "dark") {
document.body.classList.add("dark");
}

function updateThemeButton() {
themeBtn.textContent = document.body.classList.contains("dark")
? "☀️"
: "🌙";
}

themeBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");

localStorage.setItem(
"blog-theme",
document.body.classList.contains("dark") ? "dark" : "light"
);

updateThemeButton();
});

updateThemeButton();
renderArticles();
