// LocalStorage keeps this no-backend MVP available in a single browser.
const STORAGE = { courses: 'devhub_courses', users: 'devhub_users', session: 'devhub_session', theme: 'devhub_theme', catalogVersion: 'devhub_catalog_version' };

// ============================================================
// DARSLAR: har bir darsda to‘g‘ri javob ro‘yxatda BIRINCHI yoziladi,
// makeLesson uni dars id’siga qarab avtomatik aralashtiradi.
// ============================================================
function hashId(id) { return [...id].reduce((sum, ch) => (sum * 31 + ch.charCodeAt(0)) >>> 0, 7); }

function makeLesson(id, title, summary, code, task, question, options, answer = 0) {
  const correct = options[answer];
  const rest = options.filter((_, i) => i !== answer);
  const position = hashId(id) % options.length;
  const shuffled = [...rest];
  shuffled.splice(position, 0, correct);
  return { id, title, summary, code, task, quiz: { question, options: shuffled, answer: position } };
}

const starterCourses = [
  {
    id: 'html5',
    title: 'HTML5 va sahifa tuzilishi',
    short: 'HTML',
    level: 'Boshlang‘ich',
    description: 'HTML tuzilishi, matnlar, havolalar, rasmlar, ro‘yxatlar, jadvallar, semantik teglar va formalar.',
    lessons: [
      makeLesson('html-structure', 'HTML hujjatining tuzilishi',
        'HTML veb-sahifaning skeletini yaratadi. Har bir sahifa <!DOCTYPE html> bilan boshlanadi. <head> ichida sahifa haqidagi ma’lumot (nomi, kodlash) turadi, <body> ichida esa foydalanuvchi ko‘radigan hamma narsa yoziladi.',
        '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Mening sahifam</title>\n</head>\n<body>\n  <h1>Salom, dunyo!</h1>\n  <p>Mening birinchi HTML sahifam.</p>\n</body>\n</html>',
        'Sahifa nomi, bitta sarlavha va bitta paragrafdan iborat HTML hujjat yarating.',
        'Foydalanuvchiga ko‘rinadigan asosiy kontent qaysi teg ichida yoziladi?',
        ['<body>', '<head>', '<meta>']),
      makeLesson('html-text', 'Sarlavhalar va matn',
        'Sarlavhalar h1 dan h6 gacha yoziladi: h1 eng muhim, h6 eng kichigi. Odatda sahifada bitta h1 bo‘ladi. Oddiy matn p ichida yoziladi; strong muhim so‘zni, em esa urg‘u berilgan so‘zni belgilaydi.',
        '<h1>Bosh sarlavha</h1>\n<h2>Bo‘lim nomi</h2>\n<p>Bu oddiy paragraf.</p>\n<p><strong>Muhim:</strong> topshiriqni bajaring.</p>\n<p><em>Diqqat bilan</em> o‘qing.</p>',
        'Bitta h1, ikkita h2 va strong hamda em ishlatilgan paragraflardan iborat kichik maqola yozing.',
        'HTMLda eng yuqori darajadagi sarlavha qaysi teg bilan yoziladi?',
        ['<h1>', '<h6>', '<header>']),
      makeLesson('html-links', 'Havolalar va navigatsiya',
        'a tegi boshqa sahifa yoki saytga havola yaratadi. Havola manzili href atributiga yoziladi. Bir nechta havolani nav tegi ichida guruhlash navigatsiya menyusini hosil qiladi.',
        '<nav>\n  <a href="index.html">Bosh sahifa</a>\n  <a href="about.html">Biz haqimizda</a>\n  <a href="https://example.com">Tashqi sayt</a>\n</nav>',
        'Bosh sahifa, Xizmatlar va Aloqa bo‘limlariga olib boradigan uchta havolali nav yozing.',
        'Havola manzilini belgilaydigan atribut qaysi?',
        ['href', 'src', 'alt']),
      makeLesson('html-images', 'Rasmlar va atributlar',
        'img tegi sahifaga rasm qo‘yadi. src rasm manzilini beradi. alt esa rasm ko‘rinmaganda yoki ekran o‘quvchi ishlatilganda o‘qiladigan qisqa tavsifdir. img yopuvchi tegsiz yoziladi.',
        '<figure>\n  <img src="images/nature.jpg" alt="Yashil tabiat va tog‘lar" width="400">\n  <figcaption>Tabiat manzarasi</figcaption>\n</figure>',
        'Sahifaga bitta rasm joylang: unga alt atributi va figcaption bilan qisqa izoh qo‘shing.',
        'Rasm yuklanmasa yoki ekran o‘quvchi ishlatilsa, muqobil matnni qaysi atribut beradi?',
        ['alt', 'href', 'title']),
      makeLesson('html-lists', 'Ro‘yxatlar va jadvallar',
        'ul belgili ro‘yxat, ol raqamli ro‘yxat yaratadi; har bir band li ichida yoziladi. Jadval table bilan quriladi: tr — qator, th — sarlavha katagi, td — oddiy katak.',
        '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<table>\n  <tr><th>Fan</th><th>Daraja</th></tr>\n  <tr><td>HTML</td><td>Boshlang‘ich</td></tr>\n</table>',
        'Uchta fandan iborat ro‘yxat va fan hamda darajasi ko‘rsatilgan jadval yarating.',
        'Tartib raqamlari bilan chiqadigan ro‘yxat qaysi teg bilan yaratiladi?',
        ['<ol>', '<ul>', '<li>']),
      makeLesson('html-semantic', 'Semantik teglar va formalar',
        'Semantik teglar sahifa qismining vazifasini nomi bilan bildiradi: header — yuqori qism, main — asosiy mazmun, section — bo‘lim, footer — pastki qism. Form foydalanuvchidan ma’lumot oladi; har bir input uchun label yozing.',
        '<header>\n  <h1>Onlayn kurslar</h1>\n</header>\n<main>\n  <section>\n    <h2>Ro‘yxatdan o‘tish</h2>\n    <form action="#" method="post">\n      <label for="name">Ismingiz:</label>\n      <input id="name" name="name" type="text" required>\n      <button type="submit">Yuborish</button>\n    </form>\n  </section>\n</main>\n<footer>© 2026 Onlayn kurslar</footer>',
        'Header, main, ro‘yxatdan o‘tish formasi va footer bor sahifa yarating.',
        'Sahifaning asosiy mazmunini belgilash uchun qaysi semantik teg ishlatiladi?',
        ['<main>', '<aside>', '<footer>'])
    ]
  },

  {
    id: 'css3',
    title: 'CSS3 va maket',
    short: 'CSS',
    level: 'Boshlang‘ich',
    description: 'Selektorlar, ranglar, shrift, box model, position, Flexbox, Grid va responsive dizayn.',
    lessons: [
      makeLesson('css-selectors', 'Selektorlar va kaskad',
        'CSS qoidasi selektordan va { } ichidagi xususiyatlardan iborat. Selektor qaysi elementga stil berilishini tanlaydi. Class (.card) ko‘p elementga beriladi, id (#title) esa sahifada bitta elementga. Bir elementga bir nechta qoida tegsa, kaskad qaysi biri kuchliroq ekanini hal qiladi.',
        '.card { padding: 16px; }\n#main-title { color: darkgreen; }\nnav a:hover { text-decoration: underline; }',
        'Uchta kartaga bitta class bering va sahifa sarlavhasini id selektori bilan bo‘yang.',
        'Qayta-qayta ishlatiladigan stillar uchun qaysi selektor ma’qul?',
        ['.class', '#id', 'Faqat * selektori']),
      makeLesson('css-colors', 'Ranglar va CSS o‘zgaruvchilari',
        'Rang nom (green), hex (#4c7c42) yoki rgb() bilan beriladi. CSS o‘zgaruvchisi --nom shaklida e’lon qilinadi va var(--nom) bilan ishlatiladi. Shunda rangni bir joyda o‘zgartirib, butun saytning ko‘rinishini yangilash mumkin.',
        ':root { --brand: #4c7c42; }\n.button { background: var(--brand); color: white; }',
        'Asosiy va yordamchi rang uchun ikkita o‘zgaruvchi e’lon qilib, tugma va sarlavhada ishlating.',
        'CSS o‘zgaruvchisini o‘qish uchun qaysi funksiya ishlatiladi?',
        ['var()', 'get()', 'color()']),
      makeLesson('css-typography', 'Shrift, o‘lcham va o‘qilishi',
        'Matn qulay o‘qilishi uchun shrift oilasi, o‘lchami va qatorlar orasidagi masofa (line-height) to‘g‘ri tanlanadi. Uzun matnda line-height 1.5–1.7 atrofida bo‘lsa yaxshi. max-width: 65ch qatorni juda uzun bo‘lib ketishdan saqlaydi.',
        'body { font-family: Georgia, serif; line-height: 1.7; }\nh1 { font-size: 2rem; }\np { max-width: 65ch; }',
        'Sarlavha va paragraf uchun shrift, o‘lcham va qator oralig‘ini tanlang.',
        'Qator oralig‘ini qaysi xususiyat belgilaydi?',
        ['line-height', 'letter-color', 'font-space']),
      makeLesson('css-box', 'Box model va masofalar',
        'Har bir element to‘rt qatlamdan iborat: content (mazmun), padding (ichki bo‘shliq), border (chegara), margin (tashqi bo‘shliq). box-sizing: border-box bo‘lsa, width padding va border’ni ham o‘z ichiga oladi va hisoblash osonlashadi.',
        '* { box-sizing: border-box; }\n.card { width: 280px; padding: 20px; border: 1px solid #ccc; margin: 12px; }',
        'Kartaga padding va border bering, ikki karta orasini margin bilan ajrating.',
        'Element ichidagi, mazmun bilan chegara orasidagi bo‘shliq qaysi xususiyat?',
        ['padding', 'margin', 'outline']),
      makeLesson('css-position', 'Position va joylashuv',
        'position elementning qanday joylashishini belgilaydi. static — odatiy holat. relative — o‘z joyidan siljitish mumkin. absolute — eng yaqin position berilgan ota elementga nisbatan joylashadi. fixed — ekranga nisbatan, skroll qilganda ham joyida turadi.',
        '.parent { position: relative; }\n.badge { position: absolute; top: 8px; right: 8px; }',
        'Kartaning yuqori o‘ng burchagida «Yangi» belgisini chiqaring.',
        'absolute element odatda qaysi elementga nisbatan joylashadi?',
        ['Position berilgan eng yaqin ota elementga', 'Har doim body ga', 'Eng yaqin matnga']),
      makeLesson('css-layout', 'Flexbox bilan maket',
        'display: flex elementlarni bir qatorda (yoki ustunda) joylaydi. justify-content elementlarni asosiy o‘q bo‘ylab taqsimlaydi, align-items ko‘ndalang o‘qda tekislaydi, gap esa ular orasidagi masofani beradi.',
        '.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}',
        'Chapda sayt nomi, o‘ngda tugma turadigan toolbar yasang.',
        'Flex konteynerda elementlarni asosiy o‘q bo‘ylab taqsimlaydigan xususiyat qaysi?',
        ['justify-content', 'font-weight', 'z-index']),
      makeLesson('css-grid', 'Grid: satr va ustunlar',
        'Grid ikki o‘lchamli maket beradi, ya’ni ham satr, ham ustun bilan ishlaydi. grid-template-columns ustunlarni belgilaydi. repeat(3, 1fr) uchta teng ustun yaratadi, gap esa kataklar orasini ochadi.',
        '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}',
        'Uchta teng ustunli karta maketi tuzing.',
        'CSS Gridni yoqadigan qiymat qaysi?',
        ['display: grid', 'position: grid', 'float: grid']),
      makeLesson('css-responsive', 'Responsive dizayn va media query',
        'Responsive sahifa telefonda ham, kompyuterda ham qulay ko‘rinadi. Avval kichik ekran uchun yozing, keyin @media (min-width: ...) bilan kengroq ekranga qoidalar qo‘shing.',
        '.cards { display: grid; grid-template-columns: 1fr; }\n@media (min-width: 700px) {\n  .cards { grid-template-columns: repeat(3, 1fr); }\n}',
        'Kartalar telefonda bitta ustunda, kengroq ekranda uch ustunda chiqsin.',
        'Ekran kengligiga qarab CSS qoidalarini qo‘llash vositasi qaysi?',
        ['@media', '@screen', '@responsive']),
      makeLesson('css-states', 'Holatlar: hover, focus va transition',
        ':hover kursor ustiga kelganda, :focus-visible klaviatura bilan tanlanganda ishlaydi. Klaviatura foydalanuvchisi qayerda turganini ko‘rishi uchun fokus belgisi doim ko‘rinib turishi kerak. transition holatlar orasidagi o‘tishni silliq qiladi.',
        '.button { transition: transform .15s ease; }\n.button:hover { transform: translateY(-2px); }\n.button:focus-visible { outline: 3px solid limegreen; }',
        'Tugmaga hover effekti va klaviatura fokusi uchun ko‘rinadigan ramka qo‘shing.',
        'Klaviatura fokusini ko‘rsatish uchun qaysi selektor mos?',
        [':focus-visible', ':visited', ':empty']),
      makeLesson('css-project', 'Amaliyot: responsive kurs kartalari',
        'Yakuniy mashqda o‘rganganlaringizni birlashtiring: o‘zgaruvchi ranglar, Grid va media query. repeat(auto-fit, minmax(240px, 1fr)) ustunlar sonini ekranga qarab o‘zi moslaydi.',
        '.course-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}\n.course-card { padding: 20px; border: 1px solid #ccd5ca; border-radius: 8px; }',
        'Kamida uchta kurs kartasi bor, telefon va kompyuterda yaxshi ko‘rinadigan sahifa yarating. Har kartada sarlavha, tavsif va tugma bo‘lsin.',
        'auto-fit bilan minmax birgalikda nimaga yordam beradi?',
        ['Ustunlar ekranga moslashishiga', 'Serverni ishga tushirishga', 'HTMLni tekshirishga'])
    ]
  },

  {
    id: 'javascript',
    title: 'JavaScript',
    short: 'JS',
    level: 'Asosiy',
    description: 'Til asoslari, ma’lumotlar, DOM, hodisalar, LocalStorage va API bilan ishlash.',
    lessons: [
      makeLesson('js-variables', 'O‘zgaruvchilar: const va let',
        'O‘zgaruvchi qiymatga nom beradi. const qiymati keyin o‘zgarmaydigan o‘zgaruvchi uchun, let esa qiymati o‘zgaradigan holatlar uchun. Avval const yozing, o‘zgartirish kerak bo‘lsagina let ishlating. var eski kodlarda uchraydi, yangi kodda kerak emas.',
        'const course = "JavaScript";\nlet lessonCount = 1;\nlessonCount = lessonCount + 1;\nconsole.log(course, lessonCount);',
        'Kurs nomini const, tugatilgan darslar sonini let bilan saqlang va soni bittaga oshiring.',
        'Qiymatini qayta tayinlab bo‘lmaydigan o‘zgaruvchi qanday e’lon qilinadi?',
        ['const', 'let', 'var']),
      makeLesson('js-types', 'Ma’lumot turlari',
        'Asosiy turlar: string (matn), number (son), boolean (true yoki false), null (ataylab bo‘sh qiymat). Bir nechta qiymatni array (ro‘yxat) va object (nomli xususiyatlar to‘plami) saqlaydi. typeof qiymat turini ko‘rsatadi.',
        'const student = { name: "Ali", active: true };\nconst scores = [90, 85, 100];\nconsole.log(typeof student.name); // "string"',
        'Talaba obyektini ism, email va kurslar ro‘yxati bilan yozing.',
        'true yoki false qiymatini qaysi tur saqlaydi?',
        ['boolean', 'string', 'array']),
      makeLesson('js-conditions', 'Shartlar va taqqoslash',
        'if/else shartga qarab qaysi kod bajarilishini tanlaydi. === qiymat va turni birga solishtiradi; == dan ko‘ra xavfsizroq. && ikkala shart ham to‘g‘ri bo‘lsa, || kamida bittasi to‘g‘ri bo‘lsa ishlaydi.',
        'const score = 82;\nif (score >= 60) {\n  console.log("O‘tdi");\n} else {\n  console.log("Qayta urinib ko‘ring");\n}',
        'Ball 60 va undan yuqori bo‘lsa «O‘tdi», aks holda «Qayta urining» chiqaradigan shart yozing.',
        'Qiymat va turni birga qat’iy solishtiradigan operator qaysi?',
        ['===', '=', '!=']),
      makeLesson('js-loops', 'Sikllar: for va for...of',
        'Sikl bir xil ishni ko‘p marta bajaradi. Klassik for sanagich bilan yuradi. for...of esa massiv elementlarini birin-ketin oladi va ko‘pincha o‘qish uchun qulayroq.',
        'const topics = ["HTML", "CSS", "JS"];\nfor (const topic of topics) {\n  console.log(topic);\n}',
        'Mavzular massivining har bir elementini konsolga chiqaring.',
        'Massiv elementlarini birin-ketin olishga qulay sikl qaysi?',
        ['for...of', 'if...else', 'switch']),
      makeLesson('js-functions', 'Funksiyalar',
        'Funksiya qayta ishlatiladigan kod bo‘lagiga nom beradi. Parametr funksiyaga kiradigan qiymat, return esa natijani chaqirgan joyga qaytaradi. Funksiya yozilgach, uni nomi va qavs bilan chaqirish kerak.',
        'function greet(name) {\n  return `Salom, ${name}!`;\n}\nconsole.log(greet("Dilnoza"));',
        'Ikki sonni qabul qilib, yig‘indisini qaytaradigan funksiya yozing va chaqiring.',
        'Funksiya natijasini chaqirgan joyga qaytaradigan kalit so‘z qaysi?',
        ['return', 'break', 'const']),
      makeLesson('js-arrays', 'Massivlar va map, filter, find',
        'Massiv qiymatlarni tartib bilan saqlaydi. map har bir elementdan yangi qiymat hosil qilib yangi massiv beradi. filter shartga mos elementlarni tanlaydi. find birinchi mos elementni topadi. Bu metodlar asl massivni o‘zgartirmaydi.',
        'const prices = [10, 20, 30];\nconst withTax = prices.map(price => price * 1.12);\nconst cheap = prices.filter(price => price < 25);\nconst first = prices.find(price => price > 15);',
        'Vazifalar massividan faqat tugallanganlarini filter bilan ajratib oling.',
        'Shartga mos elementlarni yangi massivga ajratadigan metod qaysi?',
        ['filter', 'push', 'join']),
      makeLesson('js-objects', 'Obyektlar va destructuring',
        'Obyekt bog‘liq ma’lumotni nomli kalitlarda saqlaydi: course.title. Destructuring kerakli qiymatlarni obyektdan bir qatorda ajratib oladi.',
        'const course = { title: "HTML", lessons: 9 };\nconst { title, lessons } = course;\nconsole.log(title, lessons);',
        'Mahsulot obyektini nomi, narxi va mavjudligi bilan yozing, so‘ng nom va narxni destructuring bilan oling.',
        'course obyektidan title qiymatini ajratib olish uchun qaysi yozuv to‘g‘ri?',
        ['const { title } = course', 'const title = course[]', 'course -> title']),
      makeLesson('js-dom', 'DOM: sahifani boshqarish',
        'DOM — brauzer HTML’dan yaratadigan elementlar daraxti. querySelector CSS selektori bilan elementni topadi. textContent matnni o‘zgartiradi va foydalanuvchi matnini ko‘rsatishda innerHTML’dan xavfsizroq. classList class’larni qo‘shadi yoki olib tashlaydi.',
        'const heading = document.querySelector("h1");\nheading.textContent = "Tayyor!";\nheading.classList.add("done");',
        'Tugma bosilganda paragraf matnini almashtiring va unga class qo‘shing.',
        'CSS selektori bilan birinchi mos elementni topadigan metod qaysi?',
        ['querySelector', 'parseInt', 'JSON.stringify']),
      makeLesson('js-events', 'Hodisalar',
        'Hodisa — foydalanuvchi yoki brauzerning harakati: bosish, yozish, forma yuborish. addEventListener elementga hodisani tinglovchi funksiyani biriktiradi. Funksiya hodisa yuz berganda ishlaydi.',
        'const button = document.querySelector("button");\nbutton.addEventListener("click", event => {\n  event.currentTarget.textContent = "Bosildi";\n});',
        'Tugma bosilganda hisoblagichni bittaga oshiring va ekranda ko‘rsating.',
        'Click hodisasini tinglash uchun qaysi metod ishlatiladi?',
        ['addEventListener', 'querySelectorAll', 'remove']),
      makeLesson('js-storage', 'Formalar va LocalStorage',
        'Forma yuborilganda sahifa qayta yuklanmasligi uchun event.preventDefault() chaqiring. LocalStorage ma’lumotni brauzerda saqlaydi, lekin faqat matn ko‘rinishida. Shuning uchun obyekt yoki massivni JSON.stringify bilan matnga, o‘qiganda JSON.parse bilan qaytarib aylantiring.',
        'const tasks = [{ title: "Mashq", done: false }];\nlocalStorage.setItem("tasks", JSON.stringify(tasks));\nconst saved = JSON.parse(localStorage.getItem("tasks") || "[]");',
        'Forma orqali vazifa qabul qiling va ro‘yxatni LocalStorage’da saqlang.',
        'Massivni LocalStorage’ga yozishdan oldin nima qilish kerak?',
        ['JSON.stringify bilan matnga aylantirish', 'JSON.parse qilish', 'toUpperCase qilish']),
      makeLesson('js-async', 'Fetch va async/await',
        'Tarmoqdan ma’lumot olish vaqt talab qiladi. fetch Promise qaytaradi, await esa natijani kutadi. Xatolikni try/catch bilan ushlang va response.ok orqali server javobini tekshiring.',
        'async function loadUsers() {\n  try {\n    const response = await fetch("/api/users");\n    if (!response.ok) throw new Error("So‘rov bajarilmadi");\n    return await response.json();\n  } catch (error) {\n    console.error(error);\n  }\n}',
        'API’dan ma’lumot oladigan funksiya yozing va xatolik bo‘lsa foydalanuvchiga xabar chiqaring.',
        'async/await ichidagi xatoni ushlash uchun nima ishlatiladi?',
        ['try/catch', 'for/in', 'switch']),
      makeLesson('js-project', 'Amaliyot: vazifalar ro‘yxati',
        'Yakuniy loyiha DOM, hodisalar, massiv va LocalStorage’ni birlashtiradi. Vazifa qo‘shish, bajarilgan deb belgilash, o‘chirish va sahifa yangilanganda ro‘yxat saqlanib qolishini tekshiring.',
        'const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");\nfunction saveTasks() {\n  localStorage.setItem("tasks", JSON.stringify(tasks));\n}',
        'Vazifa qo‘shish, bajarildi deb belgilash, o‘chirish va sahifani yangilaganda saqlanib qolishini yarating.',
        'Obyektlar massivini LocalStorage’da saqlash uchun nima kerak?',
        ['JSON.stringify va JSON.parse', 'Faqat join', 'innerHTML'])
    ]
  },

  {
    id: 'react',
    title: 'React.js',
    short: 'RCT',
    level: 'O‘rta',
    description: 'JSX, komponentlar, props, state, formalar, Hooks va loyiha tuzilishi.',
    lessons: [
      makeLesson('react-jsx', 'React va JSX',
        'React interfeysni komponentlardan quradi. Komponent — JSX qaytaradigan funksiya. JSX HTMLga o‘xshaydi, lekin class o‘rniga className yoziladi, har bir teg yopilishi shart va butun JSX bitta element ichida bo‘lishi kerak.',
        'function App() {\n  return (\n    <main className="page">\n      <h1>Salom, React!</h1>\n    </main>\n  );\n}\nexport default App;',
        'Sarlavha va qisqa tavsif chiqaradigan App komponentini yozing.',
        'JSX’da HTML’dagi class atributi o‘rniga nima yoziladi?',
        ['className', 'class', 'cssClass']),
      makeLesson('react-components', 'Komponentlar',
        'Komponent interfeysning mustaqil, qayta ishlatiladigan bo‘lagi. Nomi katta harf bilan boshlanadi: CourseCard. Uni HTML teg kabi <CourseCard /> deb ishlatasiz va xohlagancha takrorlay olasiz.',
        'function CourseCard() {\n  return <article><h2>HTML asoslari</h2><p>9 ta mavzu</p></article>;\n}\n\n<CourseCard />\n<CourseCard />',
        'CourseCard komponentini yarating va sahifada ikki marta ishlating.',
        'React komponenti nomi qanday boshlanishi kerak?',
        ['Katta harf bilan', 'Raqam bilan', 'Nuqta bilan']),
      makeLesson('react-props', 'Props: komponentga ma’lumot berish',
        'Props — ota komponentdan bola komponentga uzatiladigan ma’lumot. U HTML atributi kabi yoziladi. Komponent propsni faqat o‘qiydi, uni o‘zi o‘zgartirmaydi.',
        'function Greeting({ name }) {\n  return <p>Salom, {name}!</p>;\n}\n\n<Greeting name="Aziza" />',
        'CourseCard’ga title va level propslarini bering va ularni ekranda ko‘rsating.',
        'Props nima uchun ishlatiladi?',
        ['Komponentga tashqaridan ma’lumot berish uchun', 'Brauzerda parol saqlash uchun', 'CSS kompilyatsiya qilish uchun']),
      makeLesson('react-state', 'State va useState',
        'State — komponentning o‘zgaradigan holati. useState ikkita narsa qaytaradi: hozirgi qiymat va uni yangilaydigan funksiya. Funksiya chaqirilganda React komponentni yangi qiymat bilan qayta chizadi.',
        'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
        'Qo‘shish va ayirish tugmalari bor hisoblagich yarating.',
        'useState nimani qaytaradi?',
        ['Qiymat va uni yangilaydigan funksiyani', 'Faqat HTML’ni', 'Server javobini']),
      makeLesson('react-events', 'Hodisalar va shartli ko‘rinish',
        'React’da hodisa nomlari camelCase yoziladi: onClick, onChange. Holatga qarab nimadir ko‘rsatish uchun ternary (shart ? A : B) yoki && ishlatiladi.',
        'function Toggle() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>{open ? "Yopish" : "Ochish"}</button>\n      {open && <p>Izoh matni</p>}\n    </div>\n  );\n}',
        'Tugma bosilganda izohni ko‘rsatadigan va yashiradigan komponent yozing.',
        'React’da click hodisasi qanday yoziladi?',
        ['onClick', 'onclick', 'clickEvent']),
      makeLesson('react-lists', 'Ro‘yxatlar va key',
        'Massivni map bilan JSX elementlariga aylantirasiz. Har bir element o‘ziga xos va o‘zgarmas key olishi kerak (masalan, id). Shunda React qaysi element o‘zgarganini aniqlay oladi.',
        'const topics = ["HTML", "CSS", "JavaScript"];\n\n<ul>\n  {topics.map(topic => <li key={topic}>{topic}</li>)}\n</ul>',
        'Darslar massivini ro‘yxat qilib chiqaring; har darsning id sini key qiling.',
        'Ro‘yxat elementlariga key nima uchun beriladi?',
        ['React elementlarni o‘zgarishda ajrata olishi uchun', 'Elementni yashirish uchun', 'CSS rangini tanlash uchun']),
      makeLesson('react-forms', 'Controlled input va formalar',
        'Controlled input qiymati React state’da turadi. value state’dan olinadi, onChange har o‘zgarishda state’ni yangilaydi. Formani yuborishda event.preventDefault() sahifa qayta yuklanishini to‘xtatadi.',
        'const [email, setEmail] = useState("");\n\n<input\n  value={email}\n  onChange={event => setEmail(event.target.value)}\n/>',
        'Email maydonini state bilan boshqaring va forma yuborilganda qiymatini ekranga chiqaring.',
        'Controlled input qiymati qayerda saqlanadi?',
        ['React state’da', 'Faqat DOM’da', 'CSS faylida']),
      makeLesson('react-effects', 'useEffect: yon ta’sirlar',
        'useEffect komponent chizilgandan keyin ishlaydi. Undan API so‘rovi, sarlavhani o‘zgartirish kabi ishlar uchun foydalaniladi. Ikkinchi argument — bog‘liqliklar ro‘yxati: bo‘sh [] bo‘lsa, effekt faqat birinchi chizilgandan keyin ishlaydi.',
        'useEffect(() => {\n  document.title = `Darslar: ${count}`;\n}, [count]);',
        'Komponent ochilganda API’dan darslarni oling va yuklanish holatini ko‘rsating.',
        'useEffect’dagi bo‘sh [] massiv effektni qachon ishga tushiradi?',
        ['Faqat birinchi chizilgandan keyin', 'Har bir tugma bosilganda', 'Hech qachon']),
      makeLesson('react-architecture', 'Komponentlarni bo‘lish va state’ni ko‘tarish',
        'Ikki komponentga bir xil ma’lumot kerak bo‘lsa, state’ni ularning eng yaqin umumiy ota komponentiga ko‘taring va props orqali bering. Kichik va bitta vazifali komponentlarni sinash hamda qayta ishlatish osonroq.',
        'function App() {\n  const [selected, setSelected] = useState(null);\n  return (\n    <>\n      <CourseList onSelect={setSelected} />\n      <LessonView lesson={selected} />\n    </>\n  );\n}',
        'Kurs ro‘yxati va dars tafsilotini alohida komponentlarga ajrating.',
        'Ikki bola komponentga kerak bo‘lgan state qayerga ko‘tariladi?',
        ['Eng yaqin umumiy ota komponentga', 'Har bir bolaga alohida', 'CSS fayliga']),
      makeLesson('react-project', 'Amaliyot: kurs katalogi',
        'Yakuniy mashqda kartalar, props, state va formani birlashtiring. Qidiruv maydoni state’da turadi, ro‘yxat esa shu qiymat bo‘yicha filter qilinadi.',
        'const filtered = courses.filter(course =>\n  course.title.toLowerCase().includes(query.toLowerCase())\n);',
        'Qidiruvi, kategoriya filtri va tanlangan kurs tafsiloti bor kichik katalog yarating.',
        'Ro‘yxatni qidiruv so‘ziga qarab yangilash uchun nima kerak?',
        ['State va filter', 'Faqat CSS hover', 'Faqat alert'])
    ]
  },

  {
    id: 'roadmap',
    title: 'Frontend yo‘l xaritasi',
    short: 'MAP',
    level: 'Amaliyot',
    description: 'O‘rganish tartibi, Git, qulay foydalanish, API, deploy va portfolio rejasi.',
    lessons: [
      makeLesson('frontend-path', 'Bilimlarni loyihaga aylantirish',
        'Frontend’ni shu tartibda o‘rganing: avval HTML va CSS (tuzilma va ko‘rinish), keyin JavaScript (interaktivlik), so‘ng Git, API, framework va test. Har bosqichdan keyin kichik loyiha qiling, shunda bilim mustahkamlanadi.',
        'G‘oya → HTML/CSS → JavaScript → Git → API → React → Test → Portfolio',
        'Maqsadingizni tanlab, haftalik 5 qadamli o‘quv reja tuzing.',
        'Frontend asoslari qaysi bilimlardan boshlanadi?',
        ['HTML, CSS va JavaScript', 'Faqat ma’lumotlar bazasi', 'Faqat server sozlash']),
      makeLesson('roadmap-html-css', 'HTML va CSS’ni mustahkamlash',
        'Semantik HTML, formalar, box model va responsive maketni yaxshi bilsangiz, keyingi mavzular osonlashadi. Har mavzudan keyin kichik sahifa yasang va uni telefon o‘lchamida ham tekshiring.',
        'Maket → semantik HTML → CSS layout → responsive → qulay foydalanish',
        'Bitta sahifa maketini avval qog‘ozda chizing, so‘ng HTML bo‘limlari va CSS maketini yozing.',
        'Responsive maketni qaysi CSS imkoniyati bilan boshqarasiz?',
        ['Media query', 'SQL query', 'Event loop']),
      makeLesson('roadmap-js', 'JavaScript: mantiq va DOM',
        'Ketma-ketlik: o‘zgaruvchi, shart, funksiya, massiv, obyekt, DOM, hodisalar. Shundan keyin Promise, async/await va API so‘roviga o‘ting. Massiv metodlari (filter, map) ko‘p ishlatiladi.',
        'const result = items\n  .filter(item => item.active)\n  .map(item => item.title);',
        'Vazifalar ro‘yxatini DOM va LocalStorage yordamida interaktiv qiling.',
        'JavaScript’da API javobini kutishning odatiy usuli qaysi?',
        ['async/await', 'float', 'z-index']),
      makeLesson('roadmap-git', 'Git va jamoada ishlash',
        'Git o‘zgarishlar tarixini saqlaydi. Commit — loyihaning ma’lum paytdagi surati; uni kichik va tushunarli izoh bilan yozing. Branch alohida ish uchun, pull request esa jamoa ko‘rib chiqishi uchun ishlatiladi.',
        'git init\ngit add .\ngit commit -m "Add course page"\ngit switch -c feature/search',
        'Yangi repo yarating, kamida uchta commit qiling va branch’da bitta o‘zgarish bajaring.',
        'Git commit nimani saqlaydi?',
        ['Loyiha o‘zgarishlarining suratini', 'Faqat brauzer tarixini', 'Faqat parollarni']),
      makeLesson('roadmap-accessibility', 'Hamma uchun qulay sayt',
        'Qulay sayt klaviatura bilan ishlaydi, fokus ko‘rinadi, rang kontrasti yetarli, forma maydonlari label bilan nomlangan. Bular ko‘rish yoki harakat imkoniyati cheklangan odamlarga ham, oddiy foydalanuvchiga ham foydali.',
        '<label for="name">Ism</label>\n<input id="name" name="name">\n<button type="button">Saqlash</button>',
        'Loyihangizni faqat klaviatura bilan boshqarib ko‘ring va topilgan muammolarni tuzating.',
        'Forma maydonini ekran o‘quvchiga tushunarli qiladigan juftlik qaysi?',
        ['label va input id', 'placeholder va rang', 'div va span']),
      makeLesson('roadmap-api', 'API bilan ishlash va test',
        'Frontend API’dan JSON olib, ekranda ko‘rsatadi. Har doim to‘rt holatni ko‘rsating: yuklanmoqda, xato, bo‘sh va tayyor. Asosiy oqimlarni test bilan tekshiring.',
        'const response = await fetch("/api/courses");\nif (!response.ok) throw new Error("Xatolik");\nconst courses = await response.json();',
        'Tashqi ma’lumot yuklaydigan sahifaga yuklanish va xato holatini qo‘shing.',
        'fetch javobida server xatosini tekshirish uchun nima ishlatiladi?',
        ['response.ok', 'response.color', 'response.css']),
      makeLesson('roadmap-deploy', 'Build va internetga joylash',
        'Deploy — loyihani foydalanuvchilarga yetkazish. Avval build xatosiz tugashini tekshiring, maxfiy kalitlarni repoga qo‘shmang, so‘ng saytni hostingga joylab, README ga ishlaydigan manzilni yozing.',
        'npm run build\n# build papkasidagi fayllarni hostingga joylang',
        'Loyihangizni statik hostingga joylang va README’da ishga tushirish va demo manzilini yozing.',
        'Deploydan oldin nimani tekshirish kerak?',
        ['Build va asosiy sahifa ishlashini', 'Faqat fayl nomini', 'Faqat shriftni']),
      makeLesson('roadmap-portfolio', 'Yakuniy loyiha va portfolio',
        'Portfolio’da 2–3 ta sifatli loyiha bo‘lsin: ishlaydigan demo, qisqa tavsif va kod havolasi. Har bir loyihada qaysi muammoni hal qilganingizni, qanday qaror qilganingizni va nimani o‘rganganingizni yozing.',
        'Loyiha: muammo → foydalanuvchi → yechim → demo → xulosa',
        'Bitta loyihani oxirigacha olib boring: talablar, mobil ko‘rinish, xato holatlari va README bilan.',
        'Portfolio’da nimani ko‘rsatish eng muhim?',
        ['Ishlaydigan loyihalar va qarorlaringizni', 'Faqat texnologiyalar ro‘yxatini', 'Faqat kurs sertifikatlarini'])
    ]
  },

  {
    id: 'backend',
    title: 'Backend asoslari',
    short: 'API',
    level: 'Boshlang‘ich',
    description: 'Node.js, HTTP, Express, REST, validatsiya, SQL va xavfsizlik.',
    lessons: [
      makeLesson('backend-node', 'Backend nima va Node.js',
        'Backend so‘rovni oladi, qoidalarni tekshiradi, ma’lumot bilan ishlaydi va javob qaytaradi. Node.js JavaScript’ni brauzerdan tashqarida, serverda ishlatish imkonini beradi.',
        'console.log("Server ishga tayyor");\nconst now = new Date();\nconsole.log(now.toISOString());',
        'Brauzer JavaScript’i va server JavaScript’i nima bilan farq qilishini ikki ustunga yozing.',
        'Node.js nima beradi?',
        ['JavaScript’ni serverda ishlatish muhitini', 'CSS frameworkini', 'HTML teglarini']),
      makeLesson('backend-http', 'HTTP so‘rov va javoblar',
        'So‘rovda metod (GET, POST...), URL, sarlavhalar (header) va ba’zan tana (body) bo‘ladi. Javobda status kodi va ma’lumot keladi. 2xx — muvaffaqiyat, 4xx — mijoz xatosi, 5xx — server xatosi.',
        'GET /api/courses HTTP/1.1\nAccept: application/json\n\nHTTP/1.1 200 OK\nContent-Type: application/json',
        'Kurslar ro‘yxati uchun so‘rov metodi, URL va muvaffaqiyat statusini yozing.',
        'Muvaffaqiyatli so‘rov uchun eng ko‘p ishlatiladigan status qaysi?',
        ['200', '404', '500']),
      makeLesson('backend-modules', 'npm, package.json va modullar',
        'npm paketlarni o‘rnatadi va boshqaradi. package.json loyihaning nomi, skriptlari va bog‘liqliklarini saqlaydi. import va export kodni alohida fayllarga bo‘lish imkonini beradi.',
        '// math.js\nexport function add(a, b) { return a + b; }\n\n// app.js\nimport { add } from "./math.js";\nconsole.log(add(2, 3));',
        'Matematik yordamchi funksiyalarni alohida modulga ajrating va import qiling.',
        'Loyiha skriptlari va paket ro‘yxati qaysi faylda turadi?',
        ['package.json', 'index.html', 'README.png']),
      makeLesson('backend-api', 'Express server va birinchi endpoint',
        'Express Node.js’da server yozishni osonlashtiradi. Route HTTP metodi va URL’ni funksiyaga bog‘laydi. API odatda javobni JSON ko‘rinishida qaytaradi.',
        'const express = require("express");\nconst app = express();\n\napp.get("/api/salom", (req, res) => {\n  res.json({ xabar: "Salom!" });\n});\n\napp.listen(3000);',
        'GET /api/salom endpointini yozing va JSON javob qaytaring.',
        'Express’da GET marshrutini e’lon qiladigan metod qaysi?',
        ['app.get()', 'app.css()', 'app.table()']),
      makeLesson('backend-rest', 'REST API va CRUD',
        'REST’da resurs URL bilan ifodalanadi, amal esa HTTP metodi bilan. GET o‘qiydi, POST yaratadi, PATCH yoki PUT yangilaydi, DELETE o‘chiradi. Bu to‘rt amal CRUD deyiladi.',
        'GET    /api/courses\nPOST   /api/courses\nPATCH  /api/courses/7\nDELETE /api/courses/7',
        'Vazifalar resursi uchun to‘rtta CRUD endpoint rejasini yozing.',
        'Yangi resurs yaratishda odatda qaysi HTTP metodi ishlatiladi?',
        ['POST', 'GET', 'DELETE']),
      makeLesson('backend-middleware', 'Middleware',
        'Middleware — so‘rov route’ga yetguncha yoki undan keyin ishlaydigan funksiya. express.json() JSON tanani o‘qiydi, log middleware so‘rovlarni yozib boradi. next() so‘rovni keyingi bosqichga uzatadi; uni chaqirmasangiz so‘rov osilib qoladi.',
        'app.use(express.json());\napp.use((req, res, next) => {\n  console.log(req.method, req.path);\n  next();\n});',
        'Har bir so‘rovning metodi va yo‘lini konsolga yozadigan middleware yarating.',
        'Middleware zanjirini keyingi bosqichga uzatadigan funksiya qaysi?',
        ['next()', 'returnCSS()', 'render()']),
      makeLesson('backend-validation', 'Validatsiya va xatolar',
        'Mijozdan kelgan ma’lumotga hech qachon ishonmang. Majburiy maydon, uzunlik va formatni serverda tekshiring. Noto‘g‘ri so‘rovga tushunarli 4xx javob qaytaring.',
        'app.post("/api/courses", (req, res) => {\n  if (!req.body.title?.trim()) {\n    return res.status(400).json({ error: "title majburiy" });\n  }\n  res.status(201).json({ title: req.body.title.trim() });\n});',
        'Kurs nomi bo‘sh bo‘lsa 400, to‘g‘ri bo‘lsa 201 qaytaradigan qoida yozing.',
        'Foydalanuvchi yuborgan ma’lumot bilan serverda nima qilish kerak?',
        ['Avval tekshirish (validatsiya)', 'To‘g‘ridan-to‘g‘ri ishlatish', 'CSS bilan bezash']),
      makeLesson('backend-crud', 'CRUD va vaqtinchalik xotira',
        'Ma’lumotlar bazasisiz prototipda massivdan foydalansa bo‘ladi, bu CRUD oqimini tushunishga yordam beradi. Lekin server qayta ishga tushsa, xotiradagi ma’lumot yo‘qoladi.',
        'const courses = [];\n\napp.post("/api/courses", (req, res) => {\n  const course = { id: Date.now(), title: req.body.title };\n  courses.push(course);\n  res.status(201).json(course);\n});',
        'Kurs yaratish va id bo‘yicha topish oqimini yozing.',
        'Oddiy massivdagi ma’lumot qachon yo‘qoladi?',
        ['Server qayta ishga tushganda', 'Har bir GET so‘rovda', 'CSS yangilanganda']),
      makeLesson('backend-sql', 'Ma’lumotlar bazasi va SQL',
        'Ma’lumotlar bazasi ma’lumotni doimiy saqlaydi. Jadval ustun va qatorlardan iborat. SQL buyruqlari: SELECT o‘qiydi, INSERT qo‘shadi, UPDATE yangilaydi, DELETE o‘chiradi.',
        'SELECT id, title FROM courses WHERE published = true;\nINSERT INTO courses (title) VALUES (\'HTML asoslari\');',
        'Kurs jadvali uchun id, title va created_at ustunlarini rejalashtiring.',
        'Jadvaldan ma’lumot o‘qiydigan SQL buyrug‘i qaysi?',
        ['SELECT', 'INSERT', 'DROP']),
      makeLesson('backend-auth', 'Parol va xavfsizlik',
        'Parolni hech qachon oddiy matn ko‘rinishida saqlamang. Serverda kuchli hash algoritmi (masalan, bcrypt) ishlatiladi. Maxfiy kalitlar environment o‘zgaruvchilarida saqlanadi, ruxsatlar esa har doim serverda tekshiriladi.',
        'const secret = process.env.SESSION_SECRET;\nif (!secret) throw new Error("SESSION_SECRET sozlanmagan");\n// Parollarni xavfsiz hash bilan tekshiring.',
        'Qaysi ma’lumotlar maxfiy ekanini yozing va ularni repoga qo‘shmaslik rejasini tuzing.',
        'Parol bazada qanday saqlanishi kerak?',
        ['Kuchli hash ko‘rinishida', 'Oddiy matn ko‘rinishida', 'URL ichida']),
      makeLesson('backend-errors', 'Environment, log va server xatolari',
        'Environment sozlamalari konfiguratsiyani koddan ajratadi. Loglar muammoni topishga yordam beradi, lekin ularga parol va tokenlarni yozmang. Foydalanuvchiga ichki xato tafsilotini emas, umumiy xabar bering.',
        'const port = process.env.PORT || 3000;\napp.listen(port, () => console.log(`Server ${port} portida`));',
        'Server portini environment’dan o‘qing va logga maxfiy qiymat yozilmasligini tekshiring.',
        'API tokenni qayerga yozish mumkin emas?',
        ['Git repoga', 'Maxfiy environment sozlamasiga', 'Secret manager’ga']),
      makeLesson('backend-project', 'Amaliyot: kurslar REST API',
        'Yakuniy loyiha GET va POST endpointlar, ma’lumot validatsiyasi, to‘g‘ri status kodlari va aniq xato javoblarini birlashtiradi. Keyingi qadamda uni SQL bazaga ulash mumkin.',
        'app.use(express.json());\napp.get("/api/courses", (req, res) => res.json(courses));\napp.post("/api/courses", createCourse);',
        'Kurslar API rejasini tuzing: endpointlar, status kodlari, tekshiruvlar va saqlash usuli.',
        'Yangi resurs muvaffaqiyatli yaratilganini qaysi status bildiradi?',
        ['201', '304', '503'])
    ]
  }
];

