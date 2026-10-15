 // LocalStorage keeps this no-backend MVP available in a single browser.
const STORAGE = { courses: 'devhub_courses', users: 'devhub_users', session: 'devhub_session', theme: 'devhub_theme', catalogVersion: 'devhub_catalog_version' };

function makeLesson(id, title, summary, code, task, question, options, answer = 0) {
  return { id, title, summary, code, task, quiz: { question, options, answer } };
}

const starterCourses = [
    {
  id: 'html5',
  title: 'HTML5 va sahifa tuzilishi',
  short: 'HTML',
  level: 'Boshlang‘ich',
  description: 'HTML tuzilishi, matnlar, havolalar, rasmlar, ro‘yxatlar va semantik teglar.',
  lessons: [
    makeLesson(
      'html-structure',
      'HTML hujjatining asosiy tuzilishi',
      'HTML veb-sahifaning asosiy tuzilishini yaratadi. <!DOCTYPE html> hujjat turini bildiradi, head qismida sahifa haqidagi ma’lumotlar, body qismida esa foydalanuvchiga ko‘rinadigan kontent joylashadi.',
      '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Mening sahifam</title>\n</head>\n<body>\n  <h1>Salom, dunyo!</h1>\n  <p>Mening birinchi HTML sahifam.</p>\n</body>\n</html>',
      'HTML hujjati yarating. Unda sahifa nomi, bitta sarlavha va bitta paragraf bo‘lsin.',
      'Foydalanuvchiga ko‘rinadigan asosiy kontent qaysi teg ichida yoziladi?',
      ['<body>', '<head>', '<meta>']
    ),

    makeLesson(
      'html-text',
      'Sarlavhalar va matn formatlash',
      'HTMLda h1 dan h6 gacha bo‘lgan teglar sarlavhalar uchun ishlatiladi. p paragraf yaratadi, strong muhim matnni, em esa urg‘u berilgan matnni ifodalaydi.',
      '<h1>Bosh sarlavha</h1>\n<h2>Bo‘lim nomi</h2>\n<p>Bu oddiy paragraf.</p>\n<p><strong>Muhim:</strong> topshiriqni bajaring.</p>\n<p><em>Diqqat bilan</em> o‘qing.</p>',
      'Bir bosh sarlavha, ikkita kichik sarlavha va formatlangan paragraflardan iborat maqola yarating.',
      'HTMLda eng yuqori darajadagi sarlavha qaysi teg bilan yoziladi?',
      ['<h1>', '<h6>', '<header>']
    ),

    makeLesson(
      'html-links',
      'Havolalar va navigatsiya',
      'a tegi boshqa sahifa yoki saytga havola yaratadi. href atributi havola manzilini belgilaydi. nav tegi navigatsiya havolalarini guruhlash uchun ishlatiladi.',
      '<nav>\n  <a href="index.html">Bosh sahifa</a>\n  <a href="about.html">Biz haqimizda</a>\n  <a href="https://example.com">Tashqi sayt</a>\n</nav>',
      'Bosh sahifa, xizmatlar va aloqa bo‘limlariga olib boruvchi uchta havolali navigatsiya yarating.',
      'Havolaning manzilini belgilaydigan atribut qaysi?',
      ['href', 'src', 'alt']
    ),

    makeLesson(
      'html-images',
      'Rasmlar va atributlar',
      'img tegi sahifaga rasm joylashtiradi. src rasm manzilini, alt esa rasmni ko‘ra olmaydigan foydalanuvchilar uchun muqobil matnni belgilaydi. img bo‘sh element hisoblanadi.',
      '<figure>\n  <img src="images/nature.jpg"\n       alt="Yashil tabiat va tog‘lar"\n       width="400">\n  <figcaption>Tabiat manzarasi</figcaption>\n</figure>',
      'Sahifaga bitta rasm joylashtiring. Unga alt atributi va qisqa izoh qo‘shing.',
      'Rasm yuklanmasa yoki ekran o‘quvchi ishlatilsa, muqobil matnni qaysi atribut beradi?',
      ['alt', 'href', 'title']
    ),

    makeLesson(
      'html-lists',
      'Ro‘yxatlar va jadvallar',
      'ul tartiblanmagan ro‘yxat, ol tartiblangan ro‘yxat yaratadi. li ro‘yxat elementini bildiradi. table esa jadval yaratish uchun ishlatiladi; tr satr, th sarlavha katagi, td oddiy katakdir.',
      '<h2>O‘quv fanlari</h2>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n\n<table>\n  <tr><th>Fan</th><th>Daraja</th></tr>\n  <tr><td>HTML</td><td>Boshlang‘ich</td></tr>\n</table>',
      'Uchta fan kiritilgan ro‘yxat va fan nomi hamda darajasi ko‘rsatilgan jadval yarating.',
      'Tartib raqamlari bilan ko‘rsatiladigan ro‘yxat qaysi teg yordamida yaratiladi?',
      ['<ol>', '<ul>', '<li>']
    ),

    makeLesson(
      'html-semantic',
      'Semantik teglar va formalar',
      'Semantik teglar sahifa qismlarining vazifasini anglatadi. header sahifa yoki bo‘lim boshini, main asosiy kontentni, section bo‘limni, footer esa yakuniy qismini bildiradi. form foydalanuvchidan ma’lumot olish uchun ishlatiladi.',
      '<header>\n  <h1>Onlayn kurslar</h1>\n</header>\n<main>\n  <section>\n    <h2>Ro‘yxatdan o‘tish</h2>\n    <form action="#" method="post">\n      <label for="name">Ismingiz:</label>\n      <input id="name" name="name" type="text" required>\n      <button type="submit">Yuborish</button>\n    </form>\n  </section>\n</main>\n<footer>© 2026 Onlayn kurslar</footer>',
      'Sarlavha, asosiy kontent, ro‘yxatdan o‘tish formasi va footer qismidan iborat sahifa yarating.',
      'Sahifaning asosiy kontentini belgilash uchun qaysi semantik teg ishlatiladi?',
      ['<main>', '<aside>', '<footer>']
    )
  ]
},
 
  { id: 'css3', title: 'CSS3 va maket', short: 'CSS', level: 'Boshlang‘ich', description: 'Selektorlar, ranglar, box model, Flexbox, Grid va responsive dizayn.', lessons: [
    makeLesson('css-selectors', 'Selektorlar va kaskad', 'CSS selektori qaysi element bezatilishini tanlaydi. Class qayta ishlatiladi, id esa sahifadagi yagona elementga beriladi; kaskad qoidalar ustuvorligini hal qiladi.', '.card { padding: 16px; }\n#main-title { color: darkgreen; }\nnav a:hover { text-decoration: underline; }', 'Uchta kartaga class, sahifa sarlavhasiga id selektori yozing.', 'Qayta ishlatiladigan stillar uchun qaysi selektor ma’qul?', ['.class', '#id', '* faqat']),
    makeLesson('css-colors', 'Ranglar va CSS o‘zgaruvchilari', 'Ranglarni hex, rgb yoki nom bilan berish mumkin. CSS custom property ranglarni bir joydan boshqarib, mavzuni izchil saqlaydi.', ':root { --brand: #4c7c42; }\n.button { background: var(--brand); color: white; }', 'Loyiha uchun asosiy va yordamchi rang o‘zgaruvchilarini belgilang.', 'CSS o‘zgaruvchisini ishlatish funksiyasi qaysi?', ['var()', 'get()', 'color()']),
    makeLesson('css-typography', 'Shrift, o‘lcham va o‘qilishi', 'Shrift oilasi, o‘lcham, qator balandligi va matn rangi o‘qishni belgilaydi. Uzun matn uchun line-height yetarli bo‘lsin.', 'body { font-family: Georgia, serif; line-height: 1.7; }\nh1 { font-size: 2rem; }\np { max-width: 65ch; }', 'Sarlavha va paragraf uchun o‘qilishi qulay shrift va qator oralig‘ini tanlang.', 'CSS qaysi xususiyati qator oralig‘ini belgilaydi?', ['line-height', 'letter-color', 'font-space']),
    makeLesson('css-box', 'Box model va masofalar', 'Har bir element content, padding, border va margin qatlamlaridan tuziladi. border-box kenglik hisobini tushunarli qiladi.', '* { box-sizing: border-box; }\n.card { width: 280px; padding: 20px; border: 1px solid #ccc; margin: 12px; }', 'Kartaga padding va border bering, ikki karta orasini margin bilan oching.', 'Element ichidagi bo‘shliq qaysi xususiyat?', ['padding', 'margin', 'outline']),
    makeLesson('css-layout', 'Flexbox bilan bir o‘qli maket', 'Flexbox elementlarni qator yoki ustun bo‘ylab joylaydi. justify-content asosiy o‘qni, align-items ko‘ndalang o‘qni boshqaradi.', '.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }', 'Navigatsiya nomi chapda, tugma o‘ngda turadigan toolbar yasang.', 'Flex konteynerda elementlar orasini asosiy o‘qda taqsimlaydigan xususiyat?', ['justify-content', 'font-weight', 'z-index']),
    makeLesson('css-grid', 'Grid bilan ustun va satrlar', 'Grid ikki o‘lchamli maketlarni boshqaradi. repeat va minmax turli ekranlarga mos ustunlar yaratishda foydali.', '.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }', 'Uchta teng ustunli karta maketi tuzing.', 'CSS Gridni yoqadigan qiymat qaysi?', ['display: grid', 'position: grid', 'float: grid']),
    makeLesson('css-responsive', 'Responsive dizayn va media query', 'Moslashuvchan kenglik, foiz, max-width va media query turli ekranlarda qulay maket beradi. Avval kichik ekran uchun tuzish odatda soddaroq.', '.cards { display: grid; grid-template-columns: 1fr; }\n@media (min-width: 700px) { .cards { grid-template-columns: repeat(3, 1fr); } }', 'Kartalar mobil ekranda bitta, keng ekranda uch ustun bo‘lishini ta’minlang.', 'Ekran kengligiga qarab CSS qo‘llash vositasi nima?', ['@media', '@screen', '@responsive']),
    makeLesson('css-position', 'Position, qatlam va joylashuv', 'static odatiy oqim. relative o‘z joyini saqlaydi, absolute eng yaqin pozitsiyalangan ota elementga, fixed esa viewportga nisbatan joylashadi.', '.parent { position: relative; }\n.badge { position: absolute; top: 8px; right: 8px; }', 'Karta burchagiga joylashgan yangi belgisini yarating.', 'Absolute element odatda qaysi ota elementga nisbatan joylashadi?', ['Position berilgan eng yaqin ota element', 'Har doim body', 'Eng yaqin matn']),
    makeLesson('css-states', 'Pseudo-class, fokus va transition', 'hover, focus-visible va disabled kabi holatlar interaktivlikni tushuntiradi. Klaviatura fokusi ko‘rinib turishi kerak.', '.button { transition: transform .15s ease; }\n.button:hover { transform: translateY(-2px); }\n.button:focus-visible { outline: 3px solid limegreen; }', 'Tugmaga hover hamda klaviatura fokus holatini qo‘shing.', 'Klaviatura foydalanuvchisining ko‘rinadigan fokusi uchun qaysi selektor mos?', [':focus-visible', ':visited', ':empty']),
    makeLesson('css-project', 'Amaliyot: responsive kurs kartalari', 'Yakuniy mashqda card, grid, rang o‘zgaruvchisi va media query’ni bir maketda qo‘llang. Har bir kartada sarlavha, tavsif va amal bo‘lsin.', '.course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }\n.course-card { padding: 20px; border: 1px solid #ccd5ca; border-radius: 8px; }', 'Kamida uchta kurs kartasidan iborat telefon va desktopda ishlaydigan sahifa yarating.', 'auto-fit va minmax kombinatsiyasi nimaga yordam beradi?', ['Moslashuvchan ustunlar yaratishga', 'Server ishga tushirishga', 'HTMLni tekshirishga'])
  ] },
  { id: 'javascript', title: 'JavaScript', short: 'JS', level: 'Asosiy', description: 'Til asoslari, ma’lumotlar, DOM, hodisalar, LocalStorage va API.', lessons: [
    makeLesson('js-variables', 'O‘zgaruvchilar: const va let', 'const qayta tayinlanmaydigan bog‘lanish, let esa qiymati o‘zgaradigan holatlar uchun. var eski kodlarda uchraydi, yangi kodda odatda kerak emas.', 'const course = "JavaScript";\nlet lessonCount = 1;\nlessonCount = lessonCount + 1;', 'Kurs nomini const, bajarilgan vazifalar sonini let bilan saqlang.', 'Qayta tayinlashga ruxsat bermaydigan o‘zgaruvchi e’loni?', ['const', 'let', 'var']),
    makeLesson('js-types', 'Ma’lumot turlari va qiymatlar', 'String matn, number son, boolean rost-yolg‘on, null bo‘sh qiymatni bildiradi. Array ro‘yxat, object esa nomlangan xususiyatlar to‘plami.', 'const student = { name: "Ali", active: true };\nconst scores = [90, 85, 100];\nconsole.log(typeof student.name);', 'Talaba obyektini ism, email va kurslar ro‘yxati bilan tuzing.', 'Rost yoki yolg‘on qiymatini qaysi tur saqlaydi?', ['boolean', 'string', 'array']),
    makeLesson('js-conditions', 'Taqqoslash va shartlar', 'if/else shartga qarab kod tanlaydi. === qiymat va turini birga tekshiradi. && va || mantiqiy shartlarni bog‘laydi.', 'const score = 82;\nif (score >= 60) {\n  console.log("O‘tdi");\n} else {\n  console.log("Qayta urinib ko‘ring");\n}', 'Ball 60 dan yuqori bo‘lsa muvaffaqiyat matnini chiqaradigan shart yozing.', 'Qiymat va turini qat’iy solishtirish operatori?', ['===', '=', '!=']),
    makeLesson('js-loops', 'Takrorlash: for va for...of', 'Sikl bir xil amalni ko‘p marta bajaradi. for indeks bilan yuradi, for...of esa massiv elementlarini navbat bilan oladi.', 'const topics = ["HTML", "CSS", "JS"];\nfor (const topic of topics) {\n  console.log(topic);\n}', 'Mavzular massivining har bir elementini konsolga chiqaring.', 'Massiv qiymatlarini qulay ketma-ket o‘qiydigan sikl?', ['for...of', 'if...else', 'switch']),
    makeLesson('js-functions', 'Funksiyalar va parametrlar', 'Funksiya qayta ishlatiladigan vazifani nomlaydi. Parametr kiruvchi qiymat, return esa natijani qaytaradi.', 'function greet(name) {\n  return `Salom, ${name}!`;\n}\nconsole.log(greet("Dilnoza"));', 'Ikki sonni olib, ularning yig‘indisini qaytaradigan funksiya yozing.', 'Funksiya natijasini chaqiruvchiga qaytaradigan kalit so‘z?', ['return', 'break', 'const']),
    makeLesson('js-arrays', 'Massivlar va asosiy metodlar', 'Array bir nechta qiymatni tartibli saqlaydi. map yangi ro‘yxat hosil qiladi, filter shartga moslarini tanlaydi, find birinchi mos qiymatni topadi.', 'const prices = [10, 20, 30];\nconst withTax = prices.map(price => price * 1.12);\nconst affordable = prices.filter(price => price < 25);', 'Vazifalar ro‘yxatidan tugallanganlarini filter bilan ajrating.', 'Shartga mos elementlarni yangi massivga ajratadigan metod?', ['filter', 'push', 'join']),
    makeLesson('js-objects', 'Obyektlar va destructuring', 'Obyekt bog‘liq qiymatlarni nomlangan kalitlarda saqlaydi. Destructuring kerakli qiymatni obyekt yoki massivdan qisqa oladi.', 'const course = { title: "HTML", lessons: 9 };\nconst { title, lessons } = course;\nconsole.log(title, lessons);', 'Mahsulot obyektini nomi, narxi va mavjudligi bilan tuzing.', 'Obyektdagi title qiymatini ajratish uchun qaysi yozuv ishlaydi?', ['const { title } = course', 'const title = course[]', 'course -> title']),
    makeLesson('js-dom', 'DOM: HTML elementlarini boshqarish', 'DOM hujjatning JavaScript ko‘ra oladigan daraxtidir. querySelector element topadi, textContent esa xavfsiz matnni yangilaydi.', 'const heading = document.querySelector("h1");\nheading.textContent = "Tayyor!";\nheading.classList.add("done");', 'Tugma bosilgach paragraf matnini almashtiring va unga class qo‘shing.', 'CSS selektori orqali birinchi elementni topadigan metod?', ['querySelector', 'parseInt', 'JSON.stringify']),
    makeLesson('js-events', 'Hodisalar va event listener', 'Hodisa foydalanuvchi yoki brauzer harakatidir. addEventListener elementga click, input yoki submit tinglovchisini biriktiradi.', 'const button = document.querySelector("button");\nbutton.addEventListener("click", event => {\n  event.currentTarget.textContent = "Bosildi";\n});', 'Tugma bosilganda hisoblagichni bittaga oshiring.', 'Click hodisasini tinglash metodi?', ['addEventListener', 'querySelectorAll', 'remove']),
    makeLesson('js-storage', 'Formalar va LocalStorage', 'Submit hodisasida preventDefault sahifa qayta yuklanishini to‘xtatadi. LocalStorage faqat matn saqlaydi; obyektlar JSON bilan aylantiriladi.', 'const tasks = [{ title: "Mashq", done: false }];\nlocalStorage.setItem("tasks", JSON.stringify(tasks));\nconst saved = JSON.parse(localStorage.getItem("tasks") || "[]");', 'Forma orqali vazifa qabul qiling, ro‘yxatni LocalStorage’da saqlang.', 'Obyektni LocalStorage’ga yozishdan oldin nima qilish kerak?', ['JSON.stringify', 'JSON.parse', 'toUpperCase']),
    makeLesson('js-async', 'Fetch, Promise va async/await', 'Tarmoq so‘rovi vaqt oladi. fetch Promise qaytaradi; async/await javobni kutib, xatoni try/catch bilan boshqarishga yordam beradi.', 'async function loadUsers() {\n  try {\n    const response = await fetch("/api/users");\n    if (!response.ok) throw new Error("So‘rov bajarilmadi");\n    return await response.json();\n  } catch (error) { console.error(error); }\n}', 'API’dan ma’lumot so‘rash va xatoni ko‘rsatish oqimini yozing.', 'async/await ichidagi xatoni boshqarish uchun nima ishlatiladi?', ['try/catch', 'for/in', 'switch']),
    makeLesson('js-project', 'Amaliyot: vazifalar ro‘yxati', 'Yakuniy loyiha DOM, hodisa, massiv va saqlashni birlashtiradi. Vazifa qo‘shish, bajarilgan deb belgilash va qayta ochilganda tiklashni sinang.', 'const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");\nfunction saveTasks() {\n  localStorage.setItem("tasks", JSON.stringify(tasks));\n}', 'Vazifa qo‘shish, yakunlash, o‘chirish va sahifani yangilaganda saqlanib qolish imkonini yarating.', 'LocalStorage’da obyekt massivini saqlash uchun qaysi usul kerak?', ['JSON.stringify va JSON.parse', 'Faqat join', 'innerHTML'])
  ] },
  { id: 'react', title: 'React.js', short: 'RCT', level: 'O‘rta', description: 'JSX, komponentlar, props, state, formalar, Hooks va loyiha tuzilishi.', lessons: [
    makeLesson('react-jsx', 'React loyihasi va JSX', 'React interfeysni JavaScript komponentlaridan tuzadi. JSX HTMLga o‘xshaydi, ammo className va yopiq teglar kabi qoidalarga amal qiladi.', 'function App() {\n  return <main><h1>Salom, React!</h1></main>;\n}\nexport default App;', 'Bitta sarlavha va tavsif ko‘rsatadigan App komponentini yozing.', 'JSX’da HTML class atributi o‘rniga nima yoziladi?', ['className', 'class', 'cssClass']),
    makeLesson('react-components', 'Qayta ishlatiladigan komponentlar', 'Komponent mustaqil interfeys qismidir. Komponent nomi katta harf bilan boshlanadi va odatda JSX qaytaradi.', 'function CourseCard() {\n  return <article><h2>HTML asoslari</h2><p>9 ta mavzu</p></article>;\n}', 'CourseCard komponentini yarating va ikki joyda ishlating.', 'React komponenti nomi qanday boshlanishi kerak?', ['Katta harf bilan', 'Faqat raqam bilan', 'Nuqta bilan']),
    makeLesson('react-props', 'Props: komponentga ma’lumot uzatish', 'Props ota komponentdan bola komponentga beriladi. Komponent propsni qabul qiladi, lekin uni o‘zi o‘zgartirmaydi.', 'function Greeting({ name }) {\n  return <p>Salom, {name}!</p>;\n}\n<Greeting name="Aziza" />', 'CourseCard’ga title va level propslarini uzating.', 'Propsning vazifasi nima?', ['Komponentga tashqaridan ma’lumot berish', 'Brauzerda parol saqlash', 'CSS kompilyatsiya qilish']),
    makeLesson('react-state', 'State va useState', 'State komponentning o‘zgaruvchan holati. useState qiymat va yangilash funksiyasini beradi; yangilash React’ga interfeysni qayta chizishni bildiradi.', 'import { useState } from "react";\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}', 'Ortga va oldinga ishlaydigan kichik hisoblagich yarating.', 'useState nima qaytaradi?', ['Qiymat va uni yangilovchi funksiya', 'Faqat HTML', 'Server javobi']),
    makeLesson('react-events', 'Hodisalar va shartli ko‘rinish', 'React hodisa nomlari camelCase yoziladi, masalan onClick. Shartli operator bilan xabar yoki tugmani holatga qarab ko‘rsatish mumkin.', 'function Toggle() {\n  const [open, setOpen] = useState(false);\n  return <button onClick={() => setOpen(!open)}>{open ? "Yopish" : "Ochish"}</button>;\n}', 'Tugma orqali izoh ko‘rinishini almashtiring.', 'React’da click ishlovchisi odatda qanday yoziladi?', ['onClick', 'onclick', 'clickEvent']),
    makeLesson('react-lists', 'Ro‘yxatlar va key', 'Massivni map bilan JSX elementlariga aylantiring. Har bir takrorlanuvchi elementga barqaror, takrorlanmas key bering.', 'const topics = ["HTML", "CSS", "JavaScript"];\n<ul>{topics.map(topic => <li key={topic}>{topic}</li>)}</ul>', 'Darslar massivini ro‘yxat qilib ko‘rsating; har darsning id qiymatini key qiling.', 'Ro‘yxat elementidagi key nima uchun kerak?', ['Elementlarni o‘zgarishda aniqlash uchun', 'Elementni yashirish uchun', 'CSS rangini tanlash uchun']),
    makeLesson('react-forms', 'Controlled input va formalar', 'Controlled maydonning qiymati React state’da turadi. onChange qiymatni yangilaydi, submit esa formani qayta yuklanishdan saqlaydi.', 'const [email, setEmail] = useState("");\n<input value={email} onChange={event => setEmail(event.target.value)} />', 'Email maydonini state bilan boshqarib, yuborilganda qiymatini chiqaring.', 'Controlled input qiymatining manbai qayerda?', ['React state', 'Faqat DOM', 'CSS fayli']),
    makeLesson('react-effects', 'useEffect va tashqi ma’lumot', 'useEffect renderdan keyin yon ta’sir bajaradi: masalan, sarlavhani yangilash yoki API so‘rovi. Bog‘liqliklar ro‘yxati qayta ishga tushish vaqtini belgilaydi.', 'useEffect(() => {\n  document.title = `Darslar: ${count}`;\n}, [count]);', 'Komponent ochilganda API’dan darslarni olib, yuklanish holatini ko‘rsating.', 'useEffect’dagi bo‘sh dependency array effectni qachon ishga tushiradi?', ['Birinchi renderdan keyin', 'Har bir tugma bosilganda', 'Hech qachon']),
    makeLesson('react-architecture', 'Komponentlarni bo‘lish va holatni ko‘tarish', 'Bir nechta komponentga umumiy state kerak bo‘lsa, uni eng yaqin umumiy ota komponentga ko‘taring. Kichik, aniq vazifali komponentlar test va qayta foydalanishni osonlashtiradi.', 'function App() {\n  const [selected, setSelected] = useState(null);\n  return <><CourseList onSelect={setSelected} /><LessonView lesson={selected} /></>;\n}', 'Kurs ro‘yxati va dars tafsilotini alohida komponentlarga ajrating.', 'Ikki bola komponentga kerak bo‘lgan state qayerga ko‘tariladi?', ['Eng yaqin umumiy ota komponentga', 'Har bir bolaga alohida', 'CSS fayliga']),
    makeLesson('react-project', 'Amaliyot: React kurs katalogi', 'Yakuniy mashqda kartalar, props, state va formalarni birlashtiring. Qidirish va tanlangan kursni ko‘rsatish foydali mashq bo‘ladi.', 'const filtered = courses.filter(course =>\n  course.title.toLowerCase().includes(query.toLowerCase())\n);', 'Qidiruvi, kategoriya filtri va tanlangan kurs tafsiloti bor kichik katalog tuzing.', 'Ro‘yxatni qidiruv so‘ziga moslab yangilashda nima kerak?', ['State va filter', 'Faqat CSS hover', 'Faqat alert'])
  ] },
  { id: 'roadmap', title: 'Frontend yo‘l xaritasi', short: 'MAP', level: 'Amaliyot', description: 'O‘rganish tartibi, Git, accessibility, API, deploy va portfolio rejasi.', lessons: [
    makeLesson('frontend-path', 'Bilimlarni loyihaga aylantirish', 'Avval HTML va CSS bilan tuzilma va maketni o‘rganing, keyin JavaScript bilan interaktivlik qo‘shing. So‘ng Git, API, test va frameworkga o‘ting.', 'G‘oya → HTML/CSS → JavaScript → Git → API → React → Test → Portfolio', 'O‘zingiz tanlagan maqsad uchun haftalik 5 qadamli o‘quv reja tuzing.', 'Frontend asoslarining boshlanishida qaysi bilimlar turadi?', ['HTML, CSS va JavaScript', 'Faqat ma’lumotlar bazasi', 'Faqat server sozlash']),
    makeLesson('roadmap-html-css', 'HTML va CSSni mustahkamlash', 'Semantik HTML, formalar, CSS box model va responsive maketni o‘rganing. Har mavzudan keyin kichik sahifa qurib, mobil ko‘rinishni sinang.', 'Maket → semantic HTML → CSS layout → responsive → accessibility', 'Bir sahifa maketini avval qog‘ozda rejalab, HTML bo‘limlari va CSS layoutini yozing.', 'Responsive maketni qaysi CSS imkoniyati bilan tekshirasiz?', ['Media query', 'SQL query', 'Event loop']),
    makeLesson('roadmap-js', 'JavaScript bilan mantiq va DOM', 'O‘zgaruvchi, shart, funksiya, massiv, obyekt, DOM va hodisalarni ketma-ket o‘rganing. Keyin Promise, async/await va API so‘roviga o‘ting.', 'const result = items\n  .filter(item => item.active)\n  .map(item => item.title);', 'Vazifa ro‘yxatini DOM va LocalStorage yordamida interaktiv qiling.', 'JavaScript’da API natijasini kutish uchun odatiy yondashuv?', ['async/await', 'float', 'z-index']),
    makeLesson('roadmap-git', 'Git va jamoaviy ish', 'Git o‘zgarishlar tarixini saqlaydi. Commit kichik va izohli bo‘lsin; branch alohida ishni boshqaradi, pull request esa ko‘rib chiqishga yordam beradi.', 'git init\ngit add .\ngit commit -m "Add course page"\ngit switch -c feature/search', 'Yangi repo yarating, kamida uchta tushunarli commit qiling va branchda bitta o‘zgarish bajaring.', 'Git commit nima saqlaydi?', ['Loyiha o‘zgarishlarining snapshotini', 'Faqat brauzer tarixini', 'Faqat parollarni']),
    makeLesson('roadmap-accessibility', 'Accessibility va foydalanish qulayligi', 'Klaviatura bilan ishlash, ko‘rinadigan fokus, yetarli kontrast, label va semantik landmarklar barcha foydalanuvchilar uchun muhim.', '<button type="button">Saqlash</button>\n<label for="name">Ism</label>\n<input id="name" name="name">', 'Loyihangizni faqat klaviatura bilan boshqarib, topilgan muammolarni tuzating.', 'Forma maydonini ekranni o‘qigichga tushunarli qiluvchi juftlik?', ['label va input id', 'placeholder va rang', 'div va span']),
    makeLesson('roadmap-api', 'API bilan ishlash va testlash', 'Frontend API’dan JSON oladi va yuboradi. Loading, error, empty va success holatlarini alohida ko‘rsating; asosiy oqimlarni test qiling.', 'const response = await fetch("/api/courses");\nif (!response.ok) throw new Error("Xatolik");\nconst courses = await response.json();', 'Tashqi ma’lumot yuklaydigan sahifaga kutish va xato holati qo‘shing.', 'fetch javobida server xatosini tekshirish uchun nima ko‘riladi?', ['response.ok', 'response.color', 'response.css']),
    makeLesson('roadmap-deploy', 'Build va saytni internetga joylash', 'Deploy loyihani foydalanuvchiga yetkazadi. Build xatolarini tekshiring, maxfiy qiymatlarni repoga qo‘shmang, ishlaydigan URL va README tayyorlang.', 'npm run build\n# build papkasidagi fayllarni hostingga joylang', 'Loyihangizni statik hostingga joylab, README’da ishga tushirish va demo manzilini yozing.', 'Deploydan oldin nima tekshirish kerak?', ['Build va asosiy sahifa ishlashini', 'Faqat fayl nomini', 'Faqat shriftni']),
    makeLesson('roadmap-portfolio', 'Yakuniy loyiha va portfolio', 'Portfolio 2–3 sifatli loyihani, ishlaydigan demo, qisqa tavsif va manba kodini ko‘rsatsin. Har loyihada muammoni, qarorni va o‘rganganingizni yozing.', 'Loyiha: muammo → foydalanuvchi → yechim → demo → xulosa', 'Bir loyihani yakunlang: talablar, mobil ko‘rinish, xatolar holati va README bilan taqdim qiling.', 'Portfolio’da nimani ko‘rsatish muhim?', ['Ishlaydigan loyihalar va qarorlar', 'Faqat texnologiyalar ro‘yxati', 'Faqat kurs sertifikatlari'])
  ] },
  { id: 'backend', title: 'Backend asoslari', short: 'API', level: 'Boshlang‘ich', description: 'Node.js, HTTP, Express, REST, validatsiya, SQL va xavfsizlik.', lessons: [
    makeLesson('backend-node', 'Backend nima va Node.js', 'Backend so‘rovni oladi, qoidalarni tekshiradi, ma’lumot bilan ishlaydi va javob qaytaradi. Node.js JavaScript’ni brauzerdan tashqarida ishlatadi.', 'console.log("Server ishga tayyor");\nconst now = new Date();\nconsole.log(now.toISOString());', 'Brauzer JavaScript’i va server JavaScript’i vazifalarini ikki ustunga yozing.', 'Node.js nima beradi?', ['JavaScript’ni serverda ishlatish muhitini', 'CSS frameworkini', 'HTML teglarini']),
    makeLesson('backend-modules', 'npm, package va modullar', 'npm paketlarni boshqaradi. package.json loyiha skriptlari va bog‘liqliklarini yozadi; import/export kodni modullarga ajratadi.', 'export function add(a, b) { return a + b; }\nimport { add } from "./math.js";\nconsole.log(add(2, 3));', 'Matematik yordamchi funksiyalarni alohida modulga ajrating.', 'Loyiha skriptlari va paket ma’lumotlari qayerda turadi?', ['package.json', 'index.html', 'README.png']),
    makeLesson('backend-api', 'Express server va birinchi endpoint', 'Express Node.js uchun kichik server yaratadi. Route HTTP usuli va URL’ni funksiyaga bog‘laydi, JSON javob API uchun odatiy formatdir.', 'const express = require("express");\nconst app = express();\napp.get("/api/salom", (req, res) => {\n  res.json({ xabar: "Salom!" });\n});', 'GET /api/salom endpointini yozing va JSON javobini belgilang.', 'Express’da GET marshrutini e’lon qiluvchi metod?', ['app.get()', 'app.css()', 'app.table()']),
    makeLesson('backend-http', 'HTTP so‘rov va javoblar', 'HTTP so‘rovda metod, URL, header va ba’zan body bo‘ladi. Javob status kodi va ma’lumot beradi. 2xx muvaffaqiyat, 4xx mijoz xatosi, 5xx server xatosi.', 'GET /api/courses HTTP/1.1\nAccept: application/json\n\nHTTP/1.1 200 OK\nContent-Type: application/json', 'Kurs ro‘yxati uchun so‘rov metodi, URL va muvaffaqiyat statusini yozing.', 'Muvaffaqiyatli so‘rov uchun keng tarqalgan status?', ['200', '404', '500']),
    makeLesson('backend-rest', 'REST API va CRUD marshrutlari', 'REST resurslarni URL bilan ifodalaydi. GET o‘qiydi, POST yaratadi, PUT/PATCH yangilaydi, DELETE o‘chiradi.', 'GET /api/courses\nPOST /api/courses\nPATCH /api/courses/7\nDELETE /api/courses/7', 'Vazifalar resursi uchun to‘rtta CRUD endpoint rejasini tuzing.', 'Resursni yaratishda odatda qaysi HTTP metodi ishlatiladi?', ['POST', 'GET', 'DELETE']),
    makeLesson('backend-middleware', 'Middleware va so‘rov zanjiri', 'Middleware so‘rov route’ga yetishidan oldin yoki keyin ishlaydi. JSON body parser, log va autentifikatsiya middleware misollaridir.', 'app.use(express.json());\napp.use((req, res, next) => {\n  console.log(req.method, req.path);\n  next();\n});', 'Har bir so‘rov metodini log qiladigan middleware yozing.', 'Middleware zanjirini davom ettiradigan funksiya?', ['next()', 'returnCSS()', 'render()']),
    makeLesson('backend-validation', 'Validatsiya va xatolar', 'Serverga kelgan ma’lumotga ishonmang. Majburiy maydon, uzunlik va formatni tekshiring; noto‘g‘ri so‘rovga tushunarli 4xx javob qaytaring.', 'app.post("/api/courses", (req, res) => {\n  if (!req.body.title?.trim()) {\n    return res.status(400).json({ error: "title majburiy" });\n  }\n  res.status(201).json({ title: req.body.title.trim() });\n});', 'Kurs nomi bo‘sh kelganda 400, to‘g‘ri kelganda 201 javob beradigan qoida yozing.', 'Foydalanuvchi yuborgan ma’lumotni serverda nima qilish kerak?', ['Validatsiya qilish', 'To‘g‘ridan-to‘g‘ri bajarish', 'CSS bilan bezash']),
    makeLesson('backend-crud', 'CRUD va vaqtinchalik xotira', 'Ma’lumotlar bazasisiz prototipda massiv orqali CRUD oqimini tushunsa bo‘ladi. Server qayta ishga tushganda xotiradagi qiymatlar yo‘qolishini unutmang.', 'const courses = [];\napp.post("/api/courses", (req, res) => {\n  const course = { id: Date.now(), title: req.body.title };\n  courses.push(course);\n  res.status(201).json(course);\n});', 'Kursni yaratish va id bo‘yicha topish oqimini yozing.', 'Oddiy massivdagi ma’lumot qachon yo‘qolishi mumkin?', ['Server qayta ishga tushganda', 'Har bir GET’da', 'CSS yangilanganda']),
    makeLesson('backend-sql', 'Ma’lumotlar bazasi va SQL tushunchalari', 'Ma’lumotlar bazasi ma’lumotni doimiy saqlaydi. Jadval ustun va qatorlardan iborat; SQL SELECT o‘qiydi, INSERT qo‘shadi, UPDATE yangilaydi, DELETE o‘chiradi.', 'SELECT id, title FROM courses WHERE published = true;\nINSERT INTO courses (title) VALUES (\'HTML asoslari\');', 'Kurs jadvali uchun id, title va created_at ustunlarini rejalang.', 'Jadvaldan ma’lumot o‘qish SQL buyrug‘i?', ['SELECT', 'INSERT', 'DROP']),
    makeLesson('backend-auth', 'Parol, autentifikatsiya va xavfsizlik', 'Parolni hech qachon ochiq matn bilan saqlamang: serverda kuchli hash algoritmi ishlatiladi. Maxfiy kalitlarni environment’da saqlang, ruxsatlarni serverda tekshiring.', 'const secret = process.env.SESSION_SECRET;\nif (!secret) throw new Error("SESSION_SECRET sozlanmagan");\n// Parollarni xavfsiz hash bilan tekshiring.', 'Qaysi ma’lumotlar maxfiy sanalishini belgilang va ularni repoga qo‘shmaslik rejasini tuzing.', 'Parol bazada qanday saqlanishi kerak?', ['Salt bilan kuchli hash ko‘rinishida', 'Oddiy matn ko‘rinishida', 'URL ichida']),
    makeLesson('backend-errors', 'Environment, log va server xatolari', 'Environment konfiguratsiyani koddan ajratadi. Loglar muammoni topishga yordam beradi, lekin parol va tokenlarni logga yozmang; foydalanuvchiga umumiy xato bering.', 'const port = process.env.PORT || 3000;\napp.listen(port, () => console.log(`Server ${port} portida`));', 'Server portini environment’dan o‘qing va maxfiy qiymatlarni log qilmaslikni tekshiring.', 'API tokenni qayerga yozish mumkin emas?', ['Git repoga', 'Maxfiy environment sozlamasiga', 'Secret managerga']),
    makeLesson('backend-project', 'Amaliyot: kurslar REST API', 'Yakuniy loyiha GET va POST endpoint, ma’lumot validatsiyasi, status kodlari va aniq xato javoblarini jamlaydi. Keyingi qadamda SQL bazaga ulash mumkin.', 'app.use(express.json());\napp.get("/api/courses", (req, res) => res.json(courses));\napp.post("/api/courses", createCourse);', 'Kurslar API rejasini tuzing: endpointlar, status kodlari, tekshiruvlar va saqlash usuli.', 'Yangi resurs muvaffaqiyatli yaratilganini qaysi status bildiradi?', ['201', '304', '503'])
  ] }
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
    ['types', 'TypeScript va oddiy turlar', 'TypeScript JavaScript ustiga statik tur tekshiruvini qo‘shadi. String, number va boolean qiymatlarni oldindan belgilash xatolarni kod yozayotganda ko‘rsatadi.', 'let name: string = "Diyor";\nlet lessons: number = 4;\nlet isReady: boolean = true;', 'Talaba nomi, kurs soni va tugallangan holatni tiplang.', 'Matn qiymatini ifodalovchi TypeScript turi qaysi?', ['string', 'number', 'boolean']],
    ['objects', 'Object, type va interface', 'Interface obyekt shaklini hujjatlashtiradi. Optional maydon ? bilan belgilanadi, readonly esa qayta tayinlashni cheklaydi.', 'interface Course {\n  id: number;\n  title: string;\n  level?: "beginner" | "advanced";\n}', 'Course interfeysini yarating va unga mos ikki obyekt tuzing.', 'Optional property qaysi belgi bilan yoziladi?', ['?', '!', '#']],
    ['functions', 'Funksiya turlari va generics', 'Parametr va qaytish qiymatini yozing. Generic funksiya bir xil logikani turli qiymat turlarida, tur haqidagi ma’lumotni yo‘qotmasdan ishlatadi.', 'function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconst title = first<string>(["HTML", "CSS"]);', 'Massivning birinchi elementini qaytaradigan generic yordamchi yozing.', 'Generic type odatda qaysi qavs ichida beriladi?', ['<T>', '[T]', '{T}']],
    ['narrowing', 'Union type va type narrowing', 'Union qiymat bir nechta turdan biri bo‘lishini bildiradi. typeof yoki discriminant maydon orqali qiymat turini tekshirib, xavfsiz ishlating.', 'type Result = { ok: true; data: string } | { ok: false; error: string };\nfunction show(result: Result) {\n  if (result.ok) return result.data;\n  return result.error;\n}', 'Success va error holatlari bor API javob turini modellang.', 'Union type yozishda qaysi belgi ishlatiladi?', ['|', '&', '=>']],
    ['project', 'Amaliyot: typed kurs katalogi', 'Kichik katalogda Course, filter funksiyasi va API javob turlarini belgilang. strict rejim yoqilganida TypeScript topgan xatolarni tuzatib chiqing.', 'type Course = { id: number; title: string; lessons: number };\nconst visible = (items: Course[], query: string): Course[] =>\n  items.filter(item => item.title.includes(query));', 'Kurslar ro‘yxatini tiplar bilan yozing, qidiruv va bo‘sh natija holatini qo‘shing.', 'strict rejimning asosiy foydasi nima?', ['Tur bilan bog‘liq xatolarni erta topadi', 'CSS’ni avtomatik yozadi', 'Serverni o‘chiradi']]
  ]),
  makeCourseTrack('vue', 'Vue.js', 'VUE', 'O‘rta', 'Vue component, reaktiv holat, directive, componentlararo aloqa va kichik loyiha.', [
    ['sfc', 'Vue loyihasi va Single File Component', 'Vue komponenti template, script va style qismlarini bitta .vue faylida jamlaydi. SFC katta interfeysni mayda, qayta ishlatiladigan bo‘laklarga ajratadi.', '<template>\n  <h1>{{ title }}</h1>\n</template>\n<script setup>\nimport { ref } from "vue";\nconst title = ref("Salom, Vue!");\n</script>', 'Salom matni va tavsifi ko‘rinadigan birinchi Vue sahifasini yozing.', 'Vue Single File Component kengaytmasi qaysi?', ['.vue', '.jsx', '.view']],
    ['reactivity', 'Reaktiv state va computed', 'ref oddiy reaktiv qiymat yaratadi. Template ichida ref avtomatik ochiladi; computed esa boshqa qiymatlardan hisoblanadigan natijani beradi.', 'const count = ref(0);\nconst doubled = computed(() => count.value * 2);\nfunction increment() { count.value++; }', 'Tugma bilan oshadigan son va uning ikki baravarini ko‘rsating.', 'ref qiymati script ichida qaysi property’da turadi?', ['value', 'current', 'data']],
    ['template', 'Directive va ro‘yxat renderi', 'v-if shart bilan ko‘rsatadi, v-for massivni chizadi, v-model inputni state bilan bog‘laydi. Takrorlanadigan elementga barqaror key bering.', '<li v-for="course in courses" :key="course.id">\n  {{ course.title }}\n</li>\n<p v-if="courses.length === 0">Kurs topilmadi</p>', 'Kurslarni chiqarib, bo‘sh massiv uchun alohida holat qo‘shing.', 'Ro‘yxatni takrorlash direktivasi qaysi?', ['v-for', 'v-if', 'v-show']],
    ['components', 'Props, emit va componentlar', 'Props ma’lumotni ota komponentdan uzatadi. Bola komponent emit orqali hodisa yuboradi; shu tariqa ma’lumot oqimi tushunarli bo‘ladi.', 'const props = defineProps({ title: String });\nconst emit = defineEmits(["select"]);\nfunction choose() { emit("select", props.title); }', 'Kurs kartasi sarlavhani props bilan olib, bosilganda select hodisasini chiqarsin.', 'Bola komponentdan ota komponentga xabar qanday yuboriladi?', ['emit', 'provide', 'watch']],
    ['project', 'Amaliyot: Vue vazifalar ro‘yxati', 'Form, reaktiv array, computed filter va alohida TaskItem komponentini birlashtirib kichik ro‘yxat ilovasi tuzing.', 'const tasks = ref([]);\nconst remaining = computed(() => tasks.value.filter(task => !task.done).length);\nfunction addTask(title) { tasks.value.push({ id: crypto.randomUUID(), title, done: false }); }', 'Vazifa qo‘shish, bajarildi deb belgilash va faol vazifalarni filtrlashni bajaring.', 'Reaktiv hosilaviy qiymat uchun qaysi API ishlatiladi?', ['computed', 'emit', 'onMounted']]
  ]),
  makeCourseTrack('angular', 'Angular', 'NG', 'O‘rta', 'TypeScript, component, template, service, dependency injection va routing asoslari.', [
    ['components', 'Component va template', 'Angular component TypeScript class, HTML template va CSS stillaridan tuziladi. Selector componentni boshqa template ichida ishlatadi.', '@Component({\n  selector: "app-greeting",\n  template: `<h1>Salom, {{ name }}!</h1>`\n})\nexport class GreetingComponent { name = "Aziza"; }', 'Greeting component yarating va uni asosiy sahifada ishlating.', 'Angular componentni e’lon qiladigan dekorator qaysi?', ['@Component', '@Service', '@Route']],
    ['binding', 'Binding va event', 'Interpolation qiymatni chiqaradi, property binding HTML xususiyatini boshqaradi, event binding foydalanuvchi amalini tinglaydi.', '<button [disabled]="saving" (click)="save()">\n  {{ saving ? "Saqlanmoqda" : "Saqlash" }}\n</button>', 'Saqlash tugmasini loading holatida bloklab, matnini almashtiring.', 'Angular’da event binding uchun qaysi qavs ishlatiladi?', ['(click)', '[click]', '{{click}}']],
    ['services', 'Service va dependency injection', 'Service umumiy logikani componentdan ajratadi. Injectable service API yoki ma’lumotni boshqaradi; Angular injector kerakli joyga beradi.', '@Injectable({ providedIn: "root" })\nexport class CourseService {\n  getAll() { return this.http.get<Course[]>("/api/courses"); }\n}', 'Kurslarni qaytaradigan CourseService tuzing va componentda inject qiling.', 'Dependency injection nimani osonlashtiradi?', ['Xizmatlarni componentga boshqariladigan tarzda berishni', 'HTML’ni o‘chirishni', 'CSS rangini hisoblashni']],
    ['routing', 'Router va form validatsiyasi', 'Router URL’ni componentga bog‘laydi. Reactive Forms input holatini va validatsiyani TypeScript orqali aniq boshqaradi.', 'const routes: Routes = [\n  { path: "courses", component: CourseListComponent },\n  { path: "courses/:id", component: CourseDetailComponent }\n];', 'Kurslar ro‘yxati va tafsilot sahifasi uchun route yozing.', 'Dinamik kurs identifikatori route’da qanday yoziladi?', [':id', '#id', '{id}']],
    ['project', 'Amaliyot: Angular kurs katalogi', 'Yakuniy ishda service’dan kurs oling, loading/error holatini ko‘rsating, route orqali detal oching va formadagi required maydonni tekshiring.', 'this.courseService.getAll().subscribe({\n  next: courses => this.courses = courses,\n  error: () => this.error = "Qayta urinib ko‘ring"\n});', 'Katalog sahifasida loading, xato, bo‘sh va natija holatlarini yarating.', 'API xato berganda qaysi UX holati ko‘rsatilishi kerak?', ['Tushunarli xabar va qayta urinish', 'Bo‘sh ekran', 'Hech narsa qilmaslik']]
  ]),
  makeCourseTrack('svelte', 'Svelte', 'SV', 'O‘rta', 'Svelte component, reaktiv qiymat, props, event va SvelteKit bilan amaliyot.', [
    ['component', 'Svelte component va template', 'Svelte component .svelte faylida markup, script va style’ni birlashtiradi. Kompilyator kerakli JavaScript’ni build vaqtida yaratadi.', '<script>\n  let name = "Svelte";\n</script>\n<h1>Salom, {name}!</h1>\n<style>h1 { color: #ff3e00; }</style>', 'Ismni o‘zgaruvchidan oladigan kichik salomlashish componenti yozing.', 'Svelte componentining fayl kengaytmasi?', ['.svelte', '.vue', '.sv']],
    ['state', 'Reaktiv qiymat va event', 'Svelte’da qiymat o‘zgarsa, compiler unga bog‘liq ko‘rinishni yangilaydi. Event directive foydalanuvchi amalini funksiya bilan bog‘laydi.', '<script>\n  let count = 0;\n</script>\n<button on:click={() => count += 1}>{count}</button>', 'Hisoblagich yarating va minus tugmasi bilan 0 dan pastga tushishiga yo‘l qo‘ymang.', 'Svelte click handler qanday yoziladi?', ['on:click', '@click', '(click)']],
    ['props', 'Props va componentlararo aloqa', 'Props ota komponentdan bola komponentga ma’lumot uzatadi. Svelte’da props componentga kiruvchi qiymat sifatida olinadi.', 'let { title } = $props();\n<h2>{title}</h2>\n<!-- Parent: <CourseCard title="HTML" /> -->', 'title prop oladigan CourseCard yarating va uchta kursga ishlating.', 'Qayta foydalaniladigan interfeys bo‘lagi nima?', ['Component', 'Store', 'Route']],
    ['stores', 'Store va asinxron ma’lumot', 'Store bir nechta componentga umumiy holat beradi. API yuklanayotganda loading, xato va tayyor ma’lumot holatlarini alohida ko‘rsating.', 'import { writable } from "svelte/store";\nexport const selectedCourse = writable(null);\n// $selectedCourse qiymatni template ichida kuzatadi.', 'Tanlangan kursni ikki alohida component orasida store bilan ulashing.', 'Store qiymatini reaktiv kuzatish uchun qaysi prefix ishlatiladi?', ['$', '@', '#']],
    ['project', 'Amaliyot: SvelteKit darslar katalogi', 'Sahifa route’lari, serverdan kelgan kurslar, component props va qidiruv state’ini birlashtiring. Bo‘sh natija va loading ko‘rinishini ham qo‘shing.', 'let query = $state("");\nlet visible = $derived(courses.filter(course =>\n  course.title.toLowerCase().includes(query.toLowerCase())\n));', 'Kurs qidiruvi va detal sahifasi bilan ishlaydigan mini katalog tuzing.', 'SvelteKit nima beradi?', ['Svelte uchun routing va server imkoniyatlarini', 'Faqat CSS resetni', 'Faqat ma’lumotlar bazasini']]
  ]),
  makeCourseTrack('nextjs', 'Next.js', 'NXT', 'O‘rta', 'React asosida routing, server component, ma’lumot olish va metadata bilan ishlang.', [
    ['routing', 'File-based routing va sahifalar', 'Next.js App Router’da app ichidagi papka URL segment bo‘ladi. page fayli sahifani, layout umumiy karkasni belgilaydi.', 'app/\n  layout.tsx\n  page.tsx\n  courses/\n    page.tsx\n    [id]/page.tsx', 'Bosh sahifa, kurslar ro‘yxati va /courses/[id] detal route’ini rejalang.', 'App Router’da sahifa komponenti qaysi faylda bo‘ladi?', ['page.tsx', 'route.css', 'screen.json']],
    ['server-client', 'Server va Client Component', 'Server Component ma’lumotni serverda oladi va client bundle’ni kichraytiradi. Interaktiv state yoki browser API ishlatilsa, fayl boshida use client yoziladi.', 'export default async function CoursesPage() {\n  const courses = await getCourses();\n  return <CourseList courses={courses} />;\n}', 'Kurs ro‘yxatini serverda oling, qidiruv inputini alohida client component qiling.', 'State hook ishlatadigan component qanday belgilanadi?', ['use client direktivasi bilan', 'use server bilan', 'export css bilan']],
    ['data', 'Data fetching, loading va error', 'Server componentda async data olish mumkin. loading va error maxsus route fayllari yuklanish hamda xato holatini boshqaradi.', 'export default async function Page() {\n  const response = await fetch("https://example.com/api/courses");\n  if (!response.ok) throw new Error("Kurslar olinmadi");\n  return <CourseList courses={await response.json()} />;\n}', 'API xatosi, bo‘sh ro‘yxat va yuklanish uchun foydalanuvchiga tushunarli ko‘rinish yozing.', 'App Router yuklanish holati qaysi fayl bilan beriladi?', ['loading.tsx', 'wait.tsx', 'pending.css']],
    ['metadata', 'Metadata va sahifa optimizatsiyasi', 'Metadata sahifa sarlavhasi va tavsifini belgilaydi. Rasm optimizatsiyasi va server render qidiruv hamda yuklanish sifatiga yordam beradi.', 'export const metadata = {\n  title: "Kurslar | DevHub",\n  description: "Dasturlash darslarini o‘rganing"\n};', 'Kurs detal sahifasiga kurs nomidan title va tavsif yarating.', 'Metadata’ning foydasi nimada?', ['Sahifa sarlavhasi va qidiruv tavsifini boshqaradi', 'State’ni o‘zgartiradi', 'SQL so‘rov bajaradi']],
    ['project', 'Amaliyot: Next.js kurslar portali', 'Route, server fetch, interaktiv client qidiruv, metadata va loading/error UI’ni birlashtiring. Har route uchun kerakli ma’lumotni faqat bir joydan oling.', 'export default async function CoursePage({ params }) {\n  const { id } = await params;\n  const course = await getCourse(id);\n  return <CourseDetail course={course} />;\n}', 'Kurslar ro‘yxati va bitta detal route’idan iborat portal yarating.', 'Interaktiv tugma uchun component qaysi muhitda ishlashi kerak?', ['Client Component', 'Faqat metadata', 'Static CSS']],
  ]),
  makeCourseTrack('python', 'Python backend', 'PY', 'Boshlang‘ich', 'Python sintaksisi, ma’lumot tuzilmalari, FastAPI endpoint va test bilan API tuzing.', [
    ['syntax', 'Python sintaksisi va turlar', 'Python o‘qilishi oson sintaksisga ega. Indentatsiya blokni belgilaydi; o‘zgaruvchi turini qiymatidan oladi, lekin type hint bilan niyatni hujjatlashtirasiz.', 'name: str = "Malika"\nlessons: int = 5\nactive: bool = True\nprint(f"{name}: {lessons} dars")', 'Kurs nomi, dars soni va tugallangan flag uchun type hint yozing.', 'Python’da kod blokini nima ajratadi?', ['Indentatsiya', 'Qavslar majburiy', 'Nuqtali vergul']],
    ['collections', 'List, dict va funksiyalar', 'List tartibli ro‘yxat, dict kalit-qiymat xaritasi. Funksiyaga aniq parametr va return bering; mutable default argumentdan ehtiyot bo‘ling.', 'def find_course(courses: list[dict], course_id: int):\n    return next((item for item in courses if item["id"] == course_id), None)', 'ID bo‘yicha kurs topadigan funksiya yozing va topilmagan holatni ko‘rsating.', 'Kalit-qiymat juftligi uchun qaysi tur mos?', ['dict', 'set', 'tuple']],
    ['fastapi', 'FastAPI route va schema', 'FastAPI Python type hint’dan request validatsiyasi va interaktiv hujjat yaratishda foydalanadi. Pydantic model keluvchi JSON shaklini belgilaydi.', 'from fastapi import FastAPI\nfrom pydantic import BaseModel\napp = FastAPI()\nclass Course(BaseModel): title: str\n@app.post("/courses")\ndef create_course(course: Course): return course', 'Kurs yaratish endpointiga title va level maydonli schema tuzing.', 'FastAPI validatsiyasida ma’lumot shaklini qaysi model belgilaydi?', ['Pydantic model', 'CSS class', 'HTML form']],
    ['async-db', 'Async endpoint va ma’lumotlar bazasi', 'Async route I/O kutayotganda serverga boshqa so‘rovga javob berishga imkon beradi. Ma’lumot bazasına parameterized query bilan ishlang.', 'async def list_courses(db):\n    result = await db.execute(select(Course).order_by(Course.title))\n    return result.scalars().all()', 'Kurslarni nom bo‘yicha tartiblab qaytaradigan async service rejasini yozing.', 'await nimani kutadi?', ['Awaitable operatsiya tugashini', 'CSS yuklanishini', 'Python fayl saqlanishini']],
    ['project', 'Amaliyot: Python kurslar API', 'CRUD endpoint, schema validatsiyasi, ma’lumot bazasi, status kodi va pytest testini birlashtiring. Xato javobda maxfiy stack trace’ni oshkor qilmang.', 'def test_create_course(client):\n    response = client.post("/courses", json={"title": "Python"})\n    assert response.status_code == 201\n    assert response.json()["title"] == "Python"', 'Kurs yaratish va topilmagan ID uchun avtomatik API test yozing.', 'API xatosini tekshiradigan test nimani assert qiladi?', ['Status code va javob mazmunini', 'Faqat sahifa rangini', 'Faqat terminal nomini']]
  ]),
  makeCourseTrack('php', 'PHP va Laravel', 'PHP', 'Amaliyot', 'PHP sintaksisi, Composer, Laravel route, validation, Eloquent va test asoslari.', [
    ['syntax', 'PHP sintaksisi va o‘zgaruvchilar', 'PHP serverda ishlaydi va o‘zgaruvchi $ bilan boshlanadi. Associative array kalit bilan qiymat bog‘laydi; qat’iy taqqoslash === tur farqini ham tekshiradi.', '<?php\n$name = "Kamol";\n$course = ["title" => "PHP", "lessons" => 5];\necho $course["title"];', 'Kurs arrayini yarating va sarlavhasini ekranga chiqaring.', 'PHP o‘zgaruvchisi qaysi belgi bilan boshlanadi?', ['$', '#', '@']],
    ['functions', 'Funksiya va Composer', 'Funksiyalar takrorlanadigan logikani ajratadi. Composer PHP paketlari va autoload’ni boshqaradi; type declaration xato qiymatni erta ushlaydi.', 'function lessonCount(array $lessons): int {\n    return count($lessons);\n}', 'Darslar massividan tugallanganlar sonini qaytaradigan tiplangan funksiya yozing.', 'PHP dependency manager qaysi?', ['Composer', 'npm', 'Cargo']],
    ['laravel', 'Laravel route va controller', 'Route URL’ni controller metodiga bog‘laydi. Controller HTTP tafsilotini boshqaradi, model esa ma’lumot bilan ishlaydi.', 'Route::get("/courses", [CourseController::class, "index"]);\nRoute::post("/courses", [CourseController::class, "store"]);', 'Kurslar ro‘yxati va yangi kurs yaratish uchun ikki route yozing.', 'Laravel route’lari odatda qayerda e’lon qilinadi?', ['routes/web.php yoki routes/api.php', 'composer.json ichida', 'CSS faylida']],
    ['eloquent', 'Validatsiya va Eloquent', 'Request validatsiyasi noto‘g‘ri ma’lumotni bazaga yetkazmaydi. Eloquent model ma’lumotlar bazasi jadvaliga qulay obyekt interfeysini beradi.', '$data = $request->validate([\n    "title" => ["required", "string", "max:120"],\n]);\n$course = Course::create($data);', 'Kurs nomi va darajasi uchun validation qoidalarini yozing.', 'Validation xato bo‘lsa, nima qilish kerak?', ['So‘rovni rad etib, xatolarni qaytarish', 'Noto‘g‘ri ma’lumotni saqlash', 'Xatoni jim o‘chirish']],
    ['project', 'Amaliyot: Laravel kurs API', 'Resource route, Form Request, Eloquent migration va feature testni ulang. Har bir endpoint uchun to‘g‘ri status va ruxsat tekshiruvini belgilang.', 'public function store(StoreCourseRequest $request): CourseResource\n{\n    $course = Course::create($request->validated());\n    return new CourseResource($course);\n}', 'Kurs yaratish va ro‘yxatini olish uchun API yozib, valid/invalid request’larni test qiling.', 'validated() nimani qaytaradi?', ['Tekshiruvdan o‘tgan maydonlarni', 'Barcha environment sirlarini', 'SQL jadval nomini']]
  ]),
  makeCourseTrack('java', 'Java backend', 'JAVA', 'O‘rta', 'Java turlari, class/interface, Spring Boot REST, dependency injection va test.', [
    ['types', 'Java turlari va class', 'Java statik tiplanadi. Class holat va xulqni birlashtiradi; constructor obyekt yaratishda zarur maydonlarni beradi.', 'public class Course {\n  private final String title;\n  public Course(String title) { this.title = title; }\n  public String getTitle() { return title; }\n}', 'Course classiga title va lessonsCount maydonlari bilan constructor qo‘shing.', 'Java’da obyekt yaratish uchun nima ishlatiladi?', ['new', 'make', 'build']],
    ['collections', 'Collection, generics va exception', 'List tartiblangan qiymatlar saqlaydi. Generic tip element turini tekshiradi; exception xatoni aniq qatlamda boshqarishga imkon beradi.', 'List<Course> courses = new ArrayList<>();\ncourses.add(new Course("Java"));\nfor (Course course : courses) {\n  System.out.println(course.getTitle());\n}', 'Kurslar ro‘yxatini generic List’da saqlang va nomlarini chiqaring.', 'List<Course> nimani bildiradi?', ['List faqat Course obyektlarini saqlaydi', 'List faqat raqam saqlaydi', 'Course ro‘yxat emas']],
    ['spring', 'Spring Boot REST controller', 'Spring Boot konfiguratsiyani kamaytiradi. RestController JSON javob qaytaradi, mapping annotatsiyalari URL va HTTP metodini bog‘laydi.', '@RestController\n@RequestMapping("/api/courses")\nclass CourseController {\n  @GetMapping List<Course> all() { return service.findAll(); }\n}', 'Kurslarni qaytaruvchi GET va kurs yaratuvchi POST endpoint rejasini tuzing.', 'REST JSON javob uchun qaysi annotatsiya mos?', ['@RestController', '@ComponentScan', '@Override']],
    ['injection', 'Service, dependency injection va JPA', 'Controller HTTP bilan, service biznes qoidasi bilan, repository esa saqlash bilan shug‘ullanadi. Constructor injection dependency’ni ochiq ko‘rsatadi.', '@Service\nclass CourseService {\n  private final CourseRepository repository;\n  CourseService(CourseRepository repository) { this.repository = repository; }\n}', 'Repository’ni constructor orqali oladigan service yarating.', 'Constructor injectionning afzalligi?', ['Bog‘liqlikni aniq va testga qulay qiladi', 'Classni o‘chirmaydi', 'HTML yaratadi']],
    ['project', 'Amaliyot: Spring Boot kurs xizmati', 'CRUD, Bean Validation, JPA repository va JUnit testni ulang. Service qatlamida qoida, controllerda HTTP statusni boshqaring.', '@PostMapping\nResponseEntity<Course> create(@Valid @RequestBody CourseInput input) {\n  Course saved = service.create(input);\n  return ResponseEntity.status(201).body(saved);\n}', 'Kurs yaratish endpointiga noto‘g‘ri title va muvaffaqiyatli holat uchun test yozing.', 'Yangi resurs yaratilganda odatiy status kodi?', ['201 Created', '204 No Content', '500 Error']]
  ]),
  makeCourseTrack('csharp', 'C# va ASP.NET Core', 'C#', 'O‘rta', 'C# turlari, LINQ, ASP.NET Core API, dependency injection va test.', [
    ['syntax', 'C# turlari va class', 'C# statik tiplangan til. Class obyekt modelini belgilaydi; nullable type qiymat yo‘qligini aniq ko‘rsatadi.', 'public record Course(int Id, string Title, int LessonCount);\nCourse course = new(1, "C#", 5);\nConsole.WriteLine(course.Title);', 'Course record yarating va uning nomi hamda dars sonini chiqaring.', 'Record qaysi vazifa uchun qulay?', ['Ma’lumot tashuvchi immutable model', 'CSS maketi', 'HTTP router']],
    ['collections', 'Collection, LINQ va async', 'LINQ ro‘yxatni filter va select bilan ifodalaydi. Async I/O kutishida thread’ni band qilmasdan, task orqali natijani qaytaradi.', 'var active = courses\n  .Where(course => course.IsPublished)\n  .Select(course => course.Title)\n  .ToList();', 'Faqat chop etilgan kurslarning nomlarini LINQ bilan ajrating.', 'LINQ’dagi Where nima qiladi?', ['Shartga mos elementlarni filtrlaydi', 'Elementlarni o‘chiradi', 'Serverni tinglaydi']],
    ['webapi', 'ASP.NET Core Web API', 'Minimal API route’larni ixcham yozadi; Controller API’ni katta loyihada tartiblaydi. Dependency injection framework tomonidan boshqariladi.', 'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\nvar courses = new[] { "C# kursi" };\napp.MapGet("/api/courses", () => Results.Ok(courses));\napp.Run();', 'GET /api/courses endpointiga 200 va bo‘sh ro‘yxat qaytaring.', 'ASP.NET Core’da route’ni ixcham e’lon qilish usuli?', ['MapGet', 'MapCss', 'RouteHtml']],
    ['data-validation', 'Validation va Entity Framework Core', 'DTO tashqi request shaklini, model ichki saqlashni bildiradi. EF Core LINQ’ni SQL’ga aylantiradi; request ma’lumotini tekshirib keyin saqlang.', 'public record CreateCourse([Required, MaxLength(120)] string Title);\napp.MapPost("/api/courses", async (CreateCourse input, AppDb db) => {\n  var course = new Course { Title = input.Title };\n  db.Courses.Add(course); await db.SaveChangesAsync();\n  return Results.Created($"/api/courses/{course.Id}", course);\n});', 'Title majburiy bo‘lgan POST endpoint rejasini tuzing.', 'Request DTO nima uchun ishlatiladi?', ['Tashqi kiruvchi maydonlarni ajratish va tekshirish uchun', 'CSS’ni almashtirish uchun', 'Logni o‘chirish uchun']],
    ['project', 'Amaliyot: ASP.NET kurs API', 'Minimal API yoki controller, EF Core migration, validatsiya va xotira bazasidagi testni ulang. Xato statuslarini ham tekshiring.', 'var response = await client.PostAsJsonAsync("/api/courses", new { Title = "C# asoslari" });\nAssert.Equal(HttpStatusCode.Created, response.StatusCode);', 'Kurs yaratish, ro‘yxat olish va noto‘g‘ri so‘rovni tekshiruvchi testlar yozing.', 'Integration test odatda nimani tekshiradi?', ['Bir nechta qatlam birgalikda ishlashini', 'Faqat bitta CSS rangini', 'Kompilyator versiyasini']]
  ]),
  makeCourseTrack('go', 'Go backend', 'GO', 'O‘rta', 'Go sintaksisi, struct/interface, goroutine, HTTP server va test asoslari.', [
    ['basics', 'Go sintaksisi va qiymatlar', 'Go sodda sintaksis va aniq xatolar bilan ishlashni rag‘batlantiradi. := yangi o‘zgaruvchi e’lon qiladi, struct esa ma’lumotni birlashtiradi.', 'package main\nimport "fmt"\nfunc main() {\n  title := "Go API"\n  fmt.Println(title)\n}', 'Kurs nomi va darslar sonini chiqaradigan kichik Go dasturi yozing.', 'Go’da qisqa o‘zgaruvchi e’loni?', [':=', '=', 'let']],
    ['structs', 'Struct, method va interface', 'Struct ma’lumotni, method unga tegishli xulqni belgilaydi. Interface kerakli methodlarni sanab, implementation’larni bo‘sh bog‘laydi.', 'type Course struct { ID int; Title string }\nfunc (c Course) Label() string { return c.Title }\ntype CourseStore interface { FindAll() ([]Course, error) }', 'Course struct va uni qaytaradigan repository interface yarating.', 'Go interface odatda nimani belgilaydi?', ['Methodlar to‘plamini', 'Class merosini', 'Database jadvalini']],
    ['http', 'HTTP handler va JSON', 'net/http paketida handler request’ni oladi va response yozadi. JSON encoder struct maydonlarini JSON javobga aylantiradi.', 'func listCourses(w http.ResponseWriter, r *http.Request) {\n  w.Header().Set("Content-Type", "application/json")\n  json.NewEncoder(w).Encode(courses)\n}', 'GET /courses handler yozing va JSON content type belgilang.', 'Go HTTP serverining asosiy standart paketi?', ['net/http', 'web/server', 'go/router']],
    ['errors-concurrency', 'Xatolar va goroutine', 'Go xatoni qaytarish qiymati sifatida ochiq ko‘rsatadi. Goroutine yengil parallel ishni bajaradi; umumiy holatni mutex yoki channel bilan xavfsiz boshqaring.', 'result, err := store.Find(id)\nif err != nil {\n  http.Error(w, "Kurs topilmadi", http.StatusNotFound)\n  return\n}\ngo refreshCache()', 'Repository xatosiga mos HTTP status qaytaradigan handler yozing.', 'Go funksiyasi xatoni odatda qanday uzatadi?', ['Alohida error qaytarish qiymati bilan', 'Faqat global o‘zgaruvchi bilan', 'CSS class bilan']],
    ['project', 'Amaliyot: Go kurslar xizmati', 'Handler, service interface, JSON validatsiya va table-driven testni birlashtiring. Kontekst orqali so‘rov bekor qilinganini ham hisobga oling.', 'func TestListCourses(t *testing.T) {\n  req := httptest.NewRequest(http.MethodGet, "/courses", nil)\n  rec := httptest.NewRecorder()\n  listCourses(rec, req)\n  if rec.Code != http.StatusOK { t.Fatalf("status = %d", rec.Code) }\n}', 'Kurslar endpointi uchun muvaffaqiyatli va topilmagan holat testini yozing.', 'Go test fayli odatda qaysi suffix bilan tugaydi?', ['_test.go', '.spec.go', '.check.go']]
  ]),
  makeCourseTrack('ruby', 'Ruby va Rails', 'RB', 'Amaliyot', 'Ruby sintaksisi, enumerable, Rails MVC, Active Record va request test.', [
    ['syntax', 'Ruby sintaksisi va collection', 'Ruby ifodali sintaksisga ega. Array va Hash ma’lumot saqlaydi, Enumerable metodlari filter/map kabi amallarni ixcham ifodalaydi.', 'courses = [{ title: "Ruby", active: true }, { title: "Rails", active: false }]\nactive_titles = courses.select { |course| course[:active] }.map { |course| course[:title] }', 'Faol kurslar nomini select va map bilan ajrating.', 'Ruby’da kalit-qiymat xaritasi qaysi?', ['Hash', 'Tuple', 'StructList']],
    ['methods-blocks', 'Method, block va class', 'Method obyekt xulqini nomlaydi. Block kod bo‘lagini methodga uzatadi; class umumiy xususiyat va metodlarni birlashtiradi.', 'class Course\n  attr_reader :title\n  def initialize(title)\n    @title = title\n  end\nend', 'title o‘qiladigan Course klassini yarating.', 'Ruby instance variable qanday boshlanadi?', ['@', '$$', '#']],
    ['rails-mvc', 'Rails route va MVC', 'Rails MVC model, view va controller vazifalarini ajratadi. Route so‘rovni controllerga olib boradi, controller esa model bilan ishlaydi.', 'Rails.application.routes.draw do\n  resources :courses, only: [:index, :show, :create]\nend', 'Kurslarni list/detail/create qilish uchun REST route yozing.', 'resources :courses odatda nimani yaratadi?', ['RESTful route’lar to‘plamini', 'CSS classlarni', 'Database backupni']],
    ['activerecord', 'Active Record va validatsiya', 'Active Record modelni jadvalga bog‘laydi. Validatsiya noto‘g‘ri qiymatni saqlashdan oldin rad etadi; migration schema o‘zgarishini versiyalaydi.', 'class Course < ApplicationRecord\n  validates :title, presence: true, length: { maximum: 120 }\nend', 'Kurs nomi majburiy va 120 belgidan oshmasligi uchun validation yozing.', 'Model validation qachon ishlaydi?', ['Saqlashdan oldin', 'Faqat CSS yuklanganda', 'Faqat route ochilganda']],
    ['project', 'Amaliyot: Rails JSON API', 'Controller, model validation, migration va request spec’ni birlashtiring. JSON javobda keraksiz maydonlarni oshkor qilmay, statuslarni to‘g‘ri tanlang.', 'get "/api/courses"\nexpect(response).to have_http_status(:ok)\nexpect(response.parsed_body).to be_an(Array)', 'Kurs ro‘yxati va noto‘g‘ri kurs yaratish request testlarini yozing.', 'Request spec nimani tekshiradi?', ['HTTP endpointning tashqi xulqini', 'Faqat Ruby formatterini', 'Faqat database backupni']]
  ]),
  makeCourseTrack('rust', 'Rust backend', 'RS', 'O‘rta', 'Rust ownership, struct/enum, Result, axum endpoint va xavfsiz xatolar.', [
    ['ownership', 'Ownership va borrowing', 'Rust ownership orqali xotira xavfsizligini runtime garbage collector’siz ta’minlaydi. Borrowing qiymatni vaqtincha qarzga beradi; &mut yagona o‘zgaruvchan qarz bo‘ladi.', 'fn title_length(title: &String) -> usize {\n    title.len()\n}\nfn main() {\n    let course = String::from("Rust");\n    println!("{}", title_length(&course));\n}', 'String’ni ownership’ini ko‘chirmasdan funksiya ichida o‘qing.', 'Immutable reference qaysi belgi bilan yoziladi?', ['&T', '*T', 'mut T']],
    ['types', 'Struct, enum va pattern match', 'Struct bog‘liq maydonlarni, enum esa aniq variantlarni ifodalaydi. match barcha variantlarni ko‘rib chiqishga majbur qiladi.', 'enum CourseState { Draft, Published, Archived }\nfn label(state: CourseState) -> &\'static str {\n    match state {\n        CourseState::Draft => "Qoralama",\n        CourseState::Published => "Ochiq",\n        CourseState::Archived => "Arxiv",\n    }\n}', 'Kurs holatlari uchun enum yarating va har biriga yorliq qaytaring.', 'match’ning foydali xususiyati qaysi?', ['Barcha variantlarni qamrab olishni tekshiradi', 'Xatoni yashiradi', 'SQL yozadi']],
    ['result', 'Result, Option va xato boshqaruvi', 'Option qiymat bor-yo‘qligini, Result muvaffaqiyat yoki xatoni ifodalaydi. ? operatori xatoni chaqiruvchiga uzatishni soddalashtiradi.', 'fn find_course(id: i32) -> Result<Course, AppError> {\n    let course = repository::find(id)?;\n    Ok(course)\n}', 'Topilmagan kursni Result orqali aniq xato bilan qaytaring.', 'Result’ning ikki asosiy varianti?', ['Ok va Err', 'Some va None', 'True va False']],
    ['web', 'Axum route va async handler', 'Axum Tokio ekotizimida async HTTP handler yozadi. Extractor request’dan JSON/path qiymatlarini xavfsiz ajratadi.', 'async fn get_course(Path(id): Path<i32>) -> Result<Json<Course>, AppError> {\n    let course = service::find(id).await?;\n    Ok(Json(course))\n}', 'ID oladigan async handler yozing va xato variantini belgilang.', 'Rust’da asinxron funksiyani qaysi keyword belgilaydi?', ['async', 'awaiting', 'promise']],
    ['project', 'Amaliyot: Rust JSON API', 'Axum, service qatlam, serde model, Result xatolari va testni birlashtiring. Inputni tekshiring, maxfiy ichki xatolarni client’ga chiqarmang.', '#[tokio::test]\nasync fn missing_course_returns_not_found() {\n    let response = app.oneshot(request).await.unwrap();\n    assert_eq!(response.status(), StatusCode::NOT_FOUND);\n}', 'Muvaffaqiyatli va 404 holatlarini qamrab oladigan endpoint test rejasini yozing.', 'Serde odatda nima uchun ishlatiladi?', ['Rust qiymatini JSON kabi formatga o‘girish uchun', 'Memory’ni qo‘lda bo‘shatish uchun', 'CSS yozish uchun']]
  ]),
  makeCourseTrack('kotlin', 'Kotlin backend', 'KT', 'O‘rta', 'Kotlin null safety, data class, coroutine, Ktor/Spring API va test.', [
    ['basics', 'Kotlin sintaksisi va null safety', 'Kotlin val o‘zgarmas bog‘lanish, var o‘zgaruvchan bog‘lanish uchun. Nullable tur ? bilan belgilanadi; safe call null holatini xavfsiz boshqaradi.', 'val title: String = "Kotlin"\nvar lessons = 5\nval subtitle: String? = null\nprintln(subtitle?.length ?: 0)', 'Null bo‘lishi mumkin bo‘lgan tavsifni crashsiz ko‘rsating.', 'Nullable type qanday belgilanadi?', ['?', '!', '*']],
    ['data', 'Data class va collection', 'Data class ma’lumot obyektlariga equals, copy va toString kabi metodlarni yaratadi. Collection filter/map kabi yuqori darajali amallarni qo‘llaydi.', 'data class Course(val id: Long, val title: String)\nval titles = courses\n  .filter { it.published }\n  .map { it.title }', 'Faqat ochiq kurslarning nomini data class’dan ajratib oling.', 'data class’ning afzalligi?', ['Ma’lumot obyektlari uchun tayyor metodlar', 'SQL serverni o‘rnatish', 'HTML parser']],
    ['coroutines', 'Coroutine va suspend', 'Coroutine asinxron ishni thread’ni to‘smasdan ifodalaydi. suspend fun coroutine ichidan chaqiriladi; xatolarni structured concurrency bilan boshqaring.', 'suspend fun loadCourses(): List<Course> =\n  withContext(Dispatchers.IO) { repository.findAll() }', 'I/O ishini IO dispatcher’da bajaradigan service funksiyasi yozing.', 'suspend keyword nimani bildiradi?', ['Funksiya coroutine ichida to‘xtab davom eta oladi', 'Funksiya har doim sinxron', 'Funksiya HTML qaytaradi']],
    ['ktor', 'Ktor route va serialization', 'Ktor plugin’lari routing, JSON serialization va content negotiation’ni boshqaradi. Route request’ni service’ga uzatib javob qaytaradi.', 'import kotlinx.serialization.Serializable\nimport io.ktor.server.plugins.contentnegotiation.*\nimport io.ktor.serialization.kotlinx.json.*\n@Serializable data class Course(val id: Int, val title: String)\nfun Application.module() {\n  install(ContentNegotiation) { json() }\n  routing {\n    get("/courses") { call.respond(listOf(Course(1, "Kotlin"))) }\n  }\n}', 'GET /courses route yarating va JSON javobini yoqing.', 'Ktor’da endpointlarni qaysi blok ichida tuzasiz?', ['routing', 'stylesheet', 'activity']],
    ['project', 'Amaliyot: Kotlin backend API', 'Ktor yoki Spring Boot’da CRUD route, DTO validation, coroutine service va test yozing. Xato, loading va not-found holatlarining API javobini rejalang.', '@Test\nfun `unknown course returns 404`() = testApplication {\n  val response = client.get("/courses/999")\n  assertEquals(HttpStatusCode.NotFound, response.status)\n}', 'Kurs yaratish va mavjud bo‘lmagan kursni olish uchun test yozing.', 'Ktor testApplication nimani sinaydi?', ['HTTP ilovani test muhitida', 'Android ekran o‘lchamini', 'Gradle cache’ni']]
  ])
);

