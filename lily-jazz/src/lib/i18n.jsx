import React, { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    tag_specialty: "Specialty Coffee · Est. 2019",
    home_title_1: "Every Cup,",
    home_title_2: "A Soft Moment",
    hover_hint: "Hover or tap the lily to bloom",
    hero_sub:
      "A botanical café where jazz softly plays and every cup is crafted with care. Bloom the lily to wander through our folio.",
    nav_home: "Home",
    nav_menu: "Menu",
    nav_story: "Our Story",
    nav_gallery: "Gallery",
    nav_location: "Location",
    nav_contact: "Contact",
    menu_kicker: "The Pour",
    menu_title: "The Menu",
    menu: [
      { name: "Ethiopian Yirgacheffe", notes: "Jasmine · Bergamot · Stone Fruit", price: "5.5", roast: "Light" },
      { name: "Colombian Supremo", notes: "Caramel · Red Apple · Cocoa", price: "5.0", roast: "Medium" },
      { name: "Sumatran Mandheling", notes: "Cedar · Dark Chocolate · Earth", price: "5.5", roast: "Dark" },
      { name: "House Cold Brew", notes: "Velvet · Brown Sugar · Citrus", price: "6.0", roast: "18-hour steep" },
      { name: "LILY Signature Latte", notes: "Honey · Vanilla · Lily Infusion", price: "6.5", roast: "House blend" },
    ],
    story_kicker: "The Composition",
    story_title: "Our Story",
    story_quote:
      "“We brew coffee the way a quartet plays a ballad — slowly, listening for the silence between the notes.”",
    story_text: `FIRST SEED
Excellence is never an accident.
It is a decision—made every single day.

We didn't start LILY because the market needed another café.
We started it because we refused to accept what the market had grown used to.

Before LILY had a name, there were years spent standing behind the espresso machine. Thousands of hours learning, testing, failing, and trying again. The goal was never to just make a better cup...
The goal was to set a benchmark that needed no comparison.

Every detail faced a single question...
Does it deserve to carry the name LILY?
If the answer was no...
It was replaced.
Redone.
Or discarded entirely.

That is why LILY wasn't built on speed, volume, or noise.
It was built on one single belief...
People don't remember what they drank; they remember how it made them feel.

That is why we don't just serve coffee.
We offer respect for your time.
Respect for your palate.
And respect for the moment you chose to spend with us.

We don't believe guests are looking for just "another cup."
They are looking for a place where someone thought of everything... before they even arrived.
From the feel of the cup...
To the aroma of the roast...
To the very last sip.

Being a guest at LILY is not ordinary.
It is a choice for a brand that never compromises, never rushes, and serves nothing unless we are truly proud to put our name on it.

Anyone can drink coffee...
But only a few truly experience it.

Welcome to LILY.
Where every detail earns its place.
And every guest earns our very best.`,
    gallery_kicker: "The Session",
    gallery_title: "Gallery",
    gallery_hint: "Gently drag the prints to rearrange the memories.",
    print_captions: ["Tuesday, late set", "The first pour", "Beans & ballads", "Sax & steam"],
    location_kicker: "Find Us",
    location_title: "Location",
    location_name: "The Little Corner",
    location_desc:
      "Tucked between the old florist and a vinyl record shop on Garden Lane. Listen for the saxophone — you'll know you've arrived.",
    address_label: "Address",
    address_line1: "14 Garden Lane, Old Quarter",
    address_line2: "Riverside District",
    hours_label: "Hours",
    hours: [
      { day: "Mon — Thu", time: "7:00 — 21:00" },
      { day: "Fri", time: "7:00 — 23:00" },
      { day: "Sat", time: "8:00 — 23:00" },
      { day: "Sun", time: "8:00 — 18:00" },
    ],
    open_maps: "Open in Maps →",
    contact_kicker: "Send a Note",
    contact_title: "Contact",
    form_name: "Your Name",
    form_email: "Email",
    form_message: "Message",
    form_submit: "Send Gently",
    form_error_name: "A name would be lovely to know.",
    form_error_email: "That email doesn't look quite right yet.",
    form_error_message: "A few words for your message?",
    form_status_writing: "Writing your note...",
    form_status_sending: "Sending your note gently, please wait.",
    thank_title: "Thank you.",
    thank_msg: "Your note has been placed beneath the lily. We'll write back soon — gently.",
    write_another: "Write another",
    contact_email: "ma749418@gmail.com",
    contact_phone: "07772334177",
    footer_tagline: "Every Cup, A Soft Moment",
    copyright: "Crafted slowly, like a ballad.",
  },
  ar: {
    tag_specialty: "قهوة مختصة · تأسيس 2019",
    home_title_1: "كل كوب،",
    home_title_2: "لحظة رقيقة",
    hover_hint: "حرك الماوس أو انقر على زهرة الزنبق لِتزهر",
    hero_sub:
      "مقهى نباتي يعزف فيه الجاز بنعومة، وكل كوب يُصنع بعناية. انقر على زهرة الزنبق لتتصفح قائمتنا.",
    nav_home: "الرئيسية",
    nav_menu: "القائمة",
    nav_story: "قصتنا",
    nav_gallery: "المعرض",
    nav_location: "الموقع",
    nav_contact: "تواصل",
    menu_kicker: "السكب",
    menu_title: "القائمة",
    menu: [
      { name: "إثيوبي ييرغاتشيف", notes: "ياسمين · برغموت · فواكه صلبة", price: "5.5", roast: "تحميص خفيف" },
      { name: "كولومبي سوبريمو", notes: "كاراميل · تفاح أحمر · كاكاو", price: "5.0", roast: "تحميص متوسط" },
      { name: "سومطري مانديلينغ", notes: "أرز · شوكولاتة داكنة · نكهة ترابية", price: "5.5", roast: "تحميص داكن" },
      { name: "كولد برو المنزلي", notes: "ملمس مخملي · سكر بني · حمضيات", price: "6.0", roast: "تقطير 18 ساعة" },
      { name: "لاتيه ليللي الخاص", notes: "عسل · فانيليا · منقوع الزنبق", price: "6.5", roast: "خلطة المقهى" },
    ],
    story_kicker: "التأليف",
    story_title: "قصتنا",
    story_quote:
      "«نسكب القهوة كما تعزف فرقة رباعية نشيدًا — ببطء، ونُصغي إلى الصمت بين النوتات.»",
    story_text: `\u200EFIRST SEED\u200F
التميز ليس محض مصادفة أبداً.
إنه قرار—يُتخذ في كل يوم.

لم نبدأ \u200ELILY\u200F لأن السوق كان بحاجة إلى مقهى آخر.
بدأناها لأننا رفضنا أن نقبل بما اعتاده السوق.

قبل أن تحمل \u200ELILY\u200F اسمها، كانت هناك سنوات من الوقوف خلف ماكينة الإسبريسو. آلاف الساعات من التعلم، والتجربة، والفشل، وإعادة المحاولة. لم يكن الهدف أن نصنع كوبًا أفضل...
كان الهدف أن نصنع معيارًا لا يحتاج إلى مقارنة.

كل تفصيلة خضعت لسؤال واحد...
هل تستحق أن تحمل اسم \u200ELILY\u200F؟
إن كانت الإجابة لا...
تُستبدل.
تُعاد.
أو تُلغى بالكامل.

لهذا لم تُبنَ \u200ELILY\u200F على السرعة، ولا على الكمية، ولا على الضجيج.
بُنيت على فكرة واحدة...
أن الإنسان لا يتذكر ما شربه... بل يتذكر كيف شعر.

ولهذا نحن لا نقدّم القهوة فحسب.
نقدّم احترامًا لوقتك.
واحترامًا لذائقتك.
واحترامًا للحظة التي اخترت أن تمنحنا إياها.

نحن لا نؤمن بأن الضيف يبحث عن كوبٍ آخر.
بل يبحث عن مكان يشعر فيه أن أحدًا فكّر بكل شيء... قبله.
من ملمس الكوب...
إلى رائحة القهوة...
إلى آخر رشفة.

ولهذا...
أن تكون ضيفًا لدى \u200ELILY\u200F ليس أمرًا عاديًا.
إنه اختيارٌ لعلامة لا تساوم، ولا تستعجل، ولا تقدّم شيئًا إلا إذا كانت فخورة بأن يحمل اسمها.

قد يشرب الجميع القهوة...
لكن قليلين فقط يعيشون التجربة.

أهلاً بكم في \u200ELILY\u200F.
حيث تجد كل تفصيلة مكانها المستحق.
ويستحق كل ضيف أفضل ما لدينا.`,
    gallery_kicker: "الجلسة",
    gallery_title: "المعرض",
    gallery_hint: "اسحب الصور برفق لإعادة ترتيب الذكريات.",
    print_captions: ["الثلاثاء، الجلسة الأخيرة", "السكب الأول", "حبوب ونغمات", "ساكسفون وبخار"],
    location_kicker: "اعثر علينا",
    location_title: "الموقع",
    location_name: "الزاوية الصغيرة",
    location_desc:
      "مختبئ بين بائع الأزهار القديم ومتجر أسطوانات الفينيل في شارع الحديقة. استمع لصوت الساكسفون — وستعرف أنك وصلت.",
    address_label: "العنوان",
    address_line1: "14 شارع الحديقة، الحي القديم",
    address_line2: "منطقة الضفة البحرية",
    hours_label: "ساعات العمل",
    hours: [
      { day: "الإثنين — الخميس", time: "7:00 — 21:00" },
      { day: "الجمعة", time: "7:00 — 23:00" },
      { day: "السبت", time: "8:00 — 23:00" },
      { day: "الأحد", time: "8:00 — 18:00" },
    ],
    open_maps: "افتح في الخرائط ←",
    contact_kicker: "أرسل رسالة",
    contact_title: "تواصل",
    form_name: "اسمك",
    form_email: "البريد الإلكتروني",
    form_message: "الرسالة",
    form_submit: "أرسل برفق",
    form_error_name: "الاسم سيكون لطيفًا أن نعرفه.",
    form_error_email: "هذا البريد الإلكتروني لا يبدو صحيحًا بعد.",
    form_error_message: "بضع كلمات لرسالتك؟",
    form_status_writing: "جارٍ كتابة رسالتك...",
    form_status_sending: "يتم إرسال رسالتك برفق، يرجى الانتظار.",
    thank_title: "شكرًا لك.",
    thank_msg: "وُضعت رسالتك تحت زهرة الزنبق. سنكتب إليك قريبًا — برفق.",
    write_another: "اكتب رسالة أخرى",
    contact_email: "ma749418@gmail.com",
    contact_phone: "07772334177",
    footer_tagline: "كل كوب، لحظة رقيقة",
    copyright: "صُنع ببطء، كأغنية هادئة.",
  },
};

const I18nContext = createContext(
  /** @type {{ lang: "en" | "ar"; t: typeof translations.en; setLang: React.Dispatch<React.SetStateAction<"en" | "ar">>; }} */ ({
    lang: "en",
    t: translations.en,
    setLang: () => {},
  })
);

/**
 * @param {{ children: React.ReactNode }} props
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(/** @type {'en' | 'ar'} */ ("en"));

  useEffect(() => {
    const isAr = lang === "ar";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.body.classList.remove("lang-en", "lang-ar");
    document.body.classList.add(isAr ? "lang-ar" : "lang-en");
  }, [lang]);

  const value = { lang, setLang, t: translations[lang] };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}