function makeCourseTrack(id, title, short, level, description, topics) {
  return {
    id, title, short, level, description,
    lessons: topics.map(([slug, lessonTitle, summary, code, task, question, options, answer = 0]) =>
      makeLesson(`${id}-${slug}`, lessonTitle, summary, code, task, question, options, answer))
  };
}

starterCourses.push(
  makeCourseTrack('typescript', 'TypeScript', 'TS', 'Asosiy', 'JavaScript loyihalariga aniq turlar, interfeyslar va xavfsiz refactor qo‘shing.', [
    ['types', 'TypeScript va oddiy turlar',
      'TypeScript JavaScript ustiga tur tekshiruvini qo‘shadi. O‘zgaruvchining turi (string, number, boolean) oldindan yoziladi, shunda xato kod yozayotgan paytda ko‘rinadi, dastur ishga tushguncha kutish shart emas.',
      'let name: string = "Diyor";\nlet lessons: number = 4;\nlet isReady: boolean = true;',
      'Talaba nomi, kurslar soni va tugallanganlik holatini turlari bilan e’lon qiling.',
      'Matn qiymatini ifodalaydigan TypeScript turi qaysi?',
      ['string', 'number', 'boolean']],
    ['objects', 'Object, type va interface',
      'Interface obyektning shaklini tasvirlaydi: qaysi maydonlar bor va ular qanday turda. Ixtiyoriy maydon ? bilan belgilanadi, readonly maydon esa keyin o‘zgartirilmaydi.',
      'interface Course {\n  id: number;\n  title: string;\n  level?: "beginner" | "advanced";\n}\n\nconst html: Course = { id: 1, title: "HTML" };',
      'Course interfeysini yarating va unga mos ikkita obyekt tuzing.',
      'Ixtiyoriy maydon qaysi belgi bilan yoziladi?',
      ['?', '!', '#']],
    ['functions', 'Funksiya turlari va generics',
      'Funksiyada parametr va qaytish qiymatining turini yozing. Generic (<T>) bir funksiyani turli turlarda ishlatish imkonini beradi, ammo tur haqidagi ma’lumot yo‘qolmaydi.',
      'function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconst title = first<string>(["HTML", "CSS"]);',
      'Massivning birinchi elementini qaytaradigan generic funksiya yozing.',
      'Generic tur odatda qaysi qavs ichida yoziladi?',
      ['<T>', '[T]', '{T}']],
    ['narrowing', 'Union type va type narrowing',
      'Union (A | B) qiymat bir nechta turdan biri bo‘lishini bildiradi. Qiymat ustida ishlashdan oldin typeof yoki if bilan uning aniq turini tekshiring: TypeScript shu tekshiruvdan keyin turni toraytiradi.',
      'type Result =\n  | { ok: true; data: string }\n  | { ok: false; error: string };\n\nfunction show(result: Result) {\n  if (result.ok) return result.data;\n  return result.error;\n}',
      'Muvaffaqiyat va xato holatlari bor API javob turini yozing.',
      'Union type yozishda qaysi belgi ishlatiladi?',
      ['|', '&', '=>']],
    ['project', 'Amaliyot: tiplangan kurs katalogi',
      'Kichik katalogda Course turini, filter funksiyasini va API javob turlarini yozing. strict rejimni yoqing va TypeScript topgan xatolarni birma-bir tuzating.',
      'type Course = { id: number; title: string; lessons: number };\n\nconst visible = (items: Course[], query: string): Course[] =>\n  items.filter(item => item.title.includes(query));',
      'Kurslar ro‘yxatini turlar bilan yozing, qidiruv va bo‘sh natija holatini qo‘shing.',
      'strict rejimning asosiy foydasi nima?',
      ['Tur bilan bog‘liq xatolarni erta topadi', 'CSS’ni avtomatik yozadi', 'Serverni o‘chiradi']]
  ]),

  makeCourseTrack('vue', 'Vue.js', 'VUE', 'O‘rta', 'Vue komponentlari, reaktiv holat, direktivlar, komponentlar aloqasi va kichik loyiha.', [
    ['sfc', 'Vue loyihasi va Single File Component',
      'Vue komponenti bitta .vue faylda yoziladi: template (ko‘rinish), script (mantiq) va style (stil). Bu katta interfeysni kichik, qayta ishlatiladigan bo‘laklarga bo‘lishga yordam beradi.',
      '<template>\n  <h1>{{ title }}</h1>\n</template>\n\n<script setup>\nimport { ref } from "vue";\nconst title = ref("Salom, Vue!");\n</script>',
      'Salom matni va qisqa tavsif chiqaradigan birinchi Vue komponentini yozing.',
      'Vue Single File Component fayli qaysi kengaytmaga ega?',
      ['.vue', '.jsx', '.view']],
    ['reactivity', 'Reaktiv holat: ref va computed',
      'ref reaktiv qiymat yaratadi; script ichida unga .value orqali murojaat qilinadi, template’da esa .value yozish shart emas. computed boshqa qiymatlardan hisoblanadigan natijani beradi va ular o‘zgarsa, o‘zi yangilanadi.',
      'const count = ref(0);\nconst doubled = computed(() => count.value * 2);\nfunction increment() { count.value++; }',
      'Tugma bilan oshadigan son va uning ikki baravarini ekranda ko‘rsating.',
      'script ichida ref qiymati qaysi xususiyatda turadi?',
      ['value', 'current', 'data']],
    ['template', 'Direktivlar va ro‘yxat',
      'v-if shart bo‘yicha elementni ko‘rsatadi, v-for massivni chizadi, v-model inputni o‘zgaruvchi bilan bog‘laydi. v-for da har bir elementga barqaror :key bering.',
      '<li v-for="course in courses" :key="course.id">\n  {{ course.title }}\n</li>\n<p v-if="courses.length === 0">Kurs topilmadi</p>',
      'Kurslarni ro‘yxat qilib chiqaring va massiv bo‘sh bo‘lganda alohida xabar ko‘rsating.',
      'Ro‘yxatni takrorlash direktivasi qaysi?',
      ['v-for', 'v-if', 'v-show']],
    ['components', 'Props va emit',
      'Props ma’lumotni ota komponentdan bolaga beradi. Bola komponent ota komponentga emit bilan hodisa yuboradi. Shunday qilib ma’lumot pastga, hodisalar yuqoriga oqadi.',
      'const props = defineProps({ title: String });\nconst emit = defineEmits(["select"]);\nfunction choose() { emit("select", props.title); }',
      'Kurs kartasi sarlavhani props bilan olsin va bosilganda select hodisasini yuborsin.',
      'Bola komponentdan ota komponentga xabar qanday yuboriladi?',
      ['emit orqali', 'provide orqali', 'watch orqali']],
    ['project', 'Amaliyot: Vue vazifalar ro‘yxati',
      'Forma, reaktiv massiv, computed filter va alohida TaskItem komponentini birlashtirib kichik ro‘yxat ilovasini yarating.',
      'const tasks = ref([]);\nconst remaining = computed(() => tasks.value.filter(task => !task.done).length);\nfunction addTask(title) {\n  tasks.value.push({ id: crypto.randomUUID(), title, done: false });\n}',
      'Vazifa qo‘shish, bajarildi deb belgilash va faol vazifalarni filtrlashni yarating.',
      'Boshqa qiymatlardan hisoblanadigan reaktiv qiymat uchun qaysi API ishlatiladi?',
      ['computed', 'emit', 'onMounted']]
  ]),

  makeCourseTrack('angular', 'Angular', 'NG', 'O‘rta', 'TypeScript, component, template, service, dependency injection va routing asoslari.', [
    ['components', 'Component va template',
      'Angular komponenti TypeScript class, HTML template va stillardan iborat. selector komponentni boshqa template ichida teg sifatida ishlatish imkonini beradi.',
      '@Component({\n  selector: "app-greeting",\n  template: `<h1>Salom, {{ name }}!</h1>`\n})\nexport class GreetingComponent {\n  name = "Aziza";\n}',
      'Greeting komponentini yarating va asosiy sahifada ishlating.',
      'Angular komponentini e’lon qiladigan dekorator qaysi?',
      ['@Component', '@Service', '@Route']],
    ['binding', 'Binding va hodisalar',
      'Interpolation {{ }} qiymatni chiqaradi. Property binding [disabled] HTML xususiyatini boshqaradi. Event binding (click) foydalanuvchi harakatini tinglaydi.',
      '<button [disabled]="saving" (click)="save()">\n  {{ saving ? "Saqlanmoqda" : "Saqlash" }}\n</button>',
      'Saqlash tugmasini yuklanish vaqtida bloklang va matnini almashtiring.',
      'Angular’da hodisani tinglash uchun qaysi qavs ishlatiladi?',
      ['(click)', '[click]', '{{click}}']],
    ['services', 'Service va dependency injection',
      'Service umumiy mantiqni (masalan, API so‘rovlarini) komponentdan ajratadi. @Injectable bilan e’lon qilinadi va Angular uni kerakli komponentga o‘zi beradi (inject).',
      '@Injectable({ providedIn: "root" })\nexport class CourseService {\n  private http = inject(HttpClient);\n  getAll() {\n    return this.http.get<Course[]>("/api/courses");\n  }\n}',
      'Kurslarni qaytaradigan CourseService yarating va komponentda inject qiling.',
      'Dependency injection nimani osonlashtiradi?',
      ['Servislarni komponentga boshqariladigan tarzda berishni', 'HTML’ni o‘chirishni', 'CSS rangini hisoblashni']],
    ['routing', 'Router va sahifalar orasida o‘tish',
      'Router URL manzilini komponentga bog‘laydi. Manzilning o‘zgaruvchan qismi :id deb yoziladi, shunda bitta komponent turli kurslarni ko‘rsata oladi.',
      'const routes: Routes = [\n  { path: "courses", component: CourseListComponent },\n  { path: "courses/:id", component: CourseDetailComponent }\n];',
      'Kurslar ro‘yxati va bitta kurs tafsiloti sahifalari uchun route’lar yozing.',
      'Route’da o‘zgaruvchan kurs identifikatori qanday yoziladi?',
      [':id', '#id', '{id}']],
    ['project', 'Amaliyot: Angular kurs katalogi',
      'Service orqali kurslarni oling, yuklanish va xato holatlarini ko‘rsating, route orqali tafsilot sahifasini oching va formadagi majburiy maydonni tekshiring.',
      'this.courseService.getAll().subscribe({\n  next: courses => this.courses = courses,\n  error: () => this.error = "Qayta urinib ko‘ring"\n});',
      'Katalog sahifasida yuklanish, xato, bo‘sh va tayyor holatlarini yarating.',
      'API xato qaytarganda foydalanuvchiga nima ko‘rsatish kerak?',
      ['Tushunarli xabar va qayta urinish imkoni', 'Bo‘sh ekran', 'Hech narsa']]
  ]),

  makeCourseTrack('svelte', 'Svelte', 'SV', 'O‘rta', 'Svelte komponentlari, reaktiv qiymat, props, hodisalar va SvelteKit bilan amaliyot.', [
    ['component', 'Svelte komponenti',
      'Svelte komponenti .svelte faylida yoziladi: script, markup va style bir joyda. Kompilyator kerakli JavaScript kodini build vaqtida o‘zi yaratadi. Qiymat markup’da {qavs} ichida chiqariladi.',
      '<script>\n  let name = "Svelte";\n</script>\n\n<h1>Salom, {name}!</h1>\n\n<style>\n  h1 { color: #ff3e00; }\n</style>',
      'Ismni o‘zgaruvchidan oladigan kichik salomlashish komponentini yozing.',
      'Svelte komponenti qaysi fayl kengaytmasiga ega?',
      ['.svelte', '.vue', '.sv']],
    ['state', 'Reaktiv qiymat va hodisalar',
      'Svelte 5 da reaktiv qiymat $state bilan e’lon qilinadi. Qiymat o‘zgarsa, unga bog‘liq ko‘rinish o‘zi yangilanadi. Hodisalar oddiy atribut ko‘rinishida yoziladi, masalan onclick.',
      '<script>\n  let count = $state(0);\n</script>\n\n<button onclick={() => count += 1}>{count}</button>',
      'Hisoblagich yarating va minus tugmasi 0 dan pastga tushirmasin.',
      'Svelte 5 da click hodisasi qanday yoziladi?',
      ['onclick', '@click', '(click)']],
    ['props', 'Props: komponentlar aloqasi',
      'Props ota komponentdan bola komponentga ma’lumot uzatadi. Svelte 5 da bola komponent propslarni $props() bilan oladi.',
      '<!-- CourseCard.svelte -->\n<script>\n  let { title } = $props();\n</script>\n<h2>{title}</h2>\n\n<!-- Ota komponentda -->\n<CourseCard title="HTML" />',
      'title prop’i oladigan CourseCard yarating va uchta kurs uchun ishlating.',
      'Qayta ishlatiladigan interfeys bo‘lagi nima deyiladi?',
      ['Komponent', 'Store', 'Route']],
    ['stores', 'Store va asinxron ma’lumot',
      'Store bir nechta komponentga umumiy holat beradi. Template’da $ prefiksi store qiymatini kuzatib boradi. API’dan ma’lumot yuklashda yuklanish, xato va tayyor holatlarini alohida ko‘rsating.',
      'import { writable } from "svelte/store";\nexport const selectedCourse = writable(null);\n// Komponentda: $selectedCourse',
      'Tanlangan kursni ikki alohida komponent orasida store bilan ulashing.',
      'Store qiymatini reaktiv kuzatish uchun qaysi prefiks yoziladi?',
      ['$', '@', '#']],
    ['project', 'Amaliyot: SvelteKit darslar katalogi',
      'SvelteKit Svelte uchun routing va server imkoniyatlarini beradi. Mashqda sahifa route’lari, serverdan kelgan kurslar, props va qidiruv holatini birlashtiring.',
      'let query = $state("");\nlet visible = $derived(\n  courses.filter(course =>\n    course.title.toLowerCase().includes(query.toLowerCase())\n  )\n);',
      'Qidiruvi va kurs tafsiloti sahifasi bor kichik katalog yarating.',
      'SvelteKit nima beradi?',
      ['Svelte uchun routing va server imkoniyatlarini', 'Faqat CSS reset', 'Faqat ma’lumotlar bazasi']]
  ]),

  makeCourseTrack('nextjs', 'Next.js', 'NXT', 'O‘rta', 'React asosida routing, server komponentlar, ma’lumot olish va metadata bilan ishlang.', [
    ['routing', 'Fayl asosidagi routing',
      'Next.js App Router’da app papkasi ichidagi papkalar URL qismlariga aylanadi. page.tsx shu manzildagi sahifani, layout.tsx esa umumiy karkasni beradi. [id] papka o‘zgaruvchan manzil qismi.',
      'app/\n  layout.tsx\n  page.tsx\n  courses/\n    page.tsx\n    [id]/page.tsx',
      'Bosh sahifa, kurslar ro‘yxati va /courses/[id] sahifalari uchun papka tuzilmasini rejalang.',
      'App Router’da sahifa komponenti qaysi faylda yoziladi?',
      ['page.tsx', 'route.css', 'screen.json']],
    ['server-client', 'Server va Client komponentlar',
      'Server komponent ma’lumotni serverda oladi va brauzerga kamroq kod yuboradi. Agar komponentda state yoki brauzer API’si kerak bo‘lsa, faylning boshiga "use client" yoziladi.',
      'export default async function CoursesPage() {\n  const courses = await getCourses();\n  return <CourseList courses={courses} />;\n}',
      'Kurs ro‘yxatini serverda oling, qidiruv inputini esa alohida client komponent qiling.',
      'State hook ishlatadigan komponent qanday belgilanadi?',
      ['Fayl boshida "use client" bilan', '"use server" bilan', 'export css bilan']],
    ['data', 'Ma’lumot olish, loading va error',
      'Server komponentda to‘g‘ridan-to‘g‘ri await fetch yozish mumkin. loading.tsx yuklanish paytidagi, error.tsx esa xato holatidagi ko‘rinishni beradi.',
      'export default async function Page() {\n  const response = await fetch("https://example.com/api/courses");\n  if (!response.ok) throw new Error("Kurslar olinmadi");\n  return <CourseList courses={await response.json()} />;\n}',
      'API xatosi, bo‘sh ro‘yxat va yuklanish holatlari uchun tushunarli ko‘rinish yozing.',
      'App Router’da yuklanish holati qaysi fayl bilan beriladi?',
      ['loading.tsx', 'wait.tsx', 'pending.css']],
    ['metadata', 'Metadata va optimizatsiya',
      'Metadata sahifaning sarlavhasi va tavsifini belgilaydi; ular brauzer yorlig‘ida va qidiruv natijalarida ko‘rinadi. Server render va rasm optimizatsiyasi yuklanishni tezlashtiradi.',
      'export const metadata = {\n  title: "Kurslar | DevHub",\n  description: "Dasturlash darslarini o‘rganing"\n};',
      'Kurs tafsiloti sahifasi uchun kurs nomidan title va tavsif yarating.',
      'Metadata nima uchun kerak?',
      ['Sahifa sarlavhasi va qidiruv tavsifini belgilaydi', 'State’ni o‘zgartiradi', 'SQL so‘rov bajaradi']],
    ['project', 'Amaliyot: kurslar portali',
      'Routing, server fetch, client qidiruv, metadata va loading/error ko‘rinishlarini birlashtiring. Har bir sahifa kerakli ma’lumotni bir joydan olsin.',
      'export default async function CoursePage({ params }) {\n  const { id } = await params;\n  const course = await getCourse(id);\n  return <CourseDetail course={course} />;\n}',
      'Kurslar ro‘yxati va bitta kurs sahifasidan iborat portal yarating.',
      'Interaktiv tugma qaysi turdagi komponentda bo‘lishi kerak?',
      ['Client komponentda', 'Faqat metadata’da', 'Static CSS’da']]
  ]),

  makeCourseTrack('python', 'Python backend', 'PY', 'Boshlang‘ich', 'Python sintaksisi, ma’lumot tuzilmalari, FastAPI endpoint va test bilan API tuzish.', [
    ['syntax', 'Python sintaksisi va turlar',
      'Python o‘qilishi oson. Kod bloki qavs bilan emas, chekinish (indentatsiya) bilan belgilanadi. O‘zgaruvchi turi qiymatidan aniqlanadi, lekin type hint bilan maqsadni aniq yozib qo‘yish mumkin.',
      'name: str = "Malika"\nlessons: int = 5\nactive: bool = True\nprint(f"{name}: {lessons} dars")',
      'Kurs nomi, darslar soni va tugallanganlik holati uchun type hint yozing.',
      'Python’da kod blokini nima ajratadi?',
      ['Chekinish (indentatsiya)', 'Majburiy qavslar', 'Nuqtali vergul']],
    ['collections', 'List, dict va funksiyalar',
      'list — tartibli ro‘yxat, dict — kalit-qiymat juftliklari. Funksiyaga aniq parametr va return bering. Funksiya parametrida bo‘sh list yoki dict’ni default qiymat qilib qo‘ymang: u keyingi chaqiruvlarda saqlanib qoladi.',
      'def find_course(courses: list[dict], course_id: int):\n    return next((c for c in courses if c["id"] == course_id), None)',
      'ID bo‘yicha kurs topadigan funksiya yozing va topilmagan holatni ko‘rsating.',
      'Kalit-qiymat juftliklari uchun qaysi tur mos?',
      ['dict', 'set', 'tuple']],
    ['fastapi', 'FastAPI: route va schema',
      'FastAPI type hint’lar asosida so‘rovni tekshiradi va hujjat yaratadi. Pydantic model kelayotgan JSON shaklini belgilaydi: noto‘g‘ri ma’lumot kelsa, FastAPI o‘zi xato qaytaradi.',
      'from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Course(BaseModel):\n    title: str\n\n@app.post("/courses")\ndef create_course(course: Course):\n    return course',
      'Kurs yaratish endpointiga title va level maydonlari bor schema yozing.',
      'FastAPI’da kiruvchi ma’lumot shaklini qaysi model belgilaydi?',
      ['Pydantic model', 'CSS class', 'HTML forma']],
    ['async-db', 'Async endpoint va ma’lumotlar bazasi',
      'Async route kutish paytida serverga boshqa so‘rovlarga javob berishga imkon beradi. Ma’lumotlar bazasida parametrli so‘rovlardan foydalaning va qiymatlarni SQL matniga qo‘shib yubormang.',
      'async def list_courses(db):\n    result = await db.execute(select(Course).order_by(Course.title))\n    return result.scalars().all()',
      'Kurslarni nom bo‘yicha tartiblab qaytaradigan async servis rejasini yozing.',
      'await nimani kutadi?',
      ['Asinxron amal tugashini', 'CSS yuklanishini', 'Python fayl saqlanishini']],
    ['project', 'Amaliyot: Python kurslar API',
      'CRUD endpoint, schema validatsiyasi, ma’lumotlar bazasi, status kodlari va pytest testini birlashtiring. Xato javobida ichki stack trace’ni ko‘rsatmang.',
      'def test_create_course(client):\n    response = client.post("/courses", json={"title": "Python"})\n    assert response.status_code == 201\n    assert response.json()["title"] == "Python"',
      'Kurs yaratish va mavjud bo‘lmagan ID uchun avtomatik API test yozing.',
      'API testi odatda nimani tekshiradi?',
      ['Status kodi va javob mazmunini', 'Faqat sahifa rangini', 'Faqat terminal nomini']]
  ]),

  makeCourseTrack('php', 'PHP va Laravel', 'PHP', 'Amaliyot', 'PHP sintaksisi, Composer, Laravel route, validatsiya, Eloquent va test asoslari.', [
    ['syntax', 'PHP sintaksisi va o‘zgaruvchilar',
      'PHP serverda ishlaydi, kod <?php bilan boshlanadi. O‘zgaruvchi nomi $ bilan boshlanadi. Associative array kalit bilan qiymatni bog‘laydi. === qiymat va turni birga solishtiradi.',
      '<?php\n$name = "Kamol";\n$course = ["title" => "PHP", "lessons" => 5];\necho $course["title"];',
      'Kurs arrayini yarating va sarlavhasini ekranga chiqaring.',
      'PHP o‘zgaruvchisi qaysi belgi bilan boshlanadi?',
      ['$', '#', '@']],
    ['functions', 'Funksiyalar va Composer',
      'Funksiya takrorlanadigan ishni bir joyga yig‘adi. Tur e’lonlari (array, int) noto‘g‘ri qiymatni erta ushlaydi. Composer PHP paketlarini o‘rnatadi va avtomatik yuklashni (autoload) boshqaradi.',
      'function lessonCount(array $lessons): int {\n    return count($lessons);\n}',
      'Darslar massividan tugallanganlar sonini qaytaradigan tiplangan funksiya yozing.',
      'PHP paketlarini boshqaruvchi vosita qaysi?',
      ['Composer', 'npm', 'Cargo']],
    ['laravel', 'Laravel: route va controller',
      'Route URL’ni controller metodiga bog‘laydi. Controller HTTP so‘rovni qabul qilib javob beradi, model esa ma’lumot bilan ishlaydi.',
      'Route::get("/courses", [CourseController::class, "index"]);\nRoute::post("/courses", [CourseController::class, "store"]);',
      'Kurslar ro‘yxati va yangi kurs yaratish uchun ikkita route yozing.',
      'Laravel route’lari odatda qayerda e’lon qilinadi?',
      ['routes/web.php yoki routes/api.php', 'composer.json ichida', 'CSS faylida']],
    ['eloquent', 'Validatsiya va Eloquent',
      'Validatsiya noto‘g‘ri ma’lumotni bazaga o‘tkazmaydi. Eloquent — jadval bilan obyekt orqali ishlash usuli: Course::create() yangi yozuv qo‘shadi.',
      '$data = $request->validate([\n    "title" => ["required", "string", "max:120"],\n]);\n$course = Course::create($data);',
      'Kurs nomi va darajasi uchun validatsiya qoidalarini yozing.',
      'Validatsiya xato bersa, nima qilish kerak?',
      ['So‘rovni rad etib, xatolarni qaytarish', 'Noto‘g‘ri ma’lumotni saqlash', 'Xatoni jimgina o‘chirish']],
    ['project', 'Amaliyot: Laravel kurs API',
      'Resource route, Form Request, Eloquent migration va feature testni birlashtiring. Har bir endpoint uchun to‘g‘ri status kodi va ruxsat tekshiruvini belgilang.',
      'public function store(StoreCourseRequest $request): CourseResource\n{\n    $course = Course::create($request->validated());\n    return new CourseResource($course);\n}',
      'Kurs yaratish va ro‘yxatini olish API’sini yozing, to‘g‘ri va noto‘g‘ri so‘rovlarni test qiling.',
      'validated() nimani qaytaradi?',
      ['Tekshiruvdan o‘tgan maydonlarni', 'Barcha maxfiy sozlamalarni', 'SQL jadval nomini']]
  ]),

  makeCourseTrack('java', 'Java backend', 'JAVA', 'O‘rta', 'Java turlari, class va interface, Spring Boot REST, dependency injection va test.', [
    ['types', 'Java turlari va class',
      'Java’da har bir o‘zgaruvchining turi oldindan yoziladi. Class ma’lumot va xatti-harakatni birlashtiradi. Constructor obyekt yaratilayotganda kerakli maydonlarni oladi.',
      'public class Course {\n  private final String title;\n\n  public Course(String title) { this.title = title; }\n\n  public String getTitle() { return title; }\n}',
      'Course classiga title va lessonsCount maydonlari bor constructor qo‘shing.',
      'Java’da obyekt yaratish uchun qaysi kalit so‘z ishlatiladi?',
      ['new', 'make', 'build']],
    ['collections', 'Collection, generics va exception',
      'List tartibli qiymatlarni saqlaydi. List<Course> faqat Course obyektlarini saqlashini bildiradi. Exception xatoni kerakli qatlamda ushlash imkonini beradi.',
      'List<Course> courses = new ArrayList<>();\ncourses.add(new Course("Java"));\nfor (Course course : courses) {\n  System.out.println(course.getTitle());\n}',
      'Kurslar ro‘yxatini generic List’da saqlang va nomlarini chiqaring.',
      'List<Course> nimani bildiradi?',
      ['List faqat Course obyektlarini saqlaydi', 'List faqat raqam saqlaydi', 'Course — bu ro‘yxat emas']],
    ['spring', 'Spring Boot REST controller',
      'Spring Boot sozlashni kamaytiradi. @RestController JSON javob qaytaradigan class’ni belgilaydi. @GetMapping va @PostMapping URL hamda HTTP metodini metodga bog‘laydi.',
      '@RestController\n@RequestMapping("/api/courses")\nclass CourseController {\n  @GetMapping\n  List<Course> all() { return service.findAll(); }\n}',
      'Kurslarni qaytaruvchi GET va yangi kurs yaratuvchi POST endpoint rejasini tuzing.',
      'REST JSON javob uchun qaysi annotatsiya mos?',
      ['@RestController', '@ComponentScan', '@Override']],
    ['injection', 'Service, dependency injection va JPA',
      'Controller HTTP bilan, service biznes qoidalari bilan, repository esa ma’lumotni saqlash bilan shug‘ullanadi. Constructor injection bog‘liqliklarni ochiq ko‘rsatadi va testni osonlashtiradi.',
      '@Service\nclass CourseService {\n  private final CourseRepository repository;\n\n  CourseService(CourseRepository repository) {\n    this.repository = repository;\n  }\n}',
      'Repository’ni constructor orqali oladigan service yarating.',
      'Constructor injection nimasi bilan foydali?',
      ['Bog‘liqlikni ochiq ko‘rsatadi va testni osonlashtiradi', 'Classni o‘chiradi', 'HTML yaratadi']],
    ['project', 'Amaliyot: Spring Boot kurs xizmati',
      'CRUD, Bean Validation, JPA repository va JUnit testni birlashtiring. Biznes qoidalar service’da, HTTP status controller’da boshqariladi.',
      '@PostMapping\nResponseEntity<Course> create(@Valid @RequestBody CourseInput input) {\n  Course saved = service.create(input);\n  return ResponseEntity.status(201).body(saved);\n}',
      'Kurs yaratish endpointi uchun noto‘g‘ri title va muvaffaqiyatli holat testlarini yozing.',
      'Yangi resurs yaratilganda odatda qaysi status qaytariladi?',
      ['201 Created', '204 No Content', '500 Error']]
  ]),

  makeCourseTrack('csharp', 'C# va ASP.NET Core', 'C#', 'O‘rta', 'C# turlari, LINQ, ASP.NET Core API, dependency injection va test.', [
    ['syntax', 'C# turlari va class',
      'C# — statik tiplangan til. record ma’lumot saqlaydigan qisqa model yaratadi. Qiymat bo‘lmasligi mumkin bo‘lsa, tur oxiriga ? qo‘yiladi (nullable).',
      'public record Course(int Id, string Title, int LessonCount);\n\nCourse course = new(1, "C#", 5);\nConsole.WriteLine(course.Title);',
      'Course record’ini yarating va uning nomi hamda darslar sonini chiqaring.',
      'record qaysi ish uchun qulay?',
      ['O‘zgarmas ma’lumot modeli uchun', 'CSS maketi uchun', 'HTTP router uchun']],
    ['collections', 'Collection, LINQ va async',
      'LINQ ro‘yxatlarni Where (filter) va Select (o‘zgartirish) bilan qisqa ifodalaydi. async/await tarmoq yoki disk kutilayotganda thread’ni band qilmaydi.',
      'var active = courses\n  .Where(course => course.IsPublished)\n  .Select(course => course.Title)\n  .ToList();',
      'Faqat chop etilgan kurslarning nomlarini LINQ bilan ajrating.',
      'LINQ’dagi Where nima qiladi?',
      ['Shartga mos elementlarni tanlaydi', 'Elementlarni o‘chiradi', 'Serverni tinglaydi']],
    ['webapi', 'ASP.NET Core Web API',
      'Minimal API route’larni ixcham yozish imkonini beradi, Controller esa katta loyihada kodni tartibda saqlaydi. Dependency injection framework ichiga o‘rnatilgan.',
      'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\nvar courses = new[] { "C# kursi" };\napp.MapGet("/api/courses", () => Results.Ok(courses));\n\napp.Run();',
      'GET /api/courses endpointi 200 status va ro‘yxat qaytarsin.',
      'ASP.NET Core’da route’ni ixcham e’lon qilish usuli qaysi?',
      ['MapGet', 'MapCss', 'RouteHtml']],
    ['data-validation', 'Validatsiya va Entity Framework Core',
      'DTO tashqaridan keladigan ma’lumot shaklini, model esa ichki saqlash shaklini bildiradi. EF Core LINQ’ni SQL’ga aylantiradi. Ma’lumotni avval tekshiring, keyin saqlang.',
      'public record CreateCourse([Required, MaxLength(120)] string Title);\n\napp.MapPost("/api/courses", async (CreateCourse input, AppDb db) => {\n  var course = new Course { Title = input.Title };\n  db.Courses.Add(course);\n  await db.SaveChangesAsync();\n  return Results.Created($"/api/courses/{course.Id}", course);\n});',
      'Title majburiy bo‘lgan POST endpoint rejasini tuzing.',
      'Request DTO nima uchun ishlatiladi?',
      ['Kiruvchi maydonlarni ajratish va tekshirish uchun', 'CSS’ni almashtirish uchun', 'Logni o‘chirish uchun']],
    ['project', 'Amaliyot: ASP.NET kurs API',
      'Minimal API yoki controller, EF Core migration, validatsiya va xotiradagi baza bilan test yozing. Xato statuslarini ham tekshiring.',
      'var response = await client.PostAsJsonAsync("/api/courses", new { Title = "C# asoslari" });\nAssert.Equal(HttpStatusCode.Created, response.StatusCode);',
      'Kurs yaratish, ro‘yxat olish va noto‘g‘ri so‘rovni tekshiradigan testlar yozing.',
      'Integration test odatda nimani tekshiradi?',
      ['Bir nechta qatlam birgalikda ishlashini', 'Faqat bitta CSS rangini', 'Kompilyator versiyasini']]
  ]),

  makeCourseTrack('go', 'Go backend', 'GO', 'O‘rta', 'Go sintaksisi, struct va interface, goroutine, HTTP server va test asoslari.', [
    ['basics', 'Go sintaksisi va qiymatlar',
      'Go sodda sintaksisga ega. := yangi o‘zgaruvchini qisqa e’lon qiladi, struct esa bog‘liq maydonlarni bir joyga yig‘adi. Har bir ishga tushadigan dastur main funksiyasidan boshlanadi.',
      'package main\n\nimport "fmt"\n\nfunc main() {\n  title := "Go API"\n  fmt.Println(title)\n}',
      'Kurs nomi va darslar sonini chiqaradigan kichik Go dasturini yozing.',
      'Go’da qisqa o‘zgaruvchi e’loni qaysi?',
      [':=', '=', 'let']],
    ['structs', 'Struct, method va interface',
      'Struct ma’lumotni, method esa shu ma’lumotga tegishli xatti-harakatni belgilaydi. Interface kerakli metodlar ro‘yxatini beradi va uni qaysi tur bajarishi muhim emas.',
      'type Course struct {\n  ID    int\n  Title string\n}\n\nfunc (c Course) Label() string { return c.Title }\n\ntype CourseStore interface {\n  FindAll() ([]Course, error)\n}',
      'Course struct’i va kurslarni qaytaradigan repository interface’ini yarating.',
      'Go interface nimani belgilaydi?',
      ['Metodlar to‘plamini', 'Class merosini', 'Ma’lumotlar bazasi jadvalini']],
    ['http', 'HTTP handler va JSON',
      'net/http paketida handler so‘rovni qabul qilib, javob yozadi. JSON encoder struct’ni JSON’ga aylantirib yuboradi.',
      'func listCourses(w http.ResponseWriter, r *http.Request) {\n  w.Header().Set("Content-Type", "application/json")\n  json.NewEncoder(w).Encode(courses)\n}',
      'GET /courses handler’ini yozing va Content-Type’ni belgilang.',
      'Go’da HTTP server uchun asosiy standart paket qaysi?',
      ['net/http', 'web/server', 'go/router']],
    ['errors-concurrency', 'Xatolar va goroutine',
      'Go’da xato alohida qiymat sifatida qaytariladi va har safar tekshiriladi. Goroutine yengil parallel ish bajaradi; umumiy ma’lumotni mutex yoki channel bilan himoyalang.',
      'result, err := store.Find(id)\nif err != nil {\n  http.Error(w, "Kurs topilmadi", http.StatusNotFound)\n  return\n}\ngo refreshCache()',
      'Repository xatosiga mos HTTP status qaytaradigan handler yozing.',
      'Go funksiyasi xatoni odatda qanday qaytaradi?',
      ['Alohida error qiymati sifatida', 'Global o‘zgaruvchi orqali', 'CSS class orqali']],
    ['project', 'Amaliyot: Go kurslar xizmati',
      'Handler, service interface, JSON validatsiya va table-driven testni birlashtiring. So‘rov bekor qilinganini context orqali hisobga oling.',
      'func TestListCourses(t *testing.T) {\n  req := httptest.NewRequest(http.MethodGet, "/courses", nil)\n  rec := httptest.NewRecorder()\n  listCourses(rec, req)\n  if rec.Code != http.StatusOK {\n    t.Fatalf("status = %d", rec.Code)\n  }\n}',
      'Kurslar endpointi uchun muvaffaqiyatli va topilmagan holat testini yozing.',
      'Go test fayli qaysi qo‘shimcha bilan tugaydi?',
      ['_test.go', '.spec.go', '.check.go']]
  ]),

  makeCourseTrack('ruby', 'Ruby va Rails', 'RB', 'Amaliyot', 'Ruby sintaksisi, Enumerable, Rails MVC, Active Record va request test.', [
    ['syntax', 'Ruby sintaksisi va collection',
      'Ruby o‘qilishi oson til. Array — ro‘yxat, Hash — kalit-qiymat juftliklari. select va map kabi metodlar ro‘yxatni qisqa filtrlaydi va o‘zgartiradi.',
      'courses = [{ title: "Ruby", active: true }, { title: "Rails", active: false }]\nactive_titles = courses.select { |c| c[:active] }.map { |c| c[:title] }',
      'Faol kurslarning nomini select va map bilan ajratib oling.',
      'Ruby’da kalit-qiymat juftliklari qaysi tur bilan saqlanadi?',
      ['Hash', 'Tuple', 'StructList']],
    ['methods-blocks', 'Method, block va class',
      'Method xatti-harakatga nom beradi. Block metodga uzatiladigan kod bo‘lagi. Class umumiy ma’lumot va metodlarni birlashtiradi; @ bilan boshlanadigan o‘zgaruvchi obyektga tegishli.',
      'class Course\n  attr_reader :title\n\n  def initialize(title)\n    @title = title\n  end\nend',
      'title o‘qiladigan Course class’ini yarating.',
      'Ruby’da obyekt o‘zgaruvchisi (instance variable) qaysi belgi bilan boshlanadi?',
      ['@', '$$', '#']],
    ['rails-mvc', 'Rails: route va MVC',
      'Rails MVC’ga asoslanadi: model — ma’lumot, view — ko‘rinish, controller — ularni bog‘lovchi. Route so‘rovni kerakli controller’ga yo‘naltiradi.',
      'Rails.application.routes.draw do\n  resources :courses, only: [:index, :show, :create]\nend',
      'Kurslarni ro‘yxat, tafsilot va yaratish uchun REST route’lar yozing.',
      'resources :courses odatda nimani yaratadi?',
      ['RESTful route’lar to‘plamini', 'CSS class’larni', 'Ma’lumotlar bazasi zaxirasini']],
    ['activerecord', 'Active Record va validatsiya',
      'Active Record modelni ma’lumotlar bazasi jadvaliga bog‘laydi. Validatsiya noto‘g‘ri qiymatni saqlashdan oldin to‘xtatadi. Migration jadval o‘zgarishlarini versiyalab boradi.',
      'class Course < ApplicationRecord\n  validates :title, presence: true, length: { maximum: 120 }\nend',
      'Kurs nomi majburiy va 120 belgidan oshmasligi uchun validatsiya yozing.',
      'Model validatsiyasi qachon ishlaydi?',
      ['Saqlashdan oldin', 'Faqat CSS yuklanganda', 'Faqat route ochilganda']],
    ['project', 'Amaliyot: Rails JSON API',
      'Controller, model validatsiyasi, migration va request spec’ni birlashtiring. JSON javobda keraksiz maydonlarni ko‘rsatmang va statuslarni to‘g‘ri tanlang.',
      'get "/api/courses"\nexpect(response).to have_http_status(:ok)\nexpect(response.parsed_body).to be_an(Array)',
      'Kurslar ro‘yxati va noto‘g‘ri kurs yaratish uchun request testlarini yozing.',
      'Request spec nimani tekshiradi?',
      ['HTTP endpointning tashqi xatti-harakatini', 'Faqat Ruby formatterini', 'Faqat baza zaxirasini']]
  ]),

  makeCourseTrack('rust', 'Rust backend', 'RS', 'O‘rta', 'Rust ownership, struct va enum, Result, axum endpoint va xavfsiz xatolar.', [
    ['ownership', 'Ownership va borrowing',
      'Rust garbage collector’siz xotira xavfsizligini ownership qoidalari bilan ta’minlaydi: har bir qiymatning bitta egasi bor. Borrowing qiymatni egasini o‘zgartirmasdan vaqtincha ishlatishga beradi; &T o‘qish uchun, &mut T o‘zgartirish uchun.',
      'fn title_length(title: &String) -> usize {\n    title.len()\n}\n\nfn main() {\n    let course = String::from("Rust");\n    println!("{}", title_length(&course));\n}',
      'String’ni ownership’ini ko‘chirmasdan, funksiya ichida faqat o‘qing.',
      'O‘zgartirib bo‘lmaydigan reference qaysi belgi bilan yoziladi?',
      ['&T', '*T', 'mut T']],
    ['types', 'Struct, enum va pattern match',
      'Struct bog‘liq maydonlarni, enum esa aniq variantlardan birini ifodalaydi. match barcha variantlarni ko‘rib chiqishni talab qiladi, birortasi unutilsa, kod kompilyatsiya bo‘lmaydi.',
      'enum CourseState { Draft, Published, Archived }\n\nfn label(state: CourseState) -> &\'static str {\n    match state {\n        CourseState::Draft => "Qoralama",\n        CourseState::Published => "Ochiq",\n        CourseState::Archived => "Arxiv",\n    }\n}',
      'Kurs holatlari uchun enum yarating va har biriga yorliq qaytaring.',
      'match’ning foydali xususiyati qaysi?',
      ['Barcha variantlarni qamrab olishni tekshiradi', 'Xatolarni yashiradi', 'SQL yozadi']],
    ['result', 'Result, Option va xatolar',
      'Option qiymat bor yoki yo‘qligini (Some/None), Result esa muvaffaqiyat yoki xatoni (Ok/Err) ifodalaydi. ? operatori xatoni chaqirgan funksiyaga qisqa uzatadi.',
      'fn find_course(id: i32) -> Result<Course, AppError> {\n    let course = repository::find(id)?;\n    Ok(course)\n}',
      'Topilmagan kursni Result orqali aniq xato bilan qaytaring.',
      'Result’ning ikki asosiy varianti qaysi?',
      ['Ok va Err', 'Some va None', 'True va False']],
    ['web', 'Axum: route va async handler',
      'Axum Tokio asosida async HTTP handler’lar yozadi. Extractor so‘rovdan JSON yoki yo‘l qiymatlarini xavfsiz ajratib beradi.',
      'async fn get_course(Path(id): Path<i32>) -> Result<Json<Course>, AppError> {\n    let course = service::find(id).await?;\n    Ok(Json(course))\n}',
      'ID oladigan async handler yozing va xato variantini belgilang.',
      'Rust’da asinxron funksiyani qaysi kalit so‘z belgilaydi?',
      ['async', 'awaiting', 'promise']],
    ['project', 'Amaliyot: Rust JSON API',
      'Axum, service qatlami, serde modeli, Result xatolari va testni birlashtiring. Kiruvchi ma’lumotni tekshiring va ichki xato tafsilotlarini mijozga ko‘rsatmang.',
      '#[tokio::test]\nasync fn missing_course_returns_not_found() {\n    let response = app.oneshot(request).await.unwrap();\n    assert_eq!(response.status(), StatusCode::NOT_FOUND);\n}',
      'Muvaffaqiyatli va 404 holatlarini qamrab oladigan endpoint test rejasini yozing.',
      'serde odatda nima uchun ishlatiladi?',
      ['Rust qiymatini JSON kabi formatga aylantirish uchun', 'Xotirani qo‘lda bo‘shatish uchun', 'CSS yozish uchun']]
  ]),

  makeCourseTrack('kotlin', 'Kotlin backend', 'KT', 'O‘rta', 'Kotlin null safety, data class, coroutine, Ktor va Spring API hamda test.', [
    ['basics', 'Kotlin sintaksisi va null safety',
      'Kotlin’da val o‘zgarmas, var o‘zgaruvchan bog‘lanish. Qiymat bo‘lmasligi mumkin bo‘lsa, tur oxiriga ? qo‘yiladi. ?. xavfsiz murojaat, ?: esa qiymat yo‘q bo‘lganda zaxira qiymat beradi.',
      'val title: String = "Kotlin"\nvar lessons = 5\nval subtitle: String? = null\nprintln(subtitle?.length ?: 0)',
      'Bo‘sh bo‘lishi mumkin bo‘lgan tavsifni dastur to‘xtab qolmasdan ko‘rsating.',
      'Nullable tur qanday belgilanadi?',
      ['Tur oxiriga ? qo‘yib', 'Tur oxiriga ! qo‘yib', 'Tur oldiga * qo‘yib']],
    ['data', 'Data class va collection',
      'Data class ma’lumot saqlaydigan class uchun equals, copy va toString’ni avtomatik yaratadi. Collection’da filter va map bilan ro‘yxatlarni qisqa qayta ishlash mumkin.',
      'data class Course(val id: Long, val title: String, val published: Boolean)\n\nval titles = courses\n  .filter { it.published }\n  .map { it.title }',
      'Faqat ochiq kurslarning nomlarini ajratib oling.',
      'data class’ning afzalligi nima?',
      ['Ma’lumot class’lari uchun tayyor metodlar yaratadi', 'SQL serverni o‘rnatadi', 'HTML’ni tahlil qiladi']],
    ['coroutines', 'Coroutine va suspend',
      'Coroutine asinxron ishni thread’ni to‘smasdan yozish imkonini beradi. suspend funksiya to‘xtab turib, keyin davom eta oladi va faqat coroutine ichidan chaqiriladi.',
      'suspend fun loadCourses(): List<Course> =\n  withContext(Dispatchers.IO) { repository.findAll() }',
      'Ma’lumot o‘qishni IO dispatcher’da bajaradigan servis funksiyasini yozing.',
      'suspend kalit so‘zi nimani bildiradi?',
      ['Funksiya to‘xtab turib davom eta oladi', 'Funksiya doim sinxron ishlaydi', 'Funksiya HTML qaytaradi']],
    ['ktor', 'Ktor: route va serialization',
      'Ktor plugin’lar orqali ishlaydi: routing, JSON serialization (ContentNegotiation) va boshqalar. Endpointlar routing bloki ichida e’lon qilinadi.',
      '@Serializable\ndata class Course(val id: Int, val title: String)\n\nfun Application.module() {\n  install(ContentNegotiation) { json() }\n  routing {\n    get("/courses") { call.respond(listOf(Course(1, "Kotlin"))) }\n  }\n}',
      'GET /courses route’ini yarating va JSON javobni yoqing.',
      'Ktor’da endpointlar qaysi blok ichida e’lon qilinadi?',
      ['routing', 'stylesheet', 'activity']],
    ['project', 'Amaliyot: Kotlin backend API',
      'Ktor yoki Spring Boot’da CRUD route, DTO validatsiya, coroutine servis va test yozing. Xato va topilmagan holatlar uchun API javoblarini rejalang.',
      '@Test\nfun `unknown course returns 404`() = testApplication {\n  val response = client.get("/courses/999")\n  assertEquals(HttpStatusCode.NotFound, response.status)\n}',
      'Kurs yaratish va mavjud bo‘lmagan kursni olish uchun test yozing.',
      'Ktor’dagi testApplication nimani sinaydi?',
      ['HTTP ilovani test muhitida', 'Android ekran o‘lchamini', 'Gradle keshini']]
  ])
);