starterCourses.push(makeCourseTrack('backend-project', 'Kurslar API: to‘liq backend loyiha', 'API+', 'Amaliy loyiha', 'Node.js va Express’dan boshlab ma’lumotlar bazasi, autentifikatsiya, test va deploygacha ishlaydigan API yarating.', [
  ['plan', 'Loyiha tuzilishi va serverni ishga tushirish', 'Backend loyiha qatlamlarga ajraladi: route HTTP manzilini, controller so‘rov-javobni, service biznes qoidasini, repository esa saqlashni boshqaradi. Avval bitta kichik oqimni ishga tushiring.', 'src/\n  routes/courseRoutes.js\n  controllers/courseController.js\n  services/courseService.js\n  repositories/courseRepository.js\n  app.js\nserver.js', 'Papkalarni yarating, Express serverni ishga tushiring va GET /health endpointiga 200 javob qaytaring.', 'HTTP URL’ni qaysi qatlam route handler’ga bog‘laydi?', ['Route', 'CSS', 'Database jadvali']],
  ['rest', 'REST endpointlar va CRUD', 'Resurs nomini URL’da ko‘plikda bering. GET o‘qiydi, POST yaratadi, PATCH qisman yangilaydi, DELETE o‘chiradi. Har endpoint bitta aniq vazifani bajarsin.', 'GET    /api/courses\nGET    /api/courses/:id\nPOST   /api/courses\nPATCH  /api/courses/:id\nDELETE /api/courses/:id', 'Kurslar uchun beshta route yarating; hozircha xotiradagi massivdan foydalanib CRUD’ni tekshiring.', 'Yangi kurs yaratish uchun qaysi HTTP metodi ishlatiladi?', ['POST', 'GET', 'DELETE']],
  ['validation', 'Kiritmani tekshirish va status kodlari', 'Client yuborgan ma’lumotga ishonmang. title bo‘sh emasligi va uzunligini tekshiring; muvaffaqiyatda 201, topilmaganda 404, xato kiritmada 400 qaytaring.', 'function validateCourse(input) {\n  if (!input || typeof input.title !== "string" || !input.title.trim()) {\n    return { error: "Kurs nomi majburiy" };\n  }\n  return { value: { title: input.title.trim() } };\n}', 'Bo‘sh nom uchun 400, to‘g‘ri nom uchun 201 qaytaradigan POST oqimini yozing.', 'Yaratish muvaffaqiyatli bo‘lganda mos status qaysi?', ['201', '200', '500']],
  ['database', 'PostgreSQL jadvali va bog‘lanishlar', 'Jadval ma’lumotni doimiy saqlaydi. Primary key yozuvni taniydi; foreign key jadvallarni bog‘laydi. So‘rovlarda parametr ishlating, qiymatni SQL matniga qo‘shib yubormang.', 'CREATE TABLE courses (\n  id BIGSERIAL PRIMARY KEY,\n  title VARCHAR(120) NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);\nSELECT id, title FROM courses WHERE id = $1;', 'courses jadvalini yarating va ID bo‘yicha bitta kursni parametrli so‘rov bilan oling.', 'So‘rov qiymatini SQL ichiga xavfsiz uzatish usuli?', ['Parametrli query', 'String biriktirish', 'HTML escape']],
  ['auth', 'Autentifikatsiya va ruxsatlar', 'Autentifikatsiya foydalanuvchi kimligini tekshiradi; authorization esa qaysi amalni bajarishi mumkinligini tekshiradi. Parolni ochiq saqlamang, xavfsiz hash va qisqa muddatli session/token qo‘llang.', 'const passwordHash = await hashPassword(password);\nconst valid = await verifyPassword(inputPassword, passwordHash);\nif (!valid) return res.status(401).json({ error: "Kirish rad etildi" });\nif (user.role !== "admin") return res.sendStatus(403);', 'Login va admin-only DELETE route oqimini chizing; 401 va 403 farqini misolda ko‘rsating.', 'Foydalanuvchi tanildi, lekin amal qilish huquqi yo‘q. Qaysi status?', ['403', '401', '201']],
  ['errors', 'Markaziy xatolar va loglar', 'Xatoni bitta joyda ushlash javob shaklini barqaror qiladi. Client’ga tushunarli xabar bering, lekin stack trace, token yoki parolni javob va logga chiqarmang.', 'app.use((error, req, res, next) => {\n  console.error(error.message);\n  res.status(error.status || 500).json({ error: "So‘rovni bajarib bo‘lmadi" });\n});', 'Topilmagan kurs va server xatosi uchun bir xil JSON shaklida, mos status bilan javob yarating.', 'Ichki stack trace’ni production API javobida yuborish kerakmi?', ['Yo‘q, maxfiy ichki tafsilot', 'Ha, doim yuborish kerak', 'Faqat HTML bilan yuborish kerak']],
  ['tests', 'API testlari va chekka holatlar', 'Test endpointni haqiqiy HTTP oqimi kabi chaqiradi. Muvaffaqiyat bilan birga bo‘sh input, topilmagan ID va ruxsatsiz so‘rovni ham sinang.', 'const response = await request(app)\n  .post("/api/courses")\n  .send({ title: "Backend asoslari" });\nexpect(response.status).toBe(201);\nexpect(response.body.title).toBe("Backend asoslari");', 'POST muvaffaqiyati, 400 validatsiya xatosi va 404 holati uchun uchta test yozing.', 'Test nimani tekshiradi?', ['Kutilgan status va javob mazmunini', 'Faqat kod rangini', 'Faqat papka nomini']],
  ['deploy', 'Environment va deploy', 'Port va maxfiy kalitlar kodga yozilmaydi. Environment orqali beriladi. Deploydan oldin migration, health endpoint, log, CORS va production xatolarini tekshiring.', 'const port = process.env.PORT || 3000;\nconst databaseUrl = process.env.DATABASE_URL;\nif (!databaseUrl) throw new Error("DATABASE_URL sozlanmagan");\napp.listen(port);', 'Mahalliy `.env` va production environment’ni sozlang; sirlarni Git’ga kiritmaslikni tekshiring.', 'DATABASE_URL kabi maxfiy sozlamani qayerda saqlash kerak?', ['Environment/secret manager’da', 'Git ichida', 'Frontend HTML’da']]
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

const storedCourses = readStore(STORAGE.courses, null);
let courses = storedCourses || starterCourses;
let expandedCourseId = courses[0]?.id || null;
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
function syncStarterCatalog() {
  if (!storedCourses) {
    localStorage.setItem(STORAGE.catalogVersion, '6');
    saveCourses();
    return;
  }
  if (localStorage.getItem(STORAGE.catalogVersion) === '6') return;
  const existingCourses = courses;
  courses = starterCourses.map(starter => {
    const existing = existingCourses.find(course => course.id === starter.id);
    if (!existing) return JSON.parse(JSON.stringify(starter));
    const savedLessons = existing.lessons || [];
    const starterIds = new Set(starter.lessons.map(lesson => lesson.id));
    const orderedLessons = starter.lessons.map(lesson => savedLessons.find(saved => saved.id === lesson.id) || lesson);
    const customLessons = savedLessons.filter(lesson => !starterIds.has(lesson.id));
    return { ...existing, lessons: [...orderedLessons, ...customLessons] };
  }).concat(existingCourses.filter(course => !starterCourses.some(starter => starter.id === course.id)));
  localStorage.setItem(STORAGE.catalogVersion, '6');
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
  if (courseId === 'roadmap' && lessonId === 'roadmap-git') return 'SHELL';
  if (courseId === 'roadmap') return 'TEXT';
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
  backend: { why: 'Backend so‘rovlarni tekshiradi, biznes qoidalarini bajaradi va ma’lumotni xavfsiz saqlaydi yoki qaytaradi.', example: 'Kurslar API’si, login, CRUD endpointlari va SQL bazasi.' },
  'backend-project': { why: 'Bu yakuniy yo‘nalish backend bilimlarini bitta ishlaydigan API loyihasiga yig‘adi: so‘rovdan bazagacha va testdan deploygacha.', example: 'Express API → PostgreSQL → validatsiya va login → test → deploy.' },
  typescript: { why: 'TypeScript qiymatlar shaklini oldindan tekshiradi va katta JavaScript loyihalaridagi xatolarni erta ko‘rsatadi.', example: 'API javobi, komponent propsi va bir nechta holatli formani aniq tiplash.' },
  vue: { why: 'Vue reaktiv ma’lumotni template bilan bog‘lab, interfeysni komponentlarda tartibli quradi.', example: 'Qidiruvli kurs katalogi va tanlangan kurs tafsilot sahifasi.' },
  angular: { why: 'Angular to‘liq framework sifatida komponent, service, router va forma qatlamlarini yagona tartibda beradi.', example: 'Katta kurs portalidagi route’lar, API service va tekshiriladigan formalar.' },
  svelte: { why: 'Svelte komponentlarni build vaqtida samarali JavaScript’ga aylantiradi va reaktiv holatni sodda yozishga yordam beradi.', example: 'Filtrlanadigan vazifalar ro‘yxati yoki yengil darslar katalogi.' },
  nextjs: { why: 'Next.js React sahifalarini server va client vazifalariga ajratib, routing hamda ma’lumot olishni зохион байгуулна.', example: 'Tez yuklanadigan kurs sahifalari, qidiruv va batafsil route’lar.' },
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

// Kengaytirilgan dars kartalari: oddiy ta'rifdan amaliy tushunishgacha.
const LESSON_DEEP_DIVE = {
'html-structure':['HTML faylning skeletini tushunish','DOCTYPE hujjat turini bildiradi.','html lang="uz" sahifa tilini bildiradi.','head metama’lumotlarni, body ko‘rinadigan kontentni saqlaydi.','head va body vazifalarini almashtirmang; meta viewportni unutmang.','Sarlavha, paragraf va havolali to‘liq HTML hujjat tuzing.'],
'html-text':['Mazmunning sarlavha ierarxiyasini tuzish','h1 asosiy sarlavha; h2 bo‘lim; h3 kichik bo‘lim uchun.','p paragraf, strong muhimlik, em urg‘u beradi.','Sarlavha darajasini faqat katta shrift olish uchun tanlamang.','HTML haqida h1, ikkita h2 va uchta paragrafli maqola yozing.'],
'html-links':['Ichki va tashqi manzilga to‘g‘ri havola berish','a havola yaratadi, href esa manzilni belgilaydi.','#contact sahifa ichidagi id ga olib boradi.','Noaniq “bu yerga bosing” matnidan va buzilgan yo‘llardan qoching.','Ichki sahifa, tashqi sayt va #aloqa bo‘limiga uchta havola yarating.'],
'html-images':['Rasmni to‘g‘ri va qulay ko‘rsatish','src rasm yo‘li, alt esa rasmning mazmuniy izohidir.','figure va figcaption rasmni izohi bilan guruhlaydi.','alt ni fayl nomi bilan to‘ldirmang; src yo‘lini tekshiring.','Rasmga alt, width va figcaption qo‘shing.'],
'html-lists':['Ro‘yxat va jadvalni mazmuniga mos tanlash','ul punktli, ol raqamli ro‘yxat; li ro‘yxat bandidir.','table ichida tr satr, th sarlavha, td ma’lumot katagi.','Jadvalni sahifa maketi uchun ishlatmang; li teglarini unutmang.','Uch fanli ro‘yxat va uch ustunli ishchilar jadvali yarating.'],
'html-semantic':['Semantik sahifa va foydalanuvchi formasi','header, nav, main, section va footer turli ma’nodagi qismlarni bildiradi.','label for qiymati input id bilan mos bo‘lsin; name forma maydonini nomlaydi.','Inputga label bermaslik va barcha joyda div ishlatishdan qoching.','Ism va email maydonli forma bilan semantik sahifa tuzing.'],
'css-selectors':['Kerakli elementni selektor orqali topish','.class qayta ishlatiladi; #id odatda yagona elementni belgilaydi.','nav a nav ichidagi havolalarni, :hover esa hover holatini tanlaydi.','Class oldidan nuqtani va id oldidan # belgisini unutmang.','Uch kartani bezang va havolaga hover holati qo‘shing.'],
'css-colors':['Rang tizimini bir joydan boshqarish','Hex va rgb rang yozish usullari; :root umumiy o‘zgaruvchilar uchun.','--brand ni e’lon qiling va var(--brand) orqali qo‘llang.','O‘zgaruvchi nomini xato yozmang; matn-fon kontrastini tekshiring.','Asosiy rang, matn rangi va fon o‘zgaruvchilarini yarating.'],
'css-typography':['Matnni o‘qilishi qulay qilish','font-family shriftni, font-size o‘lchamni belgilaydi.','line-height satr oralig‘i; max-width:65ch paragraf kengligini cheklaydi.','Juda kichik shrift va haddan tashqari uzun satrlardan qoching.','Body uchun shrift va line-height, paragraf uchun max-width belgilang.'],
'css-box':['Element o‘lchami va masofalarni tushunish','content mazmun, padding ichki bo‘shliq, border chegara, margin tashqi bo‘shliq.','box-sizing:border-box padding va borderni width hisobiga kiritadi.','Ichki bo‘shliq uchun margin ishlatish yoki width oshib ketishini unutish keng tarqalgan xato.','280px karta yarating va padding, border, marginni turlicha o‘zgartiring.'],
'css-layout':['Flexbox bilan tekislash','Ota elementga display:flex beriladi.','justify-content asosiy o‘q, align-items ko‘ndalang o‘qni boshqaradi.','Flex xususiyatlarini bolaga emas, flex konteynerga yozing.','Logo chapda, tugma o‘ngda turadigan toolbar yarating.'],
'css-grid':['Ikki o‘lchamli karta maketi','display:grid Gridni yoqadi.','repeat(3,1fr) uch teng ustun; gap elementlar orasini ochadi.','Mobil ekranda ham uch ustunni majburlab qo‘ymang.','auto-fit va minmax(220px,1fr) bilan kurs kartalari yasang.'],
'css-responsive':['Telefon va desktop uchun moslashuvchan maket','Avval bir ustunli mobil maket tuzing.','@media ma’lum kenglikdan boshlab yangi CSS qoidalarini qo‘llaydi.','Qat’iy katta width va gorizontal scroll borligini tekshirmaslikdan qoching.','700px dan kichikda bir ustun, kattada uch ustun qiling.'],
'css-position':['Elementlarni qatlam va burchaklarda joylash','relative o‘z joyini saqlaydi; absolute pozitsiyalangan ota elementga nisbatan joylashadi.','fixed viewportga nisbatan; z-index qatlam tartibiga ta’sir qiladi.','Absolute belgi uchun ota elementga position:relative berishni unutmang.','Karta o‘ng yuqori burchagiga “Yangi” belgisini joylashtiring.'],
'css-states':['Interaktiv holat va fokusni ko‘rsatish',':hover sichqoncha, :focus-visible klaviatura fokusi holatidir.','transition o‘zgarishni silliqlashtiradi; :disabled faol bo‘lmagan tugmani belgilaydi.','outline:none bilan fokusni butunlay olib tashlamang.','Tugmaga hover, focus-visible va disabled holatlarini qo‘shing.'],
'css-project':['CSS bilimlarini bitta real maketga birlashtirish','Rang, radius va masofalarni o‘zgaruvchilarda boshqaring.','Grid, box model, hover va media queryni birgalikda qo‘llang.','Takroriy CSS, past kontrast va faqat desktopda tekshirishdan qoching.','Uchta kurs kartali responsive katalogni yakunlang.'],
'js-variables':['Qiymatlarni saqlash va o‘zgartirish','const qayta tayinlanmaydi; let qiymati o‘zgaradigan holatlar uchun.','Ma’noli nom tanlang va imkon bo‘lsa const dan boshlang.','const ni qayta tayinlamang; JavaScript katta-kichik harfni farqlaydi.','Mahsulot nomi/narxini const, savat sonini let bilan saqlang.'],
'js-types':['JavaScript qiymat turlarini farqlash','string matn, number son, boolean true/false qiymati.','Array ro‘yxat, object esa nomlangan xususiyatlar to‘plami.','"25" matn va 25 son bir xil emas; massiv indeksi 0 dan boshlanadi.','Talaba obyektini va kurslar massivini yarating, maydonlarini konsolga chiqaring.'],
'js-conditions':['Shart bilan qaror qabul qilish','if shart rost bo‘lsa ishlaydi, else boshqa holatni bajaradi.','=== qiymat va turini solishtiradi; = qiymat tayinlaydi.','Chegara qiymatni tekshiring va = bilan === ni adashtirmang.','Ball 60 yoki yuqori bo‘lsa “O‘tdi”, aks holda “Qayta urin” chiqaring.'],
'js-loops':['Bir amalni ko‘p qiymatga qo‘llash','for indeksni boshqarishga, for...of qiymatlarni o‘qishga qulay.','Sikl tanadagi kodni har bir element uchun takrorlaydi.','Sikl sharti xato bo‘lsa cheksiz aylanish yoki elementni tashlab ketish mumkin.','1–10 sonlarni chiqaring va massivdan juft sonlarni ajrating.'],
'js-functions':['Qayta ishlatiladigan kod yozish','Parametr funksiya kirishidagi nom; argument chaqiruvda berilgan qiymat.','return natijani chaqirgan joyga qaytaradi.','Funksiyani chaqirishni unutmang; console.log va return bir xil emas.','Ikki sonni qabul qilib, yig‘indisini qaytaradigan funksiya yozing.'],
'js-arrays':['Ro‘yxat ustida map, filter va find ishlatish','map har elementdan yangi qiymat, filter shartga mos ro‘yxat yaratadi.','find birinchi mos elementni qaytaradi; push oxiriga element qo‘shadi.','map/filter natijasini saqlang va bo‘sh massivni ham hisobga oling.','Mahsulotlardan arzonlarini filter qilib, nomlarini map bilan chiqaring.'],
'js-objects':['Bog‘liq qiymatlarni obyektga yig‘ish','Obyekt maydoni course.title kabi nuqta bilan olinadi.','const { title } = course destructuring orqali qiymat ajratadi.','Maydon nomini tekshiring; obyektni massiv bilan adashtirmang.','Mahsulot obyektidan name va price qiymatlarini destructuring bilan oling.'],
'js-dom':['JavaScript orqali HTMLni boshqarish','querySelector CSS selektoriga mos birinchi elementni topadi.','textContent matnni, classList esa classlarni boshqaradi.','Element topilmasligi mumkin; oddiy matn uchun innerHTML ishlatishdan qoching.','Tugma bosilganda paragraf matnini va classini almashtiring.'],
'js-events':['Foydalanuvchi harakatiga javob berish','addEventListener hodisa nomi va callback funksiyasini qabul qiladi.','click tugma bosilganda, input maydon qiymati o‘zgarganda ishlaydi.','Handlerni darhol chaqirib yubormang; forma submitini ham boshqaring.','+1 va Reset tugmalari bilan hisoblagich yarating.'],
'js-storage':['Forma ma’lumotini saqlab qayta tiklash','preventDefault forma yuborilganda sahifa qayta yuklanishini to‘xtatadi.','LocalStorage string saqlaydi; JSON.stringify va JSON.parse obyektni aylantiradi.','Parolni LocalStorage’da saqlamang; parse xatosini ham hisobga oling.','Vazifa qo‘shing, saqlang va sahifa yangilanganda tiklang.'],
'js-async':['API so‘rovini kutish va xatoni boshqarish','fetch Promise qaytaradi; async/await kutishni o‘qilishi oson qiladi.','response.ok ni tekshiring, so‘ng response.json() ni await qiling.','fetch 404 uchun avtomatik throw qilmaydi; loading/error holatlarini ko‘rsating.','API dan ma’lumot olib loading, error va natija holatlarini yarating.'],
'js-project':['DOM, hodisalar va saqlashni yakuniy loyihaga qo‘shish','Vazifaga id, title va done maydonlarini bering.','Qo‘shish, bajarildi, o‘chirish va saqlash funksiyalarini ajrating.','Bo‘sh vazifani rad eting va UI bilan saqlangan ma’lumotni bir xil tuting.','Barcha/bajarilgan/bajarilmagan filtrli vazifalar ilovasini yarating.']
};
function renderDeepDive(lesson) {
  const data = LESSON_DEEP_DIVE[lesson.id];
  if (!data) return '';
  const [goal, step1, step2, step3, pitfalls, challenge] = data;
  return `<section class="deep-dive"><div class="deep-dive-heading"><span class="deep-dive-kicker">DEVHUB · USTOZ TUSHUNTIRISHI</span><h2>Mavzuni chuqur tushunamiz</h2><p>${escapeHtml(goal)}</p></div><div class="deep-dive-section"><h3><span>01</span> Qadam-baqadam</h3><ol class="deep-dive-steps"><li>${escapeHtml(step1)}</li><li>${escapeHtml(step2)}</li><li>${escapeHtml(step3)}</li><li>${escapeHtml(lesson.summary)}</li></ol></div><div class="deep-dive-section deep-dive-result"><h3><span>02</span> Muhim ogohlantirish</h3><p>${escapeHtml(pitfalls)}</p></div><div class="deep-dive-section deep-dive-challenge"><h3><span>03</span> Ustoz sinovi</h3><p>${escapeHtml(challenge)}</p><p class="deep-dive-hint">Maslahat: kodni shunchaki ko‘chirmang. Bir qiymatni o‘zgartiring, natijani kuzating va nima uchun shunday bo‘lganini o‘zingiz tushuntiring.</p></div></section>`;
}

function renderLessonGuide(lesson, course) {
  const guide = COURSE_LEARNING_GUIDES[course?.id] || { why: 'Bu mavzu dasturdagi ma’lumotni tushunish va foydalanuvchiga foydali natija berishga yordam beradi.', example: 'Mavzudagi kichik qismni haqiqiy loyiha vazifasiga qo‘llang.' };
  const concepts = lessonConcepts(lesson);
  const mainConcept = concepts[0];
  const extraConcepts = concepts.slice(1);
  return `<section class="lesson-overview"><span class="eyebrow">BUGUNGI MAVZU</span><p class="lesson-summary">${escapeHtml(lesson.summary)}</p><div class="learning-callout callout-blue"><span class="callout-icon" aria-hidden="true">1</span><div><strong>ASOSIY QOIDA · ${escapeHtml(mainConcept.title)}</strong><p>${escapeHtml(mainConcept.detail)}</p></div></div><div class="learning-callout callout-green"><span class="callout-icon" aria-hidden="true">✓</span><div><strong>AMALDA QAYERDA KERAK?</strong><p>${escapeHtml(guide.example)}</p></div></div><details class="lesson-extra"><summary>Qo‘shimcha tushuntirish</summary><div class="lesson-guide"><h2>Nima uchun bu mavzu kerak?</h2><p>${escapeHtml(guide.why)}</p>${extraConcepts.length ? `<div class="concept-grid">${extraConcepts.map((concept, index) => `<article class="concept-card"><span class="concept-index">0${index + 2}</span><h3>${escapeHtml(concept.title)}</h3><p>${escapeHtml(concept.detail)}</p></article>`).join('')}</div>` : ''}</div></details></section>${renderDeepDive(lesson)}`;
}
function explainCodeLine(line, language) {
  const source = line.trim();
  if (!source) return '';
  if (/^(\/\/|#|<!--|\/\*|\*)/.test(source)) return 'Izoh: bu qator kodni o‘qiyotgan odamga maqsadni tushuntiradi; dastur uni buyruq sifatida bajarmaydi.';
  if (/^<\/?[A-Za-z]/.test(source)) return 'Markup: sahifadagi elementni ochadi, yopadi yoki unga atribut orqali qo‘shimcha ma’lumot beradi.';
  if (/^(import|from|using|package)\b/.test(source)) return 'Modul: kerakli kutubxona yoki paketni ulab, undagi tayyor imkoniyatlardan foydalanadi.';
  if (/^(async\s+)?(function|def|fn|fun)\b|^public\s+(static\s+)?/.test(source)) return 'Ta’rif: qayta ishlatiladigan funksiya yoki metod nomi va kiruvchi qiymatlarini belgilaydi.';
  if (/^(class|interface|type|enum|data\s+class|struct)\b|^@(?:Component|Service|RestController)/.test(source)) return 'Model: ma’lumot shakli yoki qayta ishlatiladigan komponent/xizmat chegarasini belgilaydi.';
  if (/^(if|else|switch|match|when)\b|^\s*(if|else)\s*\(/.test(source)) return 'Shart: qiymatga qarab qaysi yo‘l bajarilishini tanlaydi; ikkala holatni ham sinab ko‘ring.';
  if (/^(for|while)\b|\.map\(|\.filter\(|v-for|for\s*\(/.test(source)) return 'Takrorlash: ro‘yxatdagi elementlarni navbat bilan ko‘rib chiqadi yoki ulardan yangi natija hosil qiladi.';
  if (/\b(GET|POST|PATCH|DELETE)\b|\.get\(|\.post\(|MapGet|@GetMapping|@PostMapping|Route::/.test(source)) return 'Endpoint: HTTP so‘rovni manzil va metodga bog‘lab, kerakli server amalini ishga tushiradi.';
  if (/\b(SELECT|INSERT|UPDATE|DELETE)\b/.test(source)) return 'SQL: ma’lumotlar bazasidan yozuv o‘qiydi yoki jadvaldagi qiymatni o‘zgartiradi.';
  if (/\b(return|res\.json|console\.log|print|println|echo|respond)\b/.test(source)) return 'Natija: hisoblangan qiymatni qaytaradi yoki foydalanuvchi, server javobi yoxud konsolga chiqaradi.';
  if (/=|:\s/.test(source)) return language === 'CSS'
    ? 'Stil qoidasi: tanlangan element uchun ko‘rinish xususiyati va qiymatini belgilaydi.'
    : 'Qiymat: o‘zgaruvchi yoki xususiyatga ma’lumot biriktiradi; nom va qiymat keyingi qatorlarda ishlatiladi.';
  return 'Bu qator yuqoridagi tuzilmani to‘ldiradi; qaysi qiymat yoki elementga ta’sir qilishini kuzating.';
}
function renderCodeWalkthrough(lesson) {
  const language = codeLanguage(lesson.courseId, lesson.id);
  const rows = lesson.code.split('\n').map((line, index) => ({ line, index })).filter(item => item.line.trim()).slice(0, 6);
  return `<details class="code-walkthrough"><summary>Kodni qatorlar bo‘yicha tushuntirish</summary><ol>${rows.map(({ line, index }) => `<li><span class="walkthrough-line-number">${index + 1}</span><div><code>${escapeHtml(line.trim())}</code><p>${escapeHtml(explainCodeLine(line, language))}</p></div></li>`).join('')}</ol></details>`;
}
function playgroundPreset(lesson, course) {
  const title = escapeHtml(lesson.title);
  const safeText = 'Natija shu yerda ko‘rinadi.';
  const backendTracks = ['backend', 'python', 'php', 'java', 'csharp', 'go', 'ruby', 'rust', 'kotlin'];
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
      ${!register ? '<p class="hint" style="text-align:center;margin-top:20px"></p>' : ''}
      <p class="hint" style="text-align:center"</p>
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
    if (old) courses = courses.map(item => ({ ...item, lessons: item.lessons.filter(current => current.id !== old.id) }));
    const destination = courses.find(item => item.id === form.get('courseId'));
    destination.lessons.push(lesson);
    saveCourses(); modal.remove(); view = 'admin'; render(); notify(old ? 'Dars yangilandi.' : 'Yangi dars qo‘shildi.');
  }
});

render();