starterCourses.push(makeCourseTrack('backend-project', 'Kurslar API: to‘liq backend loyiha', 'API+', 'Amaliy loyiha', 'Node.js va Express’dan boshlab ma’lumotlar bazasi, autentifikatsiya, test va deploygacha ishlaydigan API yarating.', [
  ['plan', 'Loyiha tuzilishi va serverni ishga tushirish',
    'Backend loyiha qatlamlarga bo‘linadi: route URL’ni, controller so‘rov va javobni, service biznes qoidalarini, repository esa ma’lumot saqlashni boshqaradi. Avval bitta kichik oqimni ishga tushiring.',
    'src/\n  routes/courseRoutes.js\n  controllers/courseController.js\n  services/courseService.js\n  repositories/courseRepository.js\n  app.js\nserver.js',
    'Papkalarni yarating, Express serverni ishga tushiring va GET /health endpointi 200 qaytarsin.',
    'URL manzilini handler funksiyasiga qaysi qatlam bog‘laydi?',
    ['Route', 'CSS', 'Ma’lumotlar bazasi jadvali']],
  ['rest', 'REST endpointlar va CRUD',
    'Resurs nomini URL’da ko‘plikda yozing: /api/courses. GET o‘qiydi, POST yaratadi, PATCH qisman yangilaydi, DELETE o‘chiradi. Har bir endpoint bitta aniq ish qilsin.',
    'GET    /api/courses\nGET    /api/courses/:id\nPOST   /api/courses\nPATCH  /api/courses/:id\nDELETE /api/courses/:id',
    'Kurslar uchun beshta route yarating va hozircha xotiradagi massiv bilan CRUD’ni tekshiring.',
    'Yangi kurs yaratish uchun qaysi HTTP metodi ishlatiladi?',
    ['POST', 'GET', 'DELETE']],
  ['validation', 'Kiritmani tekshirish va status kodlari',
    'Mijoz yuborgan ma’lumotga ishonmang. title bo‘sh emasligini va uzunligini tekshiring. Muvaffaqiyatda 201, noto‘g‘ri kiritmada 400, topilmaganda 404 qaytaring.',
    'function validateCourse(input) {\n  if (!input || typeof input.title !== "string" || !input.title.trim()) {\n    return { error: "Kurs nomi majburiy" };\n  }\n  return { value: { title: input.title.trim() } };\n}',
    'Bo‘sh nom uchun 400, to‘g‘ri nom uchun 201 qaytaradigan POST oqimini yozing.',
    'Resurs muvaffaqiyatli yaratilganda mos status qaysi?',
    ['201', '200', '500']],
  ['database', 'PostgreSQL jadvali va bog‘lanishlar',
    'Jadval ma’lumotni doimiy saqlaydi. Primary key har bir yozuvni ajratib turadi, foreign key jadvallarni bog‘laydi. So‘rovda parametrlardan foydalaning, foydalanuvchi qiymatini SQL matniga qo‘shib yubormang.',
    'CREATE TABLE courses (\n  id BIGSERIAL PRIMARY KEY,\n  title VARCHAR(120) NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\n\nSELECT id, title FROM courses WHERE id = $1;',
    'courses jadvalini yarating va ID bo‘yicha bitta kursni parametrli so‘rov bilan oling.',
    'So‘rov qiymatini SQL ichiga xavfsiz uzatish usuli qaysi?',
    ['Parametrli so‘rov', 'String biriktirish', 'HTML escape']],
  ['auth', 'Autentifikatsiya va ruxsatlar',
    'Autentifikatsiya foydalanuvchi kimligini tekshiradi, avtorizatsiya esa unga qaysi amal ruxsat etilganini. Parolni ochiq saqlamang: xavfsiz hash va qisqa muddatli session yoki token ishlating.',
    'const valid = await verifyPassword(inputPassword, passwordHash);\nif (!valid) return res.status(401).json({ error: "Kirish rad etildi" });\nif (user.role !== "admin") return res.sendStatus(403);',
    'Login va faqat admin uchun DELETE route oqimini chizing; 401 va 403 farqini misolda ko‘rsating.',
    'Foydalanuvchi tanildi, lekin bu amalga huquqi yo‘q. Qaysi status qaytariladi?',
    ['403', '401', '201']],
  ['errors', 'Markaziy xato boshqaruvi va loglar',
    'Xatoni bitta joyda ushlash javob shaklini bir xil qiladi. Mijozga tushunarli xabar bering, lekin stack trace, token yoki parolni javobga va logga yozmang.',
    'app.use((error, req, res, next) => {\n  console.error(error.message);\n  res.status(error.status || 500).json({ error: "So‘rovni bajarib bo‘lmadi" });\n});',
    'Topilmagan kurs va server xatosi uchun bir xil JSON shaklida, mos status bilan javob yarating.',
    'Ichki stack trace’ni production API javobida yuborish kerakmi?',
    ['Yo‘q, bu maxfiy ichki ma’lumot', 'Ha, doim yuborish kerak', 'Faqat HTML bilan yuborish kerak']],
  ['tests', 'API testlari va chekka holatlar',
    'Test endpointni haqiqiy HTTP so‘rovi kabi chaqiradi. Muvaffaqiyatli holat bilan birga bo‘sh kiritma, topilmagan ID va ruxsatsiz so‘rovni ham sinab ko‘ring.',
    'const response = await request(app)\n  .post("/api/courses")\n  .send({ title: "Backend asoslari" });\nexpect(response.status).toBe(201);\nexpect(response.body.title).toBe("Backend asoslari");',
    'POST muvaffaqiyati, 400 validatsiya xatosi va 404 holati uchun uchta test yozing.',
    'API testi nimani tekshiradi?',
    ['Kutilgan status va javob mazmunini', 'Faqat kod rangini', 'Faqat papka nomini']],
  ['deploy', 'Environment va deploy',
    'Port va maxfiy kalitlar kodga yozilmaydi, environment orqali beriladi. Deploydan oldin migration, health endpoint, log, CORS va production xatolarini tekshiring.',
    'const port = process.env.PORT || 3000;\nconst databaseUrl = process.env.DATABASE_URL;\nif (!databaseUrl) throw new Error("DATABASE_URL sozlanmagan");\napp.listen(port);',
    'Mahalliy .env va production environment’ni sozlang va maxfiy qiymatlar Git’ga tushmasligini tekshiring.',
    'DATABASE_URL kabi maxfiy sozlamani qayerda saqlash kerak?',
    ['Environment yoki secret manager’da', 'Git ichida', 'Frontend HTML’da']]
]));

const COURSE_ICONS = {
  html5: { color: '#e44d26', art: '<path d="M5 3h14l-1.4 16L12 21l-5.6-2L5 3Z"/><path d="M8 8h8l-.4 4H9l.3 3 2.7.8 2.7-.8.2-1.5" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>' },
  css3: { color: '#1572b6', art: '<path d="M5 3h14l-1.4 16L12 21l-5.6-2L5 3Z"/><path d="M8 8h8l-.4 3H9l.3 3h6l-.4 2.5-2.9.8-2.8-.8-.2-1.5" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>' },
  javascript: { color: '#e8b931', art: '<rect x="3" y="3" width="18" height="18" rx="4"/><text x="5.2" y="16.5" fill="#1b1b1b" font-size="8" font-family="sans-serif" font-weight="700">JS</text>' },
  react: { color: '#55c7e8', art: '<circle cx="12" cy="12" r="1.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.8" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(120 12 12)"/>' },
  roadmap: { color: '#8b7cf6', art: '<path d="M5 19V6a2 2 0 0 1 2-2h10M5 9h8a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="15" r="2"/><circle cx="17" cy="4" r="2"/>' },
  backend: { color: '#39b8a5', art: '<ellipse cx="12" cy="5" rx="7.5" ry="3"/><path d="M4.5 5v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5M4.5 10v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-5" fill="none" stroke="currentColor" stroke-width="1.5"/>' },
  'backend-project': { color: '#16a085', art: '<path d="M4 5h16v14H4z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m8 10 2 2-2 2m4 0h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' },
  typescript: { color: '#3178c6', art: '<rect x="3" y="3" width="18" height="18" rx="3"/><text x="5" y="16" fill="#fff" font-size="7.5" font-family="sans-serif" font-weight="700">TS</text>' },
  vue: { color: '#42b883', art: '<path d="m3 5 9 15 9-15h-5l-4 7-4-7H3Z"/><path d="m8 5 4 7 4-7" fill="#35495e"/>' },
  angular: { color: '#dd0031', art: '<path d="m12 2 9 3-1.4 12L12 22l-7.6-5L3 5l9-3Z"/><path d="m12 6-5 11h2.5l1-2.5h3l1 2.5H17L12 6Zm0 3.5 1.5 3h-3l1.5-3Z" fill="#fff"/>' },
  svelte: { color: '#ff3e00', art: '<path d="M18.7 4.1c-2.1-2.7-6.5-2.9-9.9-.5L5.2 6.2a5 5 0 0 0-1.1 7l.4.5a5 5 0 0 0 .8 6.4c2.1 2.7 6.5 2.9 9.9.5l3.6-2.6a5 5 0 0 0 1.1-7l-.4-.5a5 5 0 0 0-.8-6.4ZM8.6 8.3l3.5-2.5c1.4-1 3.2-.9 4 .1.7.9.4 2.1-.8 3L11.8 12c-1.1.8-1.4 1.8-.8 2.6.7.9 2.2.9 3.4 0l1.9-1.4.9 1.2-2 1.4c-2.2 1.6-5.1 1.4-6.5-.4-1.2-1.6-.7-3.7 1.2-5.1l3.5-2.5c.4-.3.6-.7.4-1-.3-.4-1.1-.3-1.6 0L8.7 9.2l-.1-.9Z"/>' },
  nextjs: { color: '#8b9db4', art: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 16V8l8 9V8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' },
  python: { color: '#3776ab', art: '<path d="M12 3c-4 0-4 1.8-4 4v2h8v1H6C4 10 3 11.5 3 14s1 4 3 4h2v-2c0-2 1.4-3.5 3.5-3.5H16c2 0 3-1.5 3-3.5V7c0-2.5-2-4-7-4Z"/><circle cx="11" cy="6" r=".8" fill="#fff"/><path d="M12 21c4 0 4-1.8 4-4v-2H8v-1h10c2 0 3-1.5 3-4s-1-4-3-4h-2v2c0 2-1.4 3.5-3.5 3.5H8c-2 0-3 1.5-3 3.5v2c0 2.5 2 4 7 4Z" fill="#ffd343"/><circle cx="13" cy="18" r=".8" fill="#fff"/>' },
  php: { color: '#777bb4', art: '<ellipse cx="12" cy="12" rx="10" ry="6.5"/><text x="4.7" y="14.6" fill="#fff" font-size="7" font-family="sans-serif" font-weight="700">PHP</text>' },
  java: { color: '#e76f00', art: '<path d="M12 3c2 2-2 3-1 5 1 1 3 1 3 3M9 13c-3 .2-4 1.2-4 2.5S8 18 12 18s7-1 7-2.5c0-1-1-1.7-3-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 19c2 2 10 2 12 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' },
  csharp: { color: '#9b4f96', art: '<path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 9v6m-2-4h4m5-2v6m-2-4h4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' },
  go: { color: '#00add8', art: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 9h6M5 12h7m-6 3h5m2-6 5 6m0-6-5 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' },
  ruby: { color: '#cc342d', art: '<path d="m4 7 4-4h8l4 4-8 14L4 7Z"/><path d="m4 7h16M8 3l4 18 4-18M4 7l8 5 8-5" fill="none" stroke="#fff" stroke-width="1" stroke-linejoin="round"/>' },
  rust: { color: '#ce6a32', art: '<path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2"/>' },
  kotlin: { color: '#8f52e5', art: '<path d="M4 4h16L4 20V4Z"/><path d="M12 12h8v8h-8z" fill="#f88909"/><path d="M12 12 20 4v8h-8Z" fill="#38b6ff"/>' }
};

function courseIcon(course, className = 'course-icon') {
  const icon = COURSE_ICONS[course.id] || { color: '#0a84ff', art: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' };
  return `<span class="${className}" style="--course-color:${icon.color}" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${icon.art}</svg></span>`;
}

// O‘quv yo‘nalishi: avval yo‘l xaritasi va frontend asoslari, keyin frameworklar,
// undan keyin backend asoslari va turli backend texnologiyalari.
const COURSE_LEARNING_ORDER = [
  'roadmap', 'html5', 'css3', 'javascript', 'typescript', 'react', 'nextjs',
  'vue', 'svelte', 'angular',
  'backend', 'backend-project', 'python', 'php', 'java', 'csharp',
  'go', 'ruby', 'rust', 'kotlin'
];
starterCourses.sort((a, b) => {
  const aIndex = COURSE_LEARNING_ORDER.indexOf(a.id);
  const bIndex = COURSE_LEARNING_ORDER.indexOf(b.id);
  return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex);
});

const storedCourses = readStore(STORAGE.courses, null);
let courses = storedCourses || starterCourses;
let expandedCourseId = null;
let sidebarOpen = false;
let courseFilter = 'all';
let courseSearch = '';
let users = readStore(STORAGE.users, []);
let session = readStore(STORAGE.session, null);
let view = 'home';
let selectedLesson = null;
let authMode = 'login';
let quizChoice = null;
let toastTimer;

function readStore(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}
function saveCourses() { localStorage.setItem(STORAGE.courses, JSON.stringify(courses)); }
function saveUsers() { localStorage.setItem(STORAGE.users, JSON.stringify(users)); }
function saveSession() { localStorage.setItem(STORAGE.session, JSON.stringify(session)); }

// Katalog versiyasi o‘zgarsa, saqlangan darslar yangi darslar bilan yangilanadi.
// Faqat admin o‘zi tahrirlagan darslar (edited: true) saqlanib qoladi.
const CATALOG_VERSION = '7';
function syncStarterCatalog() {
  if (!storedCourses) {
    localStorage.setItem(STORAGE.catalogVersion, CATALOG_VERSION);
    saveCourses();
    return;
  }
  if (localStorage.getItem(STORAGE.catalogVersion) === CATALOG_VERSION) return;
  const existingCourses = courses;
  courses = starterCourses.map(starter => {
    const existing = existingCourses.find(course => course.id === starter.id);
    if (!existing) return JSON.parse(JSON.stringify(starter));
    const savedLessons = existing.lessons || [];
    const starterIds = new Set(starter.lessons.map(lesson => lesson.id));
    const orderedLessons = starter.lessons.map(lesson => {
      const saved = savedLessons.find(item => item.id === lesson.id);
      return saved?.edited ? saved : lesson;
    });
    const customLessons = savedLessons.filter(lesson => !starterIds.has(lesson.id));
    return { ...existing, lessons: [...orderedLessons, ...customLessons] };
  }).concat(existingCourses.filter(course => !starterCourses.some(starter => starter.id === course.id)));
  localStorage.setItem(STORAGE.catalogVersion, CATALOG_VERSION);
  saveCourses();
}
function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
function codeLanguage(courseId, lessonId) {
  if (courseId === 'html5') return 'HTML';
  if (courseId === 'css3') return 'CSS';
  if (courseId === 'react') return 'JSX';
  if (courseId === 'typescript' || courseId === 'angular') return 'TYPESCRIPT';
  if (courseId === 'vue') return 'VUE';
  if (courseId === 'svelte') return 'SVELTE';
  if (courseId === 'nextjs') return 'JSX';
  if (courseId === 'python') return 'PYTHON';
  if (courseId === 'php') return 'PHP';
  if (courseId === 'java') return 'JAVA';
  if (courseId === 'csharp') return 'CSHARP';
  if (courseId === 'go') return 'GO';
  if (courseId === 'ruby') return 'RUBY';
  if (courseId === 'rust') return 'RUST';
  if (courseId === 'kotlin') return 'KOTLIN';
  if (courseId === 'backend' && lessonId === 'backend-sql') return 'SQL';
  if (courseId === 'backend-project' && lessonId.endsWith('-database')) return 'SQL';
  if (courseId === 'roadmap') {
    if (lessonId === 'roadmap-accessibility') return 'HTML';
    if (lessonId === 'roadmap-js' || lessonId === 'roadmap-api') return 'JAVASCRIPT';
    if (lessonId === 'roadmap-git' || lessonId === 'roadmap-deploy') return 'SHELL';
    return 'TEXT';
  }
  return 'JAVASCRIPT';
}
function formatCodeExample(source, language) {
  const code = String(source).trim();
  if (language === 'HTML') {
    const lines = code.replace(/></g, '>\n<').split('\n').map(line => line.trim()).filter(Boolean);
    let depth = 0;
    return lines.map(line => {
      if (/^<\//.test(line)) depth = Math.max(0, depth - 1);
      const formatted = `${'  '.repeat(depth)}${line}`;
      const openingTag = line.match(/^<([a-z][\w:-]*)\b[^>]*>$/i);
      const voidTags = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
      const closesOnSameLine = openingTag && new RegExp(`<\\/${openingTag[1]}\\s*>\\s*$`, 'i').test(line);
      if (openingTag && !voidTags.test(openingTag[1]) && !/\/>$/.test(line) && !closesOnSameLine) depth += 1;
      return formatted;
    }).join('\n');
  }
  if (language === 'CSS' && !code.includes('\n')) {
    return code.replace(/\s*\{\s*/g, ' {\n  ').replace(/;\s*/g, ';\n  ').replace(/\s*\}\s*/g, '\n}\n').trim();
  }
  if (language === 'JAVASCRIPT' && !code.includes('\n') && !/[{}]/.test(code) && !code.includes('`')) {
    return code.replace(/;\s*(?=\S)/g, ';\n');
  }
  return source;
}
function highlightHtml(line) {
  const markupPattern = /(<!--.*?-->|<!doctype\b[^>]*>|<\/?[A-Za-z][^>]*>)/gi;
  const tagPartPattern = /(<\/?)([A-Za-z][\w:-]*)|([A-Za-z_:][\w:.-]*)(?=\s*=)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\/?>)/g;
  let output = '';
  let cursor = 0;
  for (const match of line.matchAll(markupPattern)) {
    output += escapeHtml(line.slice(cursor, match.index));
    const markup = match[0];
    if (markup.startsWith('<!--')) {
      output += `<span class="syntax-comment">${escapeHtml(markup)}</span>`;
    } else if (/^<!doctype/i.test(markup)) {
      output += `<span class="syntax-punctuation">&lt;!</span><span class="syntax-keyword">doctype</span><span class="syntax-text">${escapeHtml(markup.slice(9, -1))}</span><span class="syntax-punctuation">&gt;</span>`;
    } else {
      let tagOutput = '';
      let tagCursor = 0;
      for (const part of markup.matchAll(tagPartPattern)) {
        tagOutput += escapeHtml(markup.slice(tagCursor, part.index));
        if (part[1]) tagOutput += `<span class="syntax-punctuation">${escapeHtml(part[1])}</span><span class="syntax-tag">${escapeHtml(part[2])}</span>`;
        else if (part[3]) tagOutput += `<span class="syntax-attribute">${escapeHtml(part[3])}</span>`;
        else if (part[4]) tagOutput += `<span class="syntax-string">${escapeHtml(part[4])}</span>`;
        else tagOutput += `<span class="syntax-punctuation">${escapeHtml(part[5])}</span>`;
        tagCursor = part.index + part[0].length;
      }
      output += tagOutput + escapeHtml(markup.slice(tagCursor));
    }
    cursor = match.index + markup.length;
  }
  return output + escapeHtml(line.slice(cursor));
}
function highlightCodeLine(line, language) {
  if (language === 'HTML') return highlightHtml(line);
  if (language === 'TEXT') return escapeHtml(line);
  if (language === 'PYTHON' && /^\s*#/.test(line)) return `<span class="syntax-comment">${escapeHtml(line)}</span>`;
  if (language === 'SHELL' && /^\s*#/.test(line)) return `<span class="syntax-comment">${escapeHtml(line)}</span>`;
  const tokenPattern = /\/\*.*?\*\/|\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|#[\da-fA-F]{3,8}\b|@[A-Za-z-]+|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%)?\b|<\/?[A-Za-z][\w.-]*|[.#]?[A-Za-z_$][\w$-]*|=>|===?|!==?|&&|\|\||[{}()[\].,;:+*/=<>!-]/g;
  const keywords = language === 'SQL'
    ? new Set(['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'AND', 'OR', 'AS', 'TRUE', 'FALSE'])
    : new Set(['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'of', 'in', 'while', 'new', 'class', 'extends', 'import', 'from', 'export', 'default', 'async', 'await', 'try', 'catch', 'throw', 'typeof', 'true', 'false', 'null', 'undefined', 'require', 'process', 'env']);
  let output = '';
  let cursor = 0;
  for (const match of line.matchAll(tokenPattern)) {
    output += escapeHtml(line.slice(cursor, match.index));
    const token = match[0];
    let tokenClass = 'syntax-operator';
    const rest = line.slice(match.index + token.length);
    if (token.startsWith('//') || token.startsWith('/*')) tokenClass = 'syntax-comment';
    else if (/^["'`]/.test(token)) tokenClass = 'syntax-string';
    else if (/^\d/.test(token) || /^#[\da-f]/i.test(token)) tokenClass = 'syntax-number';
    else if (token.startsWith('@')) tokenClass = 'syntax-keyword';
    else if (/^<\/?[A-Za-z]/.test(token)) tokenClass = 'syntax-tag';
    else if (language === 'CSS' && /^[.#]/.test(token)) tokenClass = 'syntax-selector';
    else if (language === 'CSS' && /^[A-Za-z-]+$/.test(token) && /^\s*:/.test(rest)) tokenClass = 'syntax-property';
    else if (keywords.has(language === 'SQL' ? token.toUpperCase() : token)) tokenClass = 'syntax-keyword';
    else if (/^[A-Za-z_$][\w$-]*$/.test(token) && /^\s*\(/.test(rest)) tokenClass = 'syntax-function';
    else if (language === 'CSS' && /^[A-Za-z-]+$/.test(token)) tokenClass = 'syntax-value';
    output += `<span class="${tokenClass}">${escapeHtml(token)}</span>`;
    cursor = match.index + token.length;
  }
  return output + escapeHtml(line.slice(cursor));
}
function renderCodeEditor(lesson, courseId) {
  const language = codeLanguage(courseId, lesson.id);
  const fileName = { HTML: 'index.html', CSS: 'styles.css', JSX: 'App.jsx', TYPESCRIPT: 'course.ts', VUE: 'Course.vue', SVELTE: 'Course.svelte', PYTHON: 'main.py', PHP: 'Course.php', JAVA: 'Course.java', CSHARP: 'Course.cs', GO: 'main.go', RUBY: 'course.rb', RUST: 'main.rs', KOTLIN: 'Course.kt', SQL: 'query.sql', SHELL: 'workflow.sh', TEXT: 'roadmap.txt', JAVASCRIPT: 'script.js' }[language];
  const source = formatCodeExample(lesson.code, language);
  const lines = source.split('\n').map((line, index) => `<span class="code-line"><span class="code-line-number">${index + 1}</span><span class="code-line-source">${highlightCodeLine(line, language) || ' '}</span></span>`).join('');
  return `<div class="code-editor"><div class="code-editor-bar"><span class="editor-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-file-name">${fileName}</span><span class="code-language">${language}</span></div><pre class="code-block"><code>${lines}</code></pre></div>`;
}
function playgroundLanguage(type) {
  return type === 'html' ? 'HTML' : type === 'css' ? 'CSS' : 'JAVASCRIPT';
}
function renderPlaygroundCode(value, type) {
  const language = playgroundLanguage(type);
  return String(value).split('\n').map((line, index) => `<span class="playground-code-line"><span class="playground-line-number">${index + 1}</span><span class="playground-line-source">${highlightCodeLine(line, language) || ' '}</span></span>`).join('');
}
function syncPlaygroundEditor(type) {
  const textarea = document.querySelector(`[data-playground-code="${type}"]`);
  const highlight = document.querySelector(`[data-playground-highlight="${type}"]`);
  if (!textarea || !highlight) return;
  highlight.innerHTML = renderPlaygroundCode(textarea.value, type);
  highlight.style.transform = `translate(${-textarea.scrollLeft}px, ${-textarea.scrollTop}px)`;
  if (document.querySelector(`[data-playground-tab="${type}"]`)?.classList.contains('active')) {
    const beforeCursor = textarea.value.slice(0, textarea.selectionStart);
    const lines = beforeCursor.split('\n');
    const languageLabel = document.querySelector('#playground-status-language');
    const positionLabel = document.querySelector('#playground-status-position');
    if (languageLabel) languageLabel.textContent = playgroundLanguage(type);
    if (positionLabel) positionLabel.textContent = `Ln ${lines.length}, Col ${lines.at(-1).length + 1}`;
  }
}
const COURSE_LEARNING_GUIDES = {
  html5: { why: 'HTML mazmun va sahifa tuzilishini brauzerga tushuntiradi. Semantik teglar qidiruv tizimi, ekran o‘qigich va jamoaviy ishlashga yordam beradi.', example: 'Maqola, portfolio, ro‘yxatdan o‘tish formasi yoki mahsulot sahifasi.' },
  css3: { why: 'CSS tuzilmani o‘qilishi oson, brendga mos va turli ekranlarda qulay interfeysga aylantiradi.', example: 'Telefon va desktopda o‘zgaradigan karta, navigatsiya va sahifa maketi.' },
  javascript: { why: 'JavaScript foydalanuvchi harakatiga javob beradi, ma’lumotni o‘zgartiradi va brauzer API’lari bilan ishlaydi.', example: 'Qidiruv, forma validatsiyasi, vazifalar ro‘yxati yoki API’dan yuklangan kontent.' },
  react: { why: 'React interfeysni kichik komponentlarga ajratadi va state o‘zgarganda kerakli ko‘rinishni yangilaydi.', example: 'Kurs katalogi, hisoblagich, forma yoki boshqaruv paneli.' },
  roadmap: { why: 'Frontend yo‘l xaritasi mavzularni ketma-ket amaliy loyihaga bog‘laydi; har bosqich keyingisiga tayyorlaydi.', example: 'G‘oyani Git bilan boshqariladigan, mobilga mos portfolio loyihasiga aylantirish.' },
  backend: { why: 'Backend so‘rovlarni tekshiradi, biznes qoidalarini bajaradi va ma’lumotni xavfsiz saqlaydi yoki qaytaradi. Eslatma: ushbu DevHub fayli o‘zi backend server emas; undagi backend kodlari dars misollari va simulyatsiya uchun.', example: 'Kurslar API’si, login, CRUD endpointlari va SQL bazasi. Haqiqiy ishlashi uchun alohida server va ma’lumotlar bazasi kerak.' },
  'backend-project': { why: 'Bu yakuniy yo‘nalish backend bilimlarini API loyihasiga yig‘adi: so‘rovdan bazagacha va testdan deploygacha. Ushbu brauzer MVP ichida esa haqiqiy server ishga tushmagan.', example: 'Express API → PostgreSQL → validatsiya va login → test → deploy. Bu bosqichlarni alohida backend loyihasida amalga oshirish kerak.' },
  typescript: { why: 'TypeScript qiymatlar shaklini oldindan tekshiradi va katta JavaScript loyihalaridagi xatolarni erta ko‘rsatadi.', example: 'API javobi, komponent propsi va bir nechta holatli formani aniq tiplash.' },
  vue: { why: 'Vue reaktiv ma’lumotni template bilan bog‘lab, interfeysni komponentlarda tartibli quradi.', example: 'Qidiruvli kurs katalogi va tanlangan kurs tafsilot sahifasi.' },
  angular: { why: 'Angular to‘liq framework sifatida komponent, service, router va forma qatlamlarini yagona tartibda beradi.', example: 'Katta kurs portalidagi route’lar, API service va tekshiriladigan formalar.' },
  svelte: { why: 'Svelte komponentlarni build vaqtida samarali JavaScript’ga aylantiradi va reaktiv holatni sodda yozishga yordam beradi.', example: 'Filtrlanadigan vazifalar ro‘yxati yoki yengil darslar katalogi.' },
  nextjs: { why: 'Next.js React sahifalarini server va client vazifalariga ajratib, routing hamda ma’lumot olishni tartibga soladi.', example: 'Tez yuklanadigan kurs sahifalari, qidiruv va batafsil route’lar.' },
  python: { why: 'Python backend’da aniq o‘qiladigan kod, ma’lumotni qayta ishlash va API yaratish uchun qulay.', example: 'FastAPI orqali kurslarni yaratish, tekshirish va bazadan qaytarish.' },
  php: { why: 'PHP web so‘rovlarini serverda qayta ishlaydi; Laravel route, validatsiya va ma’lumotlar bazasini tartiblaydi.', example: 'Kurs API’si, serverda forma qabul qilish va admin amallari.' },
  java: { why: 'Java qat’iy turlar va qatlamli tuzilma bilan uzoq muddat ishlaydigan backend xizmatlarini qurishga yordam beradi.', example: 'Spring Boot’da tekshiriladigan REST API va ma’lumotlar bazasi.' },
  csharp: { why: 'C# va ASP.NET Core kuchli tiplar, dependency injection hamda Web API vositalarini birlashtiradi.', example: 'Kurslarni saqlaydigan, qidiradigan va test qilinadigan API.' },
  go: { why: 'Go ixcham sintaksis va standart HTTP vositalari bilan tez, sodda serverlar yozishga mos.', example: 'JSON qaytaruvchi endpoint va bir vaqtda ishlaydigan backend xizmat.' },
  ruby: { why: 'Ruby o‘qilishi oson kodga, Rails esa MVC va Active Record orqali web ishlarini tez tartiblashga urg‘u beradi.', example: 'Kurslarni boshqaruvchi JSON API va request testlar.' },
  rust: { why: 'Rust ownership va Result orqali xotira xavfsizligi hamda xatolarni aniq boshqarishni kompilyatsiya vaqtida tekshiradi.', example: 'Xavfsiz, tez ishlaydigan API handler va ishonchli ma’lumot oqimi.' },
  kotlin: { why: 'Kotlin null safety va coroutine’lar bilan JVM backend kodini ixcham hamda asinxron yozishga yordam beradi.', example: 'Ktor yoki Spring Boot’da kurs API’si va parallel I/O so‘rovlari.' }
};
const LESSON_CONCEPTS = [
  { terms: ['doctype', 'hujjat', 'html', 'semantik', 'teglar'], title: 'Hujjat tuzilishi', detail: 'Brauzer teglarni daraxt ko‘rinishida o‘qiydi. Mazmun vazifasiga mos element tanlash sahifani tushunarli qiladi.' },
  { terms: ['rasm', 'havola', 'alt', 'media'], title: 'Havola va media', detail: 'Manzilni href/src orqali bering; mazmunli alt matn tasvirni ko‘ra olmaydigan foydalanuvchiga ham yetkazadi.' },
  { terms: ['forma', 'input', 'validatsiya', 'form'], title: 'Foydalanuvchi kiritmasi', detail: 'Maydonni label bilan nomlang, kutilgan tur va majburiylikni belgilang; serverga kelgan qiymatni ham qayta tekshiring.' },
  { terms: ['css', 'selektor', 'kaskad', 'rang', 'typography', 'shrift'], title: 'Stil va kaskad', detail: 'Selektor nishonni tanlaydi, deklaratsiya esa xususiyat-qiymat juftligini beradi. Bir xil nishondagi qoidalarda kaskad ustuvorlikni hal qiladi.' },
  { terms: ['box model', 'padding', 'margin', 'masofa'], title: 'Box model', detail: 'Content, padding, border va margin element o‘lchami hamda qo‘shni elementlar orasidagi masofani belgilaydi.' },
  { terms: ['flexbox', 'flex'], title: 'Flexbox', detail: 'Bir o‘qdagi elementlarni joylashtiradi. Asosiy o‘qni justify-content, ko‘ndalang o‘qni align-items boshqaradi.' },
  { terms: ['grid'], title: 'CSS Grid', detail: 'Satr va ustunli ikki o‘lchamli maket yaratadi. minmax va repeat ustunlarni ekran kengligiga moslashtiradi.' },
  { terms: ['responsive', 'media query', 'mobil'], title: 'Moslashuvchan maket', detail: 'Moslashuvchan ustunlar, max-width va breakpoint kichik hamda katta ekranlarda kontentni o‘qiladigan saqlaydi.' },
  { terms: ['o‘zgaruvchi', 'const', 'let', 'turlar', 'type'], title: 'Qiymat va tur', detail: 'O‘zgaruvchi qiymatga nom beradi. Tur kutilgan ma’lumotni aniqlaydi va noto‘g‘ri amalni topishga yordam beradi.' },
  { terms: ['shart', 'if', 'taqqoslash'], title: 'Shartli qaror', detail: 'Shart true yoki false bo‘lishiga qarab turli kod yo‘llari tanlanadi. Chegara qiymatlarini ham sinab ko‘ring.' },
  { terms: ['sikl', 'takrorlash', 'for', 'ro‘yxatlar', 'massiv', 'array'], title: 'Ro‘yxat bilan ishlash', detail: 'Takrorlash ko‘p qiymatda bir xil amalni bajaradi. map yangi qiymat hosil qiladi, filter esa shartga moslarini tanlaydi.' },
  { terms: ['funksiya', 'method', 'parametr'], title: 'Funksiya va parametr', detail: 'Funksiya nomlangan vazifani qayta ishlatadi. Parametr kiruvchi ma’lumot, return esa hisoblangan natijani chaqiruvchiga beradi.' },
  { terms: ['obyekt', 'object', 'struct', 'class', 'record'], title: 'Ma’lumot modeli', detail: 'Obyekt yoki struct bog‘liq qiymatlarni birlashtiradi. Maydonlarni vazifasiga qarab nomlash kodni o‘qishni osonlashtiradi.' },
  { terms: ['dom', 'html element'], title: 'DOM bilan ishlash', detail: 'DOM hujjat elementlarini daraxt qilib beradi. Elementni toping, matn yoki class’ni yangilang va foydalanuvchi kiritmasini HTML sifatida emas, matn sifatida qo‘ying.' },
  { terms: ['hodisa', 'event', 'listener', 'click'], title: 'Hodisaga javob', detail: 'Event listener foydalanuvchi harakatini kutadi. Bitta vazifali handler yozish va keraksiz takroriy tinglovchilardan qochish muhim.' },
  { terms: ['component', 'komponent', 'jsx', 'sfc'], title: 'Komponent', detail: 'Komponent interfeysning qayta ishlatiladigan qismi. Kichik va aniq vazifali komponentni sinash hamda boshqa joyda ishlatish oson.' },
  { terms: ['props', 'emit', 'binding'], title: 'Komponentlararo ma’lumot', detail: 'Props ma’lumotni ota komponentdan uzatadi. Hodisa yoki callback bola komponentdan tanlovni qaytaradi; oqim aniq qoladi.' },
  { terms: ['state', 'holat', 'useState', 'ref', 'store'], title: 'Reaktiv holat', detail: 'State o‘zgarganda framework tegishli ko‘rinishni yangilaydi. Hosilaviy qiymatni imkon qadar manba state’dan hisoblang.' },
  { terms: ['hook', 'useeffect', 'effect', 'async', 'await', 'promise', 'coroutine'], title: 'Asinxron ish', detail: 'Tarmoq va disk amallari kutishni talab qiladi. Yuklanish, muvaffaqiyat va xato holatlarini alohida ko‘rsating.' },
  { terms: ['api', 'endpoint', 'route', 'http', 'rest'], title: 'HTTP va API', detail: 'Endpoint metod va URL orqali resursga murojaat qiladi. Status kodi, validatsiya va barqaror JSON shaklini birga rejalang.' },
  { terms: ['sql', 'ma’lumotlar bazasi', 'database', 'eloquent', 'jpa'], title: 'Doimiy ma’lumot', detail: 'Ma’lumotlar bazasi server qayta ishga tushganda ham qiymatlarni saqlaydi. So‘rov parametrlarini xavfsiz bog‘lang va kerakli ustunlarni tanlang.' },
  { terms: ['ownership', 'borrowing', 'xotira'], title: 'Xotira egaligi', detail: 'Ownership kim qiymatni boshqarishini belgilaydi; borrowing vaqtincha murojaat beradi. Shu qoidalar xotira xatolarining oldini oladi.' },
  { terms: ['validatsiya', 'validation', 'xatolar', 'error', 'result'], title: 'Xatoni boshqarish', detail: 'Xatoni kerakli qatlamda ushlang, foydalanuvchiga foydali javob bering va maxfiy ichki tafsilotlarni oshkor qilmang.' },
  { terms: ['git', 'branch', 'commit'], title: 'O‘zgarishlar tarixi', detail: 'Kichik commit va ma’noli branch ishni kuzatish, qayta ko‘rish va jamoada birlashtirishni osonlashtiradi.' },
  { terms: ['accessibility', 'qulay foydalanish', 'klaviatura'], title: 'Qulay foydalanish', detail: 'Klaviatura fokusini ko‘rsating, boshqaruvlarga nom bering va kontrastni tekshiring. Bu xususiyatlar hamma uchun foydali.' },
  { terms: ['test', 'amaliyot', 'loyiha'], title: 'Tekshirib ko‘rish', detail: 'Oddiy holat bilan cheklanmay, bo‘sh qiymat, noto‘g‘ri kiritma va xato javobni ham sinang. Test kutilgan xulqni aniq qayd etadi.' }
];
function lessonConcepts(lesson) {
  const searchText = `${lesson.title} ${lesson.summary}`.toLocaleLowerCase('uz');
  const matched = LESSON_CONCEPTS.filter(concept => concept.terms.some(term => searchText.includes(term))).slice(0, 2);
  return matched.length ? matched : [{ title: 'Mavzuni amalda qo‘llash', detail: 'Avval asosiy qoidani kod namunasida toping, keyin qiymatni o‘zgartirib natijani kuzating. Bu usul mavzuni yodlashdan ko‘ra tushunishga yordam beradi.' }];
}
function renderLessonGuide(lesson, course) {
  const guide = COURSE_LEARNING_GUIDES[course?.id] || { why: 'Bu mavzu dasturdagi ma’lumotni tushunish va foydalanuvchiga foydali natija berishga yordam beradi.', example: 'Mavzudagi kichik qismni haqiqiy loyiha vazifasiga qo‘llang.' };
  const concepts = lessonConcepts(lesson);
  const mainConcept = concepts[0];
  const extraConcepts = concepts.slice(1);
  const isBackend = ['backend', 'backend-project', 'python', 'php', 'java', 'csharp', 'go', 'ruby', 'rust', 'kotlin'].includes(course?.id);
  const backendNotice = isBackend ? `<div class="learning-callout callout-amber"><span class="callout-icon" aria-hidden="true">!</span><div><strong>MUHIM: HAQIQIY BACKEND VA DEMO FARQI</strong><p>Bu o‘quv sayti hozircha LocalStorage bilan ishlaydigan brauzer MVP hisoblanadi. Quyidagi backend kodlari o‘rganish uchun misol/simulyatsiya; ular o‘z-o‘zidan server yoki ma’lumotlar bazasini ishga tushirmaydi. Haqiqiy backend uchun server loyihasi, server tomondagi validatsiya, ma’lumotlar bazasi, autentifikatsiya va maxfiy sozlamalar alohida sozlanadi.</p></div></div>` : '';
  return `<section class="lesson-overview"><span class="eyebrow">BUGUNGI MAVZU</span><p class="lesson-summary">${escapeHtml(lesson.summary)}</p><div class="learning-callout callout-blue"><span class="callout-icon" aria-hidden="true">1</span><div><strong>ASOSIY QOIDA · ${escapeHtml(mainConcept.title)}</strong><p>${escapeHtml(mainConcept.detail)}</p></div></div><div class="learning-callout callout-green"><span class="callout-icon" aria-hidden="true">✓</span><div><strong>AMALDA QAYERDA KERAK?</strong><p>${escapeHtml(guide.example)}</p></div></div>${backendNotice}<details class="lesson-extra"><summary>Qo‘shimcha tushuntirish: nima uchun, qayerda va qanday?</summary><div class="lesson-guide"><h2>Nima uchun bu mavzu kerak?</h2><p>${escapeHtml(guide.why)}</p><h3>Qachon ishlataman?</h3><p>${escapeHtml(guide.example)} Avval vazifani aniqlang, so‘ng shu vazifani eng sodda kod bilan bajaring va natijani sinab ko‘ring.</p><h3>Asosiy qoida</h3><p>${escapeHtml(mainConcept.detail)} Kodni ko‘chirib qo‘yish bilan cheklanmay, har bir qiymat qayerdan kelishini va qayerda ishlatilishini aniqlang.</p><h3>Ehtiyot bo‘ladigan xatolar</h3><ul><li>Misolni tekshirmasdan o‘z loyihangizga ko‘chirmang; fayl nomi, kutubxona va muhit mosligini tekshiring.</li><li>Bo‘sh qiymat, noto‘g‘ri kiritma va xato holatini ham sinab ko‘ring.</li><li>Backend misollarida mijoz yuborgan ma’lumotga ishonmang, serverda validatsiya qiling va maxfiy qiymatlarni kodga yozmang.</li></ul>${extraConcepts.length ? `<div class="concept-grid">${extraConcepts.map((concept, index) => `<article class="concept-card"><span class="concept-index">0${index + 2}</span><h3>${escapeHtml(concept.title)}</h3><p>${escapeHtml(concept.detail)}</p></article>`).join('')}</div>` : ''}</div></details></section>`;
}
function explainCodeLine(line, language, previousLine = '', nextLine = '') {
  const source = line.trim();
  const lower = source.toLowerCase();
  if (!source) return 'Bo‘sh qator: kod bo‘limlarini ko‘z bilan ajratib, o‘qishni osonlashtiradi.';
  if (/^(\/\/|#|<!--|\/\*|\*)/.test(source)) return 'Izoh: dastur bu matnni buyruq sifatida bajarmaydi. U kodning maqsadini o‘zingizga yoki jamoaga tushuntirish uchun yoziladi.';
  if (/^<!doctype/i.test(source)) return 'Brauzerga hujjat HTML5 standartida yozilganini bildiradi. Odatda HTML faylining eng boshida turadi.';
  if (/^<html\b/i.test(source)) return 'HTML hujjatining ildiz elementi. lang atributi sahifa tilini bildiradi va ekran o‘qigich hamda qidiruv tizimlariga yordam beradi.';
  if (/^<head\b/i.test(source)) return 'Sahifaning foydalanuvchiga bevosita ko‘rinmaydigan sozlamalari shu qismda: title, meta va CSS ulanishlari.';
  if (/^<body\b/i.test(source)) return 'Brauzer sahifada ko‘rsatadigan asosiy kontent shu element ichida joylashadi.';
  if (/^<\/?[a-z][^>]*>/i.test(source)) {
    const tag = (source.match(/^<\/?([a-z0-9-]+)/i) || [,''])[1].toLowerCase();
    const details = {
      h1: 'Sahifaning asosiy sarlavhasi. Odatda sahifa mazmunini bildiradigan bitta aniq h1 ishlatiladi.',
      h2: 'Asosiy bo‘lim sarlavhasi. Sarlavha darajalarini mantiqiy tartibda ishlating.',
      p: 'Oddiy matn paragrafi. Matnni div bilan o‘rashdan ko‘ra mazmuniga mos p ishlatish tushunarlilikni oshiradi.',
      a: 'Havola yaratadi. href manzili bosilganda qayerga borilishini belgilaydi.',
      img: 'Rasm chiqaradi. src manzil, mazmunli alt esa rasmni ko‘ra olmaydigan foydalanuvchiga muqobil ma’lumot beradi.',
      form: 'Foydalanuvchi kiritmalarini birga yuborish uchun forma. Backend mavjud bo‘lsa, yuborilgan ma’lumot serverda ham tekshirilishi shart.',
      input: 'Foydalanuvchidan qiymat oladi. type va name maydonning turi hamda yuboriladigan nomini belgilaydi.',
      label: 'Forma maydoniga tushunarli nom beradi. for qiymati input id qiymatiga mos bo‘lsin.',
      button: 'Amal bajaradigan tugma. Forma ichida tasodifiy yuborilmasligi uchun kerakli type qiymatini belgilang.',
      nav: 'Navigatsiya havolalarini guruhlaydi.',
      main: 'Sahifaning asosiy mazmunini bildiradi.',
      section: 'Bir mavzuga tegishli kontentni bo‘limga ajratadi.',
      footer: 'Sahifa yoki bo‘limning yakuniy ma’lumotlari uchun ishlatiladi.',
      div: 'O‘z-o‘zidan semantik ma’no bermaydigan umumiy konteyner; faqat mosroq semantik teg bo‘lmaganda ishlating.',
      li: 'Ro‘yxatning bitta elementi.',
      ul: 'Tartib raqamisiz ro‘yxat.',
      ol: 'Tartib raqami bilan ko‘rsatiladigan ro‘yxat.',
      table: 'Jadval ma’lumotlarini qator va ustunlarda ko‘rsatadi.',
      tr: 'Jadvalning bitta qatori.',
      th: 'Jadval sarlavha katagi.',
      td: 'Jadvaldagi oddiy ma’lumot katagi.'
    };
    if (details[tag]) return details[tag];
    if (/^<\//.test(source)) return `Yopuvchi teg: oldin ochilgan <${tag}> elementining ichki qismini tugatadi. Teglar to‘g‘ri juftlanishi muhim.`;
    return `HTML elementi: <${tag}> mazmunni sahifa tuzilmasiga qo‘shadi. Atributlari uning manzili, turi yoki qo‘shimcha xususiyatlarini belgilashi mumkin.`;
  }
  if (/^@media\b/.test(source)) return 'Media query: faqat shart mos kelganda (masalan, ekran kengligi yetarli bo‘lsa) ushbu CSS qoidalarini qo‘llaydi.';
  if (/^[.#:\[*a-z][^{]*\{\s*$/.test(source) && language === 'CSS') return 'CSS selektori: qaysi elementlarga quyidagi stil qoidalari ta’sir qilishini tanlaydi. Nuqta class, # esa id selektorini bildiradi.';
  if (/^\}/.test(source) && language === 'CSS') return 'CSS qoidasi yoki blokining oxiri. Ochilgan { bilan juft bo‘lishi kerak.';
  if (/^[a-z-]+\s*:\s*[^;]+;?$/i.test(source) && language === 'CSS') {
    const property = source.split(':')[0].trim();
    const meanings = {
      color: 'Matn rangini belgilaydi.',
      background: 'Elementning fonini belgilaydi.',
      'background-color': 'Elementning fon rangini belgilaydi.',
      display: 'Element qanday maket oqimida qatnashishini belgilaydi; flex va grid ko‘p ishlatiladi.',
      padding: 'Element ichidagi kontent bilan chegara orasidagi masofa.',
      margin: 'Element tashqarisidagi masofa; qo‘shni elementlardan ajratadi.',
      'font-size': 'Matn o‘lchamini belgilaydi.',
      'line-height': 'Matn qatorlari orasidagi balandlikni belgilab, o‘qilishni yaxshilaydi.',
      'justify-content': 'Flex yoki Grid konteynerida elementlarni asosiy yo‘nalish bo‘yicha taqsimlaydi.',
      'align-items': 'Elementlarni ko‘ndalang yo‘nalishda tekislaydi.',
      gap: 'Flex/Grid ichidagi elementlar orasidagi masofani belgilaydi.',
      position: 'Elementning joylashuv usulini belgilaydi.',
      'grid-template-columns': 'Grid ustunlari soni va o‘lchamlarini belgilaydi.',
      'box-sizing': 'Kenglik hisobiga padding va border kirish-kirmasligini boshqaradi.'
    };
    return `${property}: ${meanings[property] || 'CSS xususiyati.'} Ikki nuqtadan keyingi qiymat shu xususiyat qanday ko‘rinishini belgilaydi.`;
  }
  if (/^(import|from|using|package)\b/.test(source)) return 'Import/modul: boshqa fayl yoki kutubxonadagi kodni joriy faylda ishlatish uchun ulaydi. Paket nomi va import yo‘li loyiha sozlamasiga mos bo‘lishi kerak.';
  if (/^export\s+default\b/.test(source)) return 'Default export: faylning asosiy qiymatini boshqa fayllarga uzatadi; import qiluvchi nomni o‘zi tanlashi mumkin.';
  if (/^export\b/.test(source)) return 'Export: funksiya, class yoki qiymatni boshqa moduldan import qilish imkonini beradi.';
  if (/^(async\s+)?function\b/.test(source) || /^const\s+\w+\s*=\s*(async\s*)?\([^)]*\)\s*=>/.test(source) || /=>\s*\{?$/.test(source)) return 'Funksiya ta’rifi: nomlangan vazifa va uning bajariladigan kodini belgilaydi. Parametrlar kiruvchi qiymatlar, return esa qaytariladigan natija uchun ishlatiladi.';
  if (/^function\s+\w+\s*\(/.test(source)) return 'Funksiya ta’rifi: bu kodni keyin nomi orqali qayta chaqirish mumkin. Funksiya ishlashi uchun uni chaqirish ham kerak.';
  if (/^(if|else if|else|switch|case|when|match)\b|^if\s*\(/.test(source)) return 'Shartli tarmoq: shartga qarab qaysi kod bajarilishini tanlaydi. Chegaraviy qiymatlar va noto‘g‘ri ma’lumotlarni ham tekshiring.';
  if (/^(for\b|while\b|for\s*\(|for\s+\(|for\s+\w+\s+in\b)/.test(source) || /\.map\(|\.filter\(|\.forEach\(/.test(source)) return 'Takrorlash: ro‘yxatdagi qiymatlarni birma-bir ko‘rib chiqadi yoki ulardan yangi natija hosil qiladi. Bo‘sh ro‘yxat va elementlar sonini ham hisobga oling.';
  if (/^try\b/.test(source)) return 'try bloki: xato chiqishi mumkin bo‘lgan amalni o‘rab turadi. Mos catch/except qismi xatoni boshqarishi kerak.';
  if (/^(catch|except)\b/.test(source)) return 'Xatoni ushlash bloki: muvaffaqiyatsiz amal yuz bersa, dasturning butunlay to‘xtab qolishiga yo‘l qo‘ymasdan xabar yoki muqobil amal beradi.';
  if (/^return\b/.test(source)) return 'return: funksiya natijasini chaqirgan joyga qaytaradi va shu funksiyaning bajarilishini yakunlaydi.';
  if (/^await\b|=\s*await\b/.test(source)) return 'await: asinxron operatsiya tugashini kutadi. Odatda API yoki ma’lumotlar bazasiga murojaat qilishda ishlatiladi; xatoni ham boshqarish kerak.';
  if (/^const\b|^let\b|^var\b/.test(source)) return 'O‘zgaruvchi e’loni: keyin ishlatiladigan qiymatga nom beradi. Imkon bo‘lsa const, qiymatni qayta tayinlash zarur bo‘lsa let ishlating.';
  if (/^class\b|^interface\b|^type\b|^enum\b|^struct\b|^data class\b/.test(source)) return 'Ma’lumot modeli yoki class: bog‘liq maydonlar va qoidalarni bir joyga jamlaydi. Nomlar maqsadni aniq ifodalashi kerak.';
  if (/^@(?:Component|Service|RestController|GetMapping|PostMapping|Injectable)\b/.test(source)) return 'Framework annotatsiyasi/dekoratori: frameworkga keyingi class yoki metodning vazifasini bildiradi, masalan controller yoki service ekanini.';
  if (/app\.(get|post|put|patch|delete)\s*\(/i.test(source) || /@GetMapping|@PostMapping|Route::(get|post|put|patch|delete)/i.test(source)) return 'Backend route/endpoint: HTTP metod va URL’ni server funksiyasiga bog‘laydi. So‘rovdagi ma’lumotni tekshirish va mos status kodini qaytarish kerak.';
  if (/express\.json\(\)/.test(source)) return 'JSON middleware: kelgan JSON request body’ni JavaScript obyektiga aylantiradi. Bu middleware POST/PATCH so‘rovlaridan oldin ulanishi kerak.';
  if (/next\(\)/.test(source)) return 'next(): middleware zanjiridagi keyingi funksiyaga boshqaruvni uzatadi. next chaqirilmasa va javob ham yuborilmasa, so‘rov kutib qolishi mumkin.';
  if (/res\.status\(/.test(source)) return 'HTTP status kodini belgilaydi. Masalan 201 — yangi resurs yaratildi, 400 — noto‘g‘ri so‘rov, 404 — topilmadi, 500 — server ichki xatosi.';
  if (/res\.json\(/.test(source) || /response\.json\(\)/.test(source)) return 'JSON ma’lumot bilan ishlaydi: server javobni JSON shaklida yuboradi yoki kelgan JSON javobni JavaScript qiymatiga aylantiradi.';
  if (/\b(SELECT|INSERT|UPDATE|DELETE)\b/i.test(source)) return 'SQL so‘rovi: jadvaldan o‘qish yoki ma’lumot qo‘shish/o‘zgartirish/o‘chirishni bajaradi. Foydalanuvchi qiymatlarini stringga qo‘shib yubormang; parametrli so‘rov ishlating.';
  if (/localStorage\.(setItem|getItem|removeItem)/.test(source)) return 'LocalStorage: ma’lumotni shu brauzerda saqlaydi. U server yoki umumiy ma’lumotlar bazasi emas; maxfiy parol/tokenlarni unda saqlamang.';
  if (/JSON\.stringify/.test(source)) return 'JSON.stringify: obyekt yoki massivni LocalStorage kabi matn saqlaydigan joyga yozish uchun JSON matniga aylantiradi.';
  if (/JSON\.parse/.test(source)) return 'JSON.parse: JSON matnini yana JavaScript obyekt yoki massiviga aylantiradi. Saqlangan matn buzilgan bo‘lsa, xato yuz berishi mumkin.';
  if (/addEventListener/.test(source) || /onClick|onclick|on:click|\(click\)/.test(source)) return 'Hodisa tinglovchisi: foydalanuvchi harakati (masalan, tugma bosilishi) yuz berganda funksiyani bajaradi.';
  if (/querySelector/.test(source)) return 'DOM qidiruvi: CSS selektori orqali sahifadagi mos elementni topadi. Element topilmasligi mumkin bo‘lsa, null holatini tekshiring.';
  if (/textContent/.test(source)) return 'Elementning matnini o‘zgartiradi. Foydalanuvchi yuborgan matnni ko‘rsatishda innerHTML’dan ko‘ra textContent xavfsizroq.';
  if (/useState/.test(source)) return 'React state: komponentning o‘zgaruvchan qiymatini saqlaydi. Setter chaqirilganda React interfeysni qayta render qiladi.';
  if (/useEffect/.test(source)) return 'React effect: renderdan keyin API, document.title yoki boshqa tashqi tizim bilan bog‘liq ishni bajaradi. Dependency ro‘yxatini to‘g‘ri tanlang.';
  if (/\.value\b/.test(source) && language === 'VUE') return 'Vue reaktiv ref qiymati: script ichida ref ichidagi qiymat .value orqali olinadi yoki o‘zgartiriladi.';
  if (/^\s*<template\b/.test(source)) return 'Vue template: ekranda ko‘rinadigan markupni belgilaydi va reaktiv qiymatlarni chiqarishi mumkin.';
  if (/^\s*<script\b/.test(source)) return 'Script bloki: komponentning mantiqi, o‘zgaruvchilari, funksiyalari va importlari shu yerda yoziladi.';
  if (/^\s*<style\b/.test(source)) return 'Style bloki: komponent yoki sahifaning ko‘rinishini belgilaydigan CSS qoidalarini o‘z ichiga oladi.';
  if (/console\.log|print\(|println|echo\b/.test(source)) return 'Kuzatish/chiqarish: qiymatni konsolga yoki chiqish oqimiga chiqaradi. Debug qilishda foydali, ammo maxfiy ma’lumotni chiqarmang.';
  if (/=\s*[^=]/.test(source) || /:\s*[^:]/.test(source)) return 'Qiymat biriktirish: o‘zgaruvchi yoki obyekt maydoniga qiymat beradi. Chap tomonda nom/xususiyat, o‘ng tomonda berilayotgan qiymat turadi.';
  if (/^[})\]]/.test(source)) return 'Yopuvchi qavs: oldin ochilgan blok, funksiya, obyekt yoki massivni tugatadi. Qavslar mos kelishi sintaksis uchun muhim.';
  return 'Bu qator atrofidagi kod bilan birga ishlaydi. Avval qaysi qiymat yoki elementga ta’sir qilishini toping, keyin undan keyingi qatorlarda natija qayerda ishlatilishini kuzating.';
}
function renderCodeWalkthrough(lesson) {
  const language = codeLanguage(lesson.courseId, lesson.id);
  const codeLines = lesson.code.split('\n');
  const rows = codeLines.map((line, index) => ({
    line,
    index,
    previousLine: codeLines[index - 1] || '',
    nextLine: codeLines[index + 1] || ''
  })).filter(item => item.line.trim());
  return `<details class="code-walkthrough"><summary>Kodni qatorlar bo‘yicha tushuntirish (${rows.length} qator)</summary><p class="hint">Har bir qatorni yuqoridan pastga o‘qing. Ochuvchi qavs/blok keyingi qatorlarga ta’sir qiladi; qiymat e’lon qilingan joydan keyin qayerda ishlatilganini kuzating.</p><ol>${rows.map(({ line, index, previousLine, nextLine }) => `<li><span class="walkthrough-line-number">${index + 1}</span><div><code>${escapeHtml(line.trim())}</code><p>${escapeHtml(explainCodeLine(line, language, previousLine, nextLine))}</p></div></li>`).join('')}</ol><div class="learning-callout callout-blue"><span class="callout-icon" aria-hidden="true">✓</span><div><strong>Qanday mashq qilish kerak?</strong><p>Bir qiymatni o‘zgartirib, natijani qayta kuzating. Kod nima uchun ishlashini o‘z so‘zingiz bilan tushuntira olsangiz, mavzuni yaxshiroq o‘zlashtirgansiz.</p></div></div></details>`;
}
function playgroundPreset(lesson, course) {
  const title = escapeHtml(lesson.title);
  const safeText = 'Natija shu yerda ko‘rinadi.';
  const backendTracks = ['backend', 'backend-project', 'python', 'php', 'java', 'csharp', 'go', 'ruby', 'rust', 'kotlin'];
  let mode = 'interactive';
  let html = `<main class="demo"><span class="demo-label">DEVHUB · AMALIYOT</span><h1>${title}</h1><p id="demo-result">${safeText}</p><button id="demo-action">Sinab ko‘rish</button></main>`;
  let css = 'body{margin:0;padding:24px;background:#f3f7fc;color:#172033;font:16px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.demo{max-width:560px;margin:20px auto;padding:24px;border:1px solid #dce5f0;border-radius:16px;background:white;box-shadow:0 12px 32px #18335412}.demo-label{color:#0879ed;font-size:11px;font-weight:700;letter-spacing:1px}.demo h1{margin:12px 0;font-size:24px}.demo p{color:#5f6f82;line-height:1.6}button{border:0;border-radius:10px;padding:11px 16px;background:#0879ed;color:white;font:600 14px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:pointer}input{width:100%;box-sizing:border-box;margin:8px 0 14px;padding:11px;border:1px solid #ccd8e6;border-radius:8px;font:inherit}.demo-list{display:grid;gap:8px;margin:14px 0}.demo-item{padding:12px;border:1px solid #e1e8f0;border-radius:9px}.demo-result{margin-top:14px;padding:12px;background:#edf5ff;border-radius:8px;color:#1b426e}';
  let js = 'document.getElementById("demo-action").addEventListener("click", () => {\n  document.getElementById("demo-result").textContent = "Ajoyib! Kod brauzerda ishladi.";\n});';

  if (backendTracks.includes(course?.id)) {
    mode = 'server-simulation';
    html = `<main class="demo"><span class="demo-label">SO‘ROV / JAVOB SIMULYATSIYASI</span><h1>${title}</h1><label for="demo-input">Kurs nomi</label><input id="demo-input" value="${escapeHtml(course.title)}"><button id="demo-action">POST /api/courses</button><pre id="demo-result" class="demo-result">Javobni ko‘rish uchun so‘rov yuboring.</pre></main>`;
    js = 'document.getElementById("demo-action").addEventListener("click", () => {\n  const title = document.getElementById("demo-input").value.trim();\n  const result = title\n    ? { status: 201, body: { id: 1, title } }\n    : { status: 400, body: { error: "Kurs nomi majburiy" } };\n  document.getElementById("demo-result").textContent = JSON.stringify(result, null, 2);\n});';
    if (lesson.id.includes('sql')) {
      html = `<main class="demo"><span class="demo-label">SQL SO‘ROV SIMULYATSIYASI</span><h1>${title}</h1><label for="demo-input">Qidiruv</label><input id="demo-input" placeholder="Masalan: HTML"><button id="demo-action">SELECT bajarish</button><div id="demo-result" class="demo-list"></div></main>`;
      js = 'const sampleCourses = ["HTML asoslari", "CSS maketi", "JavaScript DOM", "Python API"];\ndocument.getElementById("demo-action").addEventListener("click", () => {\n  const query = document.getElementById("demo-input").value.toLowerCase();\n  const rows = sampleCourses.filter(name => name.toLowerCase().includes(query));\n  document.getElementById("demo-result").innerHTML = rows.length\n    ? rows.map(name => `<div class="demo-item">${name}</div>`).join("")\n    : `<div class="demo-item">Mos kurs topilmadi</div>`;\n});';
    }
  } else if (course?.id === 'javascript') {
    mode = 'interactive';
    if (/array|massiv|filter|map/i.test(`${lesson.title} ${lesson.id}`)) {
      html = `<main class="demo"><span class="demo-label">ARRAY · FILTER</span><h1>${title}</h1><label for="demo-input">Minimal ball: <strong id="demo-score">70</strong></label><input id="demo-input" type="range" min="0" max="100" value="70"><div id="demo-result" class="demo-list"></div></main>`;
      js = 'const students = [{ name: "Ali", score: 92 }, { name: "Malika", score: 68 }, { name: "Sardor", score: 81 }];\nconst input = document.getElementById("demo-input");\nfunction render() {\n  document.getElementById("demo-score").textContent = input.value;\n  const passed = students.filter(student => student.score >= Number(input.value));\n  document.getElementById("demo-result").innerHTML = passed.map(student => `<div class="demo-item">${student.name} · ${student.score} ball</div>`).join("") || "Hech kim mezonga mos kelmadi";\n}\ninput.addEventListener("input", render);\nrender();';
    } else if (/condition|shart|taqqoslash/i.test(`${lesson.title} ${lesson.id}`)) {
      html = `<main class="demo"><span class="demo-label">IF / ELSE</span><h1>${title}</h1><label for="demo-input">Test bali</label><input id="demo-input" type="range" min="0" max="100" value="72"><p>Ball: <strong id="demo-score">72</strong></p><div id="demo-result" class="demo-result"></div></main>`;
      js = 'const scoreInput = document.getElementById("demo-input");\nfunction checkScore() {\n  const score = Number(scoreInput.value);\n  document.getElementById("demo-score").textContent = score;\n  document.getElementById("demo-result").textContent = score >= 60 ? "O‘tdingiz! Keyingi mavzuga o‘ting." : "Yana mashq qiling, uddalaysiz.";\n}\nscoreInput.addEventListener("input", checkScore);\ncheckScore();';
    } else if (/function|funksiya|parametr/i.test(`${lesson.title} ${lesson.id}`)) {
      html = `<main class="demo"><span class="demo-label">FUNCTION · PARAMETER · RETURN</span><h1>${title}</h1><label for="demo-input">Ismingiz</label><input id="demo-input" value="Diyor"><button id="demo-action">Funksiyani chaqirish</button><p id="demo-result" class="demo-result">Funksiya natijasi shu yerda.</p></main>`;
      js = 'function greet(name) {\n  return `Salom, ${name}! Bugun kod yozishga tayyormisiz?`;\n}\ndocument.getElementById("demo-action").addEventListener("click", () => {\n  const name = document.getElementById("demo-input").value.trim() || "Dasturchi";\n  document.getElementById("demo-result").textContent = greet(name);\n});';
    } else {
      js = 'document.getElementById("demo-action").addEventListener("click", () => {\n  document.getElementById("demo-result").textContent = "DOM yangilandi: hodisa ishladi!";\n});';
    }
  } else if (course?.id === 'html5') {
    mode = 'interactive';
    if (/form|input/i.test(`${lesson.title} ${lesson.id}`)) {
      html = `<main class="demo"><span class="demo-label">SEMANTIK HTML · FORM</span><h1>${title}</h1><form id="demo-form"><label for="demo-input">Ismingiz</label><input id="demo-input" required placeholder="Ism kiriting"><button type="submit">Yuborish</button></form><p id="demo-result">Forma qiymatini yuborib ko‘ring.</p></main>`;
      js = 'document.getElementById("demo-form").addEventListener("submit", event => {\n  event.preventDefault();\n  const name = document.getElementById("demo-input").value.trim();\n  document.getElementById("demo-result").textContent = `Rahmat, ${name}! Forma to‘g‘ri yuborildi.`;\n});';
    } else if (/list|jadval|table|ro‘yxat/i.test(`${lesson.title} ${lesson.id}`)) {
      html = `<main class="demo"><span class="demo-label">HTML · RO‘YXAT</span><h1>${title}</h1><ol id="demo-result"><li>HTML tuzilmasi</li><li>Semantik teglar</li><li>Accessibility</li></ol><button id="demo-action">Yana bir band qo‘shish</button></main>`;
      js = 'let topicNumber = 3;\ndocument.getElementById("demo-action").addEventListener("click", () => {\n  topicNumber += 1;\n  const item = document.createElement("li");\n  item.textContent = `Yangi mavzu ${topicNumber}`;\n  document.getElementById("demo-result").append(item);\n});';
    }
  } else if (course?.id === 'css3') {
    mode = 'interactive';
    if (/grid|flex|layout|responsive|box model|position|maket/i.test(`${lesson.title} ${lesson.id}`)) {
      html = `<main class="demo"><span class="demo-label">CSS · RESPONSIVE GRID</span><h1>${title}</h1><button id="demo-action">Ustunlarni almashtirish</button><div id="demo-result" class="demo-list demo-grid"><div class="demo-item">HTML · tuzilma</div><div class="demo-item">CSS · maket</div><div class="demo-item">JS · xatti-harakat</div></div></main>`;
      css += '.demo-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.demo-grid.compact{grid-template-columns:1fr}';
      js = 'document.getElementById("demo-action").addEventListener("click", () => {\n  document.getElementById("demo-result").classList.toggle("compact");\n});';
    } else {
      html = `<main class="demo"><span class="demo-label">CSS · LIVE STYLE</span><h1>${title}</h1><label for="demo-input">Asosiy rang</label><input id="demo-input" type="color" value="#0a84ff"><div id="demo-result" class="demo-item">Rangni o‘zgartiring. Ushbu karta CSS custom property bilan bo‘yaladi.</div><button id="demo-action">Burchaklarni yumaloqlash</button></main>`;
      css += '.demo-item{transition:background .2s,border-radius .2s}';
      js = 'const color = document.getElementById("demo-input");\nconst card = document.getElementById("demo-result");\ncolor.addEventListener("input", () => { card.style.background = `${color.value}22`; card.style.borderColor = color.value; });\ndocument.getElementById("demo-action").addEventListener("click", () => {\n  card.style.borderRadius = card.style.borderRadius === "24px" ? "9px" : "24px";\n});';
    }
  } else if (/form|validatsiya|validation|input/i.test(`${lesson.title} ${lesson.id}`)) {
    mode = 'form';
    html = `<main class="demo"><span class="demo-label">INTERAKTIV FORMA</span><h1>${title}</h1><label for="demo-input">Email manzilingiz</label><input id="demo-input" type="email" placeholder="siz@example.com"><button id="demo-action">Tekshirish</button><p id="demo-result" aria-live="polite">${safeText}</p></main>`;
    js = 'document.getElementById("demo-action").addEventListener("click", () => {\n  const email = document.getElementById("demo-input").value.trim();\n  document.getElementById("demo-result").textContent = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)\n    ? "Email formati to‘g‘ri."\n    : "Iltimos, emailni tekshirib qayta kiriting.";\n});';
  } else if (/grid|flex|layout|responsive|box model|position|maket/i.test(`${lesson.title} ${lesson.id}`)) {
    mode = 'layout';
    html = `<main class="demo"><span class="demo-label">MAKET LABORATORIYASI</span><h1>${title}</h1><button id="demo-action">Ustunlarni almashtirish</button><div id="demo-result" class="demo-list demo-grid"><div class="demo-item">HTML · tuzilma</div><div class="demo-item">CSS · maket</div><div class="demo-item">JS · xatti-harakat</div></div></main>`;
    css += '.demo-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.demo-grid.compact{grid-template-columns:1fr}';
    js = 'document.getElementById("demo-action").addEventListener("click", () => {\n  document.getElementById("demo-result").classList.toggle("compact");\n});';
  } else if (/list|array|collection|loop|ro‘yxat|massiv|filter|vazifa/i.test(`${lesson.title} ${lesson.id}`)) {
    mode = 'list';
    html = `<main class="demo"><span class="demo-label">RO‘YXAT LABORATORIYASI</span><h1>${title}</h1><label for="demo-input">Yangi vazifa</label><input id="demo-input" placeholder="Masalan: mavzuni takrorlash"><button id="demo-action">Ro‘yxatga qo‘shish</button><div id="demo-result" class="demo-list"><div class="demo-item">Birinchi vazifani bajaring</div></div></main>`;
    js = 'document.getElementById("demo-action").addEventListener("click", () => {\n  const input = document.getElementById("demo-input");\n  const title = input.value.trim();\n  if (!title) return;\n  const item = document.createElement("div");\n  item.className = "demo-item";\n  item.textContent = title;\n  document.getElementById("demo-result").append(item);\n  input.value = "";\n});';
  } else if (/component|props|state|event|hook|ref|store|hodisa|counter|hisoblagich|route|routing/i.test(`${lesson.title} ${lesson.id}`)) {
    mode = 'component';
    html = `<main class="demo"><span class="demo-label">KOMPONENT SIMULYATSIYASI</span><h1>${title}</h1><p id="demo-result">Tanlangan darslar: <strong>0</strong></p><button id="demo-action">Tanlash</button></main>`;
    js = 'let selected = 0;\ndocument.getElementById("demo-action").addEventListener("click", () => {\n  selected += 1;\n  document.querySelector("#demo-result strong").textContent = selected;\n});';
  }

  const label = mode === 'server-simulation' ? 'Server simulyatsiyasi' : mode === 'component' ? 'Interaktiv konsept namoyishi' : 'Brauzerda ishga tushadigan namuna';
  const note = mode === 'server-simulation'
    ? 'Backend tilining o‘zi brauzerda server bo‘lib ishga tushmaydi. Bu namuna HTTP/SQL mantiqini xavfsiz brauzer simulyatsiyasida sinaydi.'
    : ['react', 'typescript', 'vue', 'angular', 'svelte', 'nextjs'].includes(course?.id)
      ? 'Bu interaktiv namoyish framework g‘oyasini brauzerda sodda JavaScript bilan ko‘rsatadi; yuqoridagi framework kodi esa o‘sha tilning namunasi.'
      : 'Misolni o‘zgartirib, ishga tushiring. Natija xavfsiz sandbox ichida ko‘rinadi.';
  return { html, css, js, label, note };
}
function playgroundDocument(html, css, js) {
  const safeScript = String(js).replace(/<\/script/gi, '<\\/script');
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; form-action 'none'; base-uri 'none'"><style>${css}</style></head><body>${html}<script>${safeScript}<\/script></body></html>`;
}
function renderPlayground(lesson, course) {
  const preset = playgroundPreset(lesson, course);
  const formattedHtml = formatCodeExample(preset.html, 'HTML');
  const formattedCss = formatCodeExample(preset.css, 'CSS');
  return `<details class="lesson-playground"><summary class="playground-summary"><span class="playground-summary-icon" aria-hidden="true">▶</span><span><strong>Amaliyot: kodni sinab ko‘rish</strong><small>${preset.label}</small></span><span class="playground-chevron" aria-hidden="true">+</span></summary><div class="playground-body"><p class="playground-note">${preset.note}</p><div class="playground-preview-wrap"><iframe id="playground-preview" title="${escapeHtml(lesson.title)} interaktiv kodi" sandbox="allow-scripts" loading="lazy"></iframe></div><details class="playground-source"><summary>Kod tahrirlash</summary><div class="playground-code-tabs" role="group" aria-label="Kod tilini tanlang"><button type="button" class="playground-code-tab active" aria-pressed="true" aria-controls="playground-code-html" data-playground-tab="html">HTML</button><button type="button" class="playground-code-tab" aria-pressed="false" aria-controls="playground-code-css" data-playground-tab="css">CSS</button><button type="button" class="playground-code-tab" aria-pressed="false" aria-controls="playground-code-js" data-playground-tab="js">JavaScript</button></div><div class="playground-editors"><div class="playground-editor-panel" id="playground-code-html" data-source-panel="html"><pre class="playground-highlight" data-playground-highlight="html" aria-hidden="true"></pre><textarea class="playground-code" data-playground-code="html" aria-label="HTML kodi" spellcheck="false">${escapeHtml(formattedHtml)}</textarea></div><div class="playground-editor-panel" id="playground-code-css" data-source-panel="css" hidden><pre class="playground-highlight" data-playground-highlight="css" aria-hidden="true"></pre><textarea class="playground-code" data-playground-code="css" aria-label="CSS kodi" spellcheck="false">${escapeHtml(formattedCss)}</textarea></div><div class="playground-editor-panel" id="playground-code-js" data-source-panel="js" hidden><pre class="playground-highlight" data-playground-highlight="js" aria-hidden="true"></pre><textarea class="playground-code" data-playground-code="js" aria-label="JavaScript kodi" spellcheck="false">${escapeHtml(preset.js)}</textarea></div></div></details><div class="playground-actions"><button class="button primary" data-action="run-playground">▶ Ishga tushirish</button><button class="button quiet" data-action="reset-playground">Namunani tiklash</button><span class="playground-shortcut">Enter · yangi qator va indent &nbsp;|&nbsp; Ctrl+Enter · boshidan ishga tushirish</span></div></div></details>`;
}
function refreshPlaygroundPreview() {
  const frame = document.querySelector('#playground-preview');
  if (!frame) return;
  ['html', 'css', 'js'].forEach(syncPlaygroundEditor);
  const values = Object.fromEntries(['html', 'css', 'js'].map(type => [type, document.querySelector(`[data-playground-code="${type}"]`)?.value || '']));
  frame.srcdoc = playgroundDocument(values.html, values.css, values.js);
}
function currentUser() { return session && users.find(user => user.id === session.userId); }
function allLessons() { return courses.flatMap(course => course.lessons.map(lesson => ({ ...lesson, courseId: course.id, courseTitle: course.title }))); }
function notify(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

syncStarterCatalog();
expandedCourseId = courses[0]?.id || null;
if (!users.some(user => user.email === 'admin@devhub.com')) {
  users.push({ id: 'admin', name: 'DevHub Admin', email: 'admin@devhub.com', password: 'admin123', role: 'admin', completed: [] });
  saveUsers();
}
if (localStorage.getItem(STORAGE.theme) === 'light') document.body.classList.add('light');
document.querySelector('meta[name="theme-color"]').content = document.body.classList.contains('light') ? '#ffffff' : '#081321';

function render() {
  const user = currentUser();
  document.querySelector('#app').innerHTML = user ? renderWorkspace(user) : renderAuth();
  refreshPlaygroundPreview();
}
function renderAuth() {
  const register = authMode === 'register';
  return `<main class="auth-screen">
    <section class="auth-intro"><div class="brand"><span class="brand-mark">&lt;/&gt;</span> DevHub</div><div class="intro-copy"><span class="eyebrow">BILIMDAN MAHORATGACHA</span><h1>Kodingizga<br>yo‘l oching.</h1><p>O‘zbek tilidagi sodda darslar va kichik amaliyotlar bilan dasturlashni o‘zingizga qulay tezlikda o‘rganing.</p></div><div class="intro-foot">© 2026 DevHub Learning</div></section>
    <section class="auth-panel"><div class="auth-panel-inner"><form class="auth-box" id="auth-form"><span class="eyebrow">DEVHUB PLATFORMASI</span><h2>${register ? 'Hisob yarating' : 'Xush kelibsiz'}</h2><p>${register ? 'O‘rganishni boshlash uchun ma’lumotlaringizni kiriting.' : 'Hisobingizga kirib, o‘rganishni davom ettiring.'}</p>
      ${register ? '<div class="field"><label for="name">Ism</label><input id="name" name="name" autocomplete="name" required maxlength="60" placeholder="Ismingiz"></div>' : ''}
      <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="siz@example.com"></div>
      <div class="field"><label for="password">Parol</label><input id="password" name="password" type="password" autocomplete="${register ? 'new-password' : 'current-password'}" required minlength="${register ? '6' : '1'}" placeholder="${register ? 'Kamida 6 ta belgi' : 'Parolingiz'}"></div>
      <button class="button primary wide" type="submit">${register ? 'Ro‘yxatdan o‘tish' : 'Kirish'}</button>
      <div class="auth-switch">${register ? 'Hisobingiz bormi?' : 'Hali hisobingiz yo‘qmi?'} <button class="link-button" type="button" data-action="auth-switch">${register ? 'Kirish' : 'Ro‘yxatdan o‘tish'}</button></div>
    </form><footer class="site-footer auth-site-footer"><span>© 2026 DevHub</span><span>O‘rganish · amaliyot · rivojlanish</span></footer></div></section>
  </main>`;
}
function renderWorkspace(user) {
  const isAdmin = user.role === 'admin';
  const title = view === 'admin' ? 'Boshqaruv paneli' : view === 'lesson' ? 'Dars' : view === 'courses' ? 'Barcha darsliklar' : 'O‘quv paneli';
  const isLight = document.body.classList.contains('light');
  return `<div class="app-shell"><aside class="sidebar ${sidebarOpen ? 'open' : ''}" id="sidebar"><div class="brand"><span class="brand-mark">&lt;/&gt;</span> DevHub</div>
    <div class="sidebar-scroll"><div class="nav-label">MENYU</div>
    <button class="nav-item ${view === 'home' ? 'active' : ''}" data-view="home"><span class="nav-symbol">⌂</span> ${isAdmin ? 'Umumiy ko‘rinish' : 'Bosh sahifa'}</button>
    <button class="nav-item ${view === 'courses' || view === 'lesson' ? 'active' : ''}" data-view="courses"><span class="nav-symbol">▤</span> Barcha darsliklar</button>
    <div class="nav-label courses-label">KURSLAR</div>${renderSidebarCourses(user)}
    ${isAdmin ? '<div class="nav-label">BOSHQARUV</div><button class="nav-item ' + (view === 'admin' ? 'active' : '') + '" data-view="admin"><span class="nav-symbol">⚙</span> Admin panel</button>' : ''}</div>
    <div class="sidebar-bottom"><div class="profile"><div class="avatar">${escapeHtml(user.name.charAt(0).toUpperCase())}</div><div class="profile-copy"><strong>${escapeHtml(user.name)}</strong><span>${isAdmin ? 'Administrator' : 'Talaba'}</span></div></div><button class="nav-item" data-action="logout"><span class="nav-symbol">↪</span> Chiqish</button></div>
  </aside><section class="workspace"><header class="topbar"><div class="topbar-actions"><button class="icon-button mobile-nav-toggle" data-action="menu" aria-label="Menyuni ochish">☰</button><div class="brand mobile-brand"><span class="brand-mark">&lt;/&gt;</span> DevHub</div></div><div class="topbar-title">${title}</div><div class="topbar-actions"><button class="icon-button theme-toggle" data-action="theme" title="${isLight ? 'Qorong‘i fonni yoqish' : 'Oq fonni yoqish'}" aria-label="${isLight ? 'Qorong‘i fonni yoqish' : 'Oq fonni yoqish'}">${isLight ? '☾' : '☼'}</button></div></header><main class="content">${renderView(user)}</main><footer class="site-footer"><span>© 2026 DevHub</span><span>O‘zbek tilida o‘rganing, amalda sinab ko‘ring</span><a href="#top" data-action="scroll-top">Yuqoriga ↑</a></footer></section></div>${renderModal()}`;
}
function renderSidebarCourses(user) {
  const openCourseId = expandedCourseId;
  return courses.map(course => {
    const expanded = course.id === openCourseId;
    const completed = course.lessons.filter(lesson => (user.completed || []).includes(lesson.id)).length;
    return `<section class="sidebar-course"><button class="sidebar-course-toggle ${expanded ? 'expanded' : ''}" data-course-toggle="${escapeHtml(course.id)}" aria-expanded="${expanded}" aria-controls="sidebar-lessons-${escapeHtml(course.id)}">${courseIcon(course, 'sidebar-course-icon')}<span class="sidebar-course-name">${escapeHtml(course.title)}</span><span class="sidebar-course-progress">${completed}/${course.lessons.length}</span><span class="sidebar-chevron" aria-hidden="true">${expanded ? '−' : '+'}</span></button>${expanded ? `<div class="sidebar-lessons" id="sidebar-lessons-${escapeHtml(course.id)}">${course.lessons.map((lesson, index) => `<button class="sidebar-lesson ${selectedLesson === lesson.id ? 'selected' : ''}" data-lesson="${escapeHtml(lesson.id)}"><span class="sidebar-lesson-number">${String(index + 1).padStart(2, '0')}</span><span class="sidebar-lesson-title">${escapeHtml(lesson.title)}</span>${(user.completed || []).includes(lesson.id) ? '<span class="sidebar-lesson-done" aria-label="Tugatilgan">✓</span>' : ''}</button>`).join('')}</div>` : ''}</section>`;
  }).join('');
}
function renderView(user) {
  if (view === 'admin' && user.role === 'admin') return renderAdmin();
  if (view === 'lesson') return renderLesson(user);
  if (view === 'courses') return renderCourses(user);
  return renderHome(user);
}
function completion(user) {
  const lessons = allLessons();
  const done = lessons.filter(lesson => (user.completed || []).includes(lesson.id)).length;
  return { done, total: lessons.length, percent: lessons.length ? Math.round(done / lessons.length * 100) : 0 };
}
function renderProgress(user) {
  const progress = completion(user);
  return `<div class="progress-panel"><strong>O‘rganish jarayoni</strong><span>${progress.done} / ${progress.total} dars · ${progress.percent}%</span><div class="progress-track"><div class="progress-fill" style="width:${progress.percent}%"></div></div></div>`;
}
function renderHome(user) {
  if (user.role === 'admin') return `<div class="welcome-row"><div><span class="eyebrow">ADMINISTRATOR</span><h1>Salom, ${escapeHtml(user.name)}.</h1><p>Platformadagi darslar va o‘quvchilarni boshqaring.</p></div><button class="button primary" data-view="admin">Boshqaruv paneli →</button></div>${renderStats()}<div class="section-heading"><h2>Darsliklar</h2><span>${courses.length} yo‘nalish</span></div>${renderCourseGrid(user)}`;
  return `<section class="catalog-hero"><div class="catalog-hero-copy"><span class="eyebrow">DEVHUB · O‘ZBEK TILIDA IT TA’LIM</span><h1>Bilimni o‘rganing.<br>Natijani yarating.</h1><p>Frontend va backend yo‘nalishlarida tartibli darslar, amaliy kod va o‘z loyihangiz bilan rivojlaning.</p><div class="catalog-hero-tags"><span>Frontend</span><span>Backend</span><span>Real amaliyot</span></div></div><div class="catalog-hero-mark" aria-hidden="true">&lt;/&gt;</div></section>${renderProgress(user)}<div class="section-heading catalog-section-heading"><div><h2>O‘zingizga mos kursni tanlang</h2><span>${courses.length} ta yo‘nalish · bosqichma-bosqich o‘rganish</span></div></div>${renderCourseGrid(user)}`;
}
const COURSE_CATEGORIES = [
  { id: 'all', label: 'Barcha kurslar' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'roadmap', label: 'Yo‘l xaritasi' }
];
const BACKEND_COURSE_IDS = new Set(['backend', 'backend-project', 'python', 'php', 'java', 'csharp', 'go', 'ruby', 'rust', 'kotlin']);
const FRONTEND_COURSE_IDS = new Set(['html5', 'css3', 'javascript', 'react', 'typescript', 'vue', 'angular', 'svelte', 'nextjs']);
const COURSE_STACKS = {
  html5: 'HTML · Semantika · Formlar', css3: 'CSS · Flexbox · Grid · Responsive', javascript: 'JavaScript · DOM · API', react: 'React · JSX · Hooks',
  roadmap: 'HTML · CSS · JS · Git · Portfolio', backend: 'Node.js · Express · REST · SQL',
  typescript: 'TypeScript · Types · Generics', vue: 'Vue · Components · Reactivity', angular: 'Angular · TypeScript · Services',
  svelte: 'Svelte · Stores · SvelteKit', nextjs: 'Next.js · React · Server rendering',
  python: 'Python · FastAPI · PostgreSQL', php: 'PHP · Laravel · Eloquent', java: 'Java · Spring Boot · JPA',
  csharp: 'C# · ASP.NET Core · EF Core', go: 'Go · net/http · Goroutines', ruby: 'Ruby · Rails · Active Record',
  rust: 'Rust · Axum · Tokio', kotlin: 'Kotlin · Ktor · Coroutines',
  'backend-project': 'Node.js · Express · PostgreSQL · Auth · Tests'
};
function courseCategory(course) {
  if (BACKEND_COURSE_IDS.has(course.id)) return 'backend';
  if (FRONTEND_COURSE_IDS.has(course.id)) return 'frontend';
  if (course.id === 'roadmap') return 'roadmap';
  return 'other';
}
function visibleCourses() {
  const query = courseSearch.trim().toLocaleLowerCase('uz');
  return courses.filter(course => {
    const categoryMatches = courseFilter === 'all' || courseCategory(course) === courseFilter;
    const searchable = `${course.title} ${course.description} ${course.level} ${COURSE_STACKS[course.id] || ''}`.toLocaleLowerCase('uz');
    return categoryMatches && (!query || searchable.includes(query));
  });
}
function renderCourseCards(courseList, user) {
  if (!courseList.length) return '<div class="empty-state course-empty">Bu qidiruvga mos kurs topilmadi. Boshqa so‘z bilan qidiring.</div>';
  return `<div class="course-grid">${courseList.map((course, index) => {
    const done = course.lessons.filter(lesson => (user.completed || []).includes(lesson.id)).length;
    const percent = course.lessons.length ? Math.round(done / course.lessons.length * 100) : 0;
    const category = courseCategory(course);
    const categoryLabel = COURSE_CATEGORIES.find(item => item.id === category)?.label || 'Maxsus kurs';
    return `<article class="course-card course-card-${category}" style="--card-index:${index}"><div class="course-top">${courseIcon(course)}<span class="badge">${escapeHtml(course.level)}</span></div><span class="course-category-label">${categoryLabel}</span><h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(course.description)}</p><span class="course-stack">${escapeHtml(COURSE_STACKS[course.id] || 'Amaliy dasturlash')}</span><div class="course-card-progress"><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div><span>${done}/${course.lessons.length} dars</span></div><button class="course-open" data-course-open="${escapeHtml(course.id)}">Kurs dasturini ko‘rish <span aria-hidden="true">→</span></button></article>`;
  }).join('')}</div>`;
}
function renderCourseGrid(user) {
  if (!courses.length) return '<div class="empty-state">Hozircha darsliklar mavjud emas.</div>';
  const matchingCourses = visibleCourses();
  return `<section class="course-catalog"><div class="course-catalog-toolbar"><label class="course-search"><span aria-hidden="true">⌕</span><input type="search" data-course-search placeholder="Kurs yoki texnologiyani qidiring" value="${escapeHtml(courseSearch)}" aria-label="Kurs qidirish"><kbd>/</kbd></label><div class="course-filter-list" role="group" aria-label="Kurs turini tanlang">${COURSE_CATEGORIES.map(category => `<button type="button" class="course-filter ${courseFilter === category.id ? 'active' : ''}" data-course-filter="${category.id}" aria-pressed="${courseFilter === category.id}">${category.label}<span>${category.id === 'all' ? courses.length : courses.filter(course => courseCategory(course) === category.id).length}</span></button>`).join('')}</div></div><div class="course-results-heading"><strong id="course-result-count">${matchingCourses.length} ta kurs</strong><span>Har bir kursda darslar, kod namunasi va amaliy vazifalar bor</span></div><div id="course-results">${renderCourseCards(matchingCourses, user)}</div></section>`;
}
function renderCourses(user) {
  return `<div class="welcome-row"><div><span class="eyebrow">KURS KATALOGI</span><h1>Barcha darsliklar</h1><p>Asosiy tushunchalardan amaliy loyihalargacha.</p></div></div>${user.role === 'student' ? renderProgress(user) : ''}${renderCourseGrid(user)}`;
}
function renderLesson(user) {
  const lesson = allLessons().find(item => item.id === selectedLesson);
  if (!lesson) return '<div class="empty-state">Dars topilmadi. <button class="link-button" data-view="courses">Darsliklarga qaytish</button></div>';
  const course = courses.find(item => item.id === lesson.courseId);
  const courseLessons = course?.lessons || [lesson];
  const lessonIndex = Math.max(0, courseLessons.findIndex(item => item.id === lesson.id));
  const previousLesson = courseLessons[lessonIndex - 1];
  const nextLesson = courseLessons[lessonIndex + 1];
  const done = (user.completed || []).includes(lesson.id);
  const video = lesson.videoUrl && /^https:\/\//i.test(lesson.videoUrl) ? `<iframe src="${escapeHtml(lesson.videoUrl)}" title="${escapeHtml(lesson.title)}" allowfullscreen loading="lazy"></iframe>` : `<div class="play-mark">▶</div><span class="video-caption">VIDEO DARSI · TEZ ORADA</span>`;
  return `<div class="welcome-row"><div>
    <button class="link-button" data-view="courses">← Darsliklarga qaytish</button>
    <p>${escapeHtml(course?.title || '')}</p>
  </div></div>
  <div class="lesson-layout">
    <article class="lesson-main">
      <div class="video-placeholder">${video}</div>
      <div class="lesson-body">
        <span class="eyebrow">${escapeHtml(course?.title || 'Dars')}</span>
        <h1>${escapeHtml(lesson.title)}</h1>
        ${renderLessonGuide(lesson, course)}
        <h3>Amaliy kod</h3>
        ${renderCodeEditor(lesson, course?.id || '')}
        ${renderCodeWalkthrough(lesson)}
        <div class="learning-callout callout-amber"><span class="callout-icon" aria-hidden="true">✦</span><div><strong>ENDI SINAB KO‘RING</strong><p>${escapeHtml(lesson.task)}</p></div></div>
        ${renderPlayground(lesson, course)}
        <button class="button ${done ? '' : 'primary'}" data-action="complete" data-lesson-id="${escapeHtml(lesson.id)}">${done ? '✓ Tugatildi' : 'Darsni tugatdim'}</button>
        <nav class="lesson-navigation" aria-label="Darslar orasida o‘tish">
          <button class="button lesson-nav-button" data-lesson="${escapeHtml(previousLesson?.id || '')}" ${previousLesson ? '' : 'disabled'}><span aria-hidden="true">←</span><span>Oldingi mavzu</span></button>
          <span class="lesson-position">${lessonIndex + 1} / ${courseLessons.length} mavzu</span>
          <button class="button primary lesson-nav-button" data-lesson="${escapeHtml(nextLesson?.id || '')}" ${nextLesson ? '' : 'disabled'}><span>Keyingi mavzu</span><span aria-hidden="true">→</span></button>
        </nav>
      </div>
    </article>
    <aside class="lesson-aside">
      <h3>Bilimingizni tekshiring</h3>
      <p>${escapeHtml(lesson.quiz.question)}</p>
      ${lesson.quiz.options.map((option, index) => `<button class="quiz-option ${quizChoice === index ? 'selected' : ''}" data-quiz-choice="${index}">${escapeHtml(option)}</button>`).join('')}
      <div class="quiz-feedback" id="quiz-feedback"></div>
      <button class="button primary" data-action="check-quiz">Javobni tekshirish</button>
    </aside>
  </div>`;
}
function renderStats() {
  const students = users.filter(user => user.role === 'student').length;
  return `<div class="stats-grid"><div class="stat-card"><span>Jami darsliklar</span><strong>${courses.length}</strong></div><div class="stat-card"><span>Jami darslar</span><strong>${allLessons().length}</strong></div><div class="stat-card"><span>Ro‘yxatdan o‘tgan talabalar</span><strong>${students}</strong></div></div>`;
}
function renderAdmin() {
  const rows = allLessons();
  return `<div class="welcome-row"><div><span class="eyebrow">TIZIM NAZORATI</span><h1>Boshqaruv paneli</h1><p>Kontent va foydalanuvchilarni bir joydan boshqaring.</p></div><button class="button primary" data-action="add-lesson">＋ Dars qo‘shish</button></div>${renderStats()}<div class="section-heading"><h2>Darslar</h2><span>${rows.length} ta dars</span></div>${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Dars nomi</th><th>Darslik</th><th>Amallar</th></tr></thead><tbody>${rows.map(lesson => `<tr><td>${escapeHtml(lesson.title)}</td><td>${escapeHtml(lesson.courseTitle)}</td><td><button class="button" data-action="edit-lesson" data-lesson-id="${escapeHtml(lesson.id)}">Tahrirlash</button><button class="button danger" data-action="delete-lesson" data-lesson-id="${escapeHtml(lesson.id)}">O‘chirish</button></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">Hali dars qo‘shilmagan.</div>'}<div class="section-heading"><h2>Foydalanuvchilar</h2><span>${users.length} ta hisob</span></div><div class="table-wrap"><table><thead><tr><th>Ism</th><th>Email</th><th>Rol</th><th>Tugallangan dars</th></tr></thead><tbody>${users.map(item => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.email)}</td><td>${item.role === 'admin' ? 'Admin' : 'Talaba'}</td><td>${(item.completed || []).length}</td></tr>`).join('')}</tbody></table></div>`;
}
function renderModal() {
  const modal = document.querySelector('#lesson-modal-data');
  if (!modal) return '';
  const lesson = modal.lesson || {};
  const quiz = lesson.quiz || { question: '', options: ['', '', ''], answer: 0 };
  const options = [...(quiz.options || []), '', '', ''].slice(0, 3);
  return `<div class="modal-backdrop" data-action="modal-backdrop"><form class="modal" id="lesson-form"><div class="modal-head"><h2>${modal.lesson ? 'Darsni tahrirlash' : 'Yangi dars qo‘shish'}</h2><button type="button" class="icon-button" data-action="close-modal" aria-label="Yopish">×</button></div><div class="field"><label>Darslik</label><select name="courseId" required>${courses.map(course => `<option value="${escapeHtml(course.id)}" ${course.id === modal.courseId ? 'selected' : ''}>${escapeHtml(course.title)}</option>`).join('')}</select></div><div class="field"><label>Dars nomi</label><input name="title" required maxlength="100" value="${escapeHtml(lesson.title || '')}"></div><div class="field"><label>Dars matni</label><textarea name="summary" required>${escapeHtml(lesson.summary || '')}</textarea></div><div class="field"><label>Kod namunasi</label><textarea name="code" required>${escapeHtml(lesson.code || '')}</textarea></div><div class="field"><label>Amaliy topshiriq</label><textarea name="task" required>${escapeHtml(lesson.task || '')}</textarea></div><div class="field"><label>Video embed URL (ixtiyoriy)</label><input name="videoUrl" type="url" value="${escapeHtml(lesson.videoUrl || '')}" placeholder="https://www.youtube.com/embed/..."><span class="hint">Faqat HTTPS embed manzillari ko‘rsatiladi.</span></div><div class="field"><label>Test savoli</label><input name="question" required value="${escapeHtml(quiz.question)}"></div>${options.map((option, index) => `<div class="field"><label>${index + 1}-javob varianti</label><input name="option${index}" required value="${escapeHtml(option)}"></div>`).join('')}<div class="field"><label>To‘g‘ri javob raqami (1–3)</label><select name="answer"><option value="0" ${quiz.answer === 0 ? 'selected' : ''}>1</option><option value="1" ${quiz.answer === 1 ? 'selected' : ''}>2</option><option value="2" ${quiz.answer === 2 ? 'selected' : ''}>3</option></select></div><div class="modal-actions"><button type="button" class="button" data-action="close-modal">Bekor qilish</button><button class="button primary" type="submit">Saqlash</button></div></form></div>`;
}

// One delegated listener handles controls that are recreated during each render.
document.addEventListener('click', event => {
  const target = event.target.closest('[data-action], [data-view], [data-lesson], [data-quiz-choice], [data-course-toggle], [data-course-open], [data-playground-tab], [data-course-filter]');
  if (!target) return;
  if (target.dataset.courseFilter) {
    courseFilter = target.dataset.courseFilter;
    const search = document.querySelector('[data-course-search]');
    courseSearch = search?.value || courseSearch;
    render();
    return;
  }
  if (target.dataset.playgroundTab) {
    const activeTab = target.dataset.playgroundTab;
    document.querySelectorAll('[data-playground-tab]').forEach(tab => {
      const selected = tab.dataset.playgroundTab === activeTab;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-source-panel]').forEach(panel => { panel.hidden = panel.dataset.sourcePanel !== activeTab; });
    return;
  }
  if (target.dataset.courseToggle) {
    expandedCourseId = expandedCourseId === target.dataset.courseToggle ? null : target.dataset.courseToggle;
    render();
    return;
  }
  if (target.dataset.courseOpen) {
    expandedCourseId = target.dataset.courseOpen;
    view = 'courses';
    render();
    return;
  }
  if (target.dataset.view) { view = target.dataset.view; sidebarOpen = false; quizChoice = null; document.querySelector('#lesson-modal-data')?.remove(); render(); return; }
  if (target.dataset.lesson) { selectedLesson = target.dataset.lesson; expandedCourseId = allLessons().find(lesson => lesson.id === selectedLesson)?.courseId || expandedCourseId; sidebarOpen = false; view = 'lesson'; quizChoice = null; render(); return; }
  if (target.dataset.quizChoice !== undefined) { quizChoice = Number(target.dataset.quizChoice); render(); return; }
  const action = target.dataset.action;
  const user = currentUser();
  if (action === 'auth-switch') { authMode = authMode === 'login' ? 'register' : 'login'; render(); }
  if (action === 'logout') { session = null; saveSession(); view = 'home'; render(); }
  if (action === 'theme') {
    document.body.classList.toggle('light');
    const lightTheme = document.body.classList.contains('light');
    localStorage.setItem(STORAGE.theme, lightTheme ? 'light' : 'dark');
    document.querySelector('meta[name="theme-color"]').content = lightTheme ? '#ffffff' : '#081321';
    render();
  }
  if (action === 'menu') { sidebarOpen = !sidebarOpen; render(); }
  if (action === 'scroll-top') window.scrollTo({ top: 0, behavior: 'smooth' });
  if (action === 'run-playground') { refreshPlaygroundPreview(); notify('Namuna sandbox’da ishga tushdi.'); }
  if (action === 'reset-playground') render();
  if (action === 'complete' && user) {
    user.completed ||= [];
    if (!user.completed.includes(target.dataset.lessonId)) user.completed.push(target.dataset.lessonId);
    saveUsers(); render(); notify('Dars tugallangan deb belgilandi.');
  }
  if (action === 'check-quiz') {
    const lesson = allLessons().find(item => item.id === selectedLesson);
    const feedback = document.querySelector('#quiz-feedback');
    if (!lesson || quizChoice === null) { if (feedback) feedback.textContent = 'Avval javob variantini tanlang.'; }
    else if (feedback) feedback.textContent = quizChoice === lesson.quiz.answer ? 'To‘g‘ri javob! Ajoyib.' : 'Bu safar xato. Yana bir bor urinib ko‘ring.';
  }
  if (action === 'add-lesson') {
    if (!courses.length) return notify('Avval darslik bo‘lishi kerak.');
    document.querySelector('#lesson-modal-data')?.remove();
    const data = document.createElement('div'); data.id = 'lesson-modal-data'; data.lesson = null; data.courseId = courses[0].id; document.body.append(data); render();
  }
  if (action === 'edit-lesson') {
    const lesson = allLessons().find(item => item.id === target.dataset.lessonId);
    if (!lesson) return;
    const data = document.createElement('div'); data.id = 'lesson-modal-data'; data.lesson = lesson; data.courseId = lesson.courseId; document.body.append(data); render();
  }
  if (action === 'delete-lesson') {
    if (!confirm('Ushbu darsni o‘chirmoqchimisiz?')) return;
    const id = target.dataset.lessonId;
    courses = courses.map(course => ({ ...course, lessons: course.lessons.filter(lesson => lesson.id !== id) }));
    users.forEach(item => { item.completed = (item.completed || []).filter(doneId => doneId !== id); });
    saveCourses(); saveUsers(); render(); notify('Dars o‘chirildi.');
  }
  if (action === 'close-modal' || (action === 'modal-backdrop' && event.target === target)) { document.querySelector('#lesson-modal-data')?.remove(); render(); }
});

document.addEventListener('input', event => {
  const search = event.target.closest('[data-course-search]');
  if (search) {
    courseSearch = search.value;
    const results = document.querySelector('#course-results');
    const count = document.querySelector('#course-result-count');
    if (results) results.innerHTML = renderCourseCards(visibleCourses(), currentUser());
    if (count) count.textContent = `${visibleCourses().length} ta kurs`;
    return;
  }
  const editor = event.target.closest('[data-playground-code]');
  if (editor) syncPlaygroundEditor(editor.dataset.playgroundCode);
});

document.addEventListener('scroll', event => {
  const editor = event.target.closest?.('[data-playground-code]');
  if (editor) syncPlaygroundEditor(editor.dataset.playgroundCode);
}, true);

document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !event.target.matches('input, textarea, [contenteditable="true"]')) {
    const search = document.querySelector('[data-course-search]');
    if (search) {
      event.preventDefault();
      search.focus();
      return;
    }
  }
  const editor = event.target.closest('[data-playground-code]');
  if (!editor) return;
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    refreshPlaygroundPreview();
    notify('Kod birinchi qatordan sandbox’da ishga tushdi.');
    return;
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    const cursor = editor.selectionStart;
    const lineStart = editor.value.lastIndexOf('\n', cursor - 1) + 1;
    const currentLine = editor.value.slice(lineStart, cursor);
    let indent = currentLine.match(/^[\t ]*/)[0];
    const language = editor.dataset.playgroundCode;
    const opensBlock = /[([{]\s*$/.test(currentLine) || (language === 'html' && /^\s*<[a-z][^>]*>\s*$/i.test(currentLine) && !/^\s*<(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)\b/i.test(currentLine));
    if (opensBlock) indent += '  ';
    editor.setRangeText(`\n${indent}`, editor.selectionStart, editor.selectionEnd, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }
});

document.addEventListener('submit', event => {
  if (event.target.id === 'auth-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    const email = String(form.get('email')).trim().toLowerCase();
    const password = String(form.get('password'));
    if (authMode === 'register') {
      if (users.some(user => user.email === email)) return notify('Bu email bilan hisob mavjud.');
      const user = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), name: String(form.get('name')).trim(), email, password, role: 'student', completed: [] };
      users.push(user); saveUsers(); session = { userId: user.id }; saveSession(); view = 'home'; render(); notify('Hisobingiz yaratildi.');
    } else {
      const user = users.find(item => item.email === email && item.password === password);
      if (!user) return notify('Email yoki parol noto‘g‘ri.');
      session = { userId: user.id }; saveSession(); view = user.role === 'admin' ? 'admin' : 'home'; render(); notify('Tizimga muvaffaqiyatli kirdingiz.');
    }
  }
  if (event.target.id === 'lesson-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    const course = courses.find(item => item.id === form.get('courseId'));
    if (!course) return notify('Darslik topilmadi.');
    const modal = document.querySelector('#lesson-modal-data');
    const old = modal?.lesson;
    const lesson = { id: old?.id || `lesson-${Date.now()}`, title: String(form.get('title')).trim(), summary: String(form.get('summary')).trim(), code: String(form.get('code')), task: String(form.get('task')).trim(), videoUrl: String(form.get('videoUrl')).trim(), quiz: { question: String(form.get('question')).trim(), options: [0, 1, 2].map(index => String(form.get(`option${index}`)).trim()), answer: Number(form.get('answer')) } };
    if (old) lesson.edited = true;
    const destination = courses.find(item => item.id === form.get('courseId'));
    const oldCourse = old && courses.find(item => item.lessons.some(l => l.id === old.id));
    if (old && oldCourse === destination) {
      destination.lessons = destination.lessons.map(l => l.id === old.id ? lesson : l);
    } else {
      if (old) courses = courses.map(item => ({ ...item, lessons: item.lessons.filter(l => l.id !== old.id) }));
      const target = courses.find(item => item.id === form.get('courseId'));
      target.lessons.push(lesson);
    }
    saveCourses(); modal.remove(); view = 'admin'; render(); notify(old ? 'Dars yangilandi.' : 'Yangi dars qo‘shildi.');
  }
});

render();
