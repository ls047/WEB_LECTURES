import type { LectureContent } from '@/types/lecture.types';

export const webCssFundamentals: LectureContent = {
  slug: 'web-css-fundamentals',
  locale: 'ar',
  courseLabel: 'تطوير الويب · المحاضرة ٣',
  heroSubtitle: 'أساسيات CSS — من القواعد إلى تصميم بطاقة شخصية',
  sections: [
    {
      id: 'intro',
      chapter: 'مقدمة',
      title: 'ماذا سنتعلّم في هذه المحاضرة؟',
      subtitle: 'تنسيق صفحات HTML بشكل احترافي',
      paragraphs: [
        'بعد أن تعلمنا كيفية إنشاء صفحات ويب باستخدام HTML، سنبدأ الآن بتنسيق هذه الصفحات باستخدام CSS.',
        'سنستكشف كيفية تغيير الألوان والخطوط والخلفيات والمسافات، وكيفية استهداف العناصر المختلفة داخل الصفحة. بنهاية هذه المحاضرة ستتمكن من تحويل صفحة HTML بسيطة إلى صفحة أكثر احترافية وجاذبية.',
      ],
      bullets: [
        'ما هي CSS؟',
        'كيفية كتابة قواعد CSS',
        'Selectors',
        'الألوان والخلفيات',
        'الخطوط والنصوص',
        'الحدود Borders',
        'المسافات Margin و Padding',
        'التطبيق العملي',
      ],
      highlight: 'هذه المحاضرة تركّز بالكامل على أساسيات CSS قبل الانتقال إلى Flexbox أو Responsive Design.',
    },
    {
      id: 'what-is-css',
      chapter: 'المحور ١',
      title: 'ما هي CSS؟',
      subtitle: 'Cascading Style Sheets',
      paragraphs: [
        'CSS اختصار لـ Cascading Style Sheets — وهي لغة تستخدم للتحكم في مظهر عناصر HTML.',
        'تسمح لنا CSS بتغيير الألوان، الخطوط، الأحجام، المسافات، الخلفيات، وأماكن العناصر. بدون CSS ستظهر جميع صفحات الويب بشكل بسيط جداً.',
      ],
      bullets: [
        'الألوان',
        'الخطوط',
        'الأحجام',
        'المسافات',
        'الخلفيات',
        'أماكن العناصر',
      ],
      highlight: 'HTML تبني المحتوى، وCSS تحدّد كيف يبدو هذا المحتوى.',
    },
    {
      id: 'css-syntax',
      chapter: 'المحور ٢',
      title: 'بنية قاعدة CSS',
      subtitle: 'Selector · Property · Value',
      paragraphs: [
        'كل قاعدة CSS تتكون من محدّد (Selector) يحدد العنصر، وخاصية (Property) مع قيمتها (Value) داخل أقواس معقوفة.',
        'في المثال التالي: h1 هو Selector، color هي Property، و blue هي Value.',
      ],
      codeCaption: 'قاعدة CSS أساسية',
      code: `h1 {
  color: blue;
}`,
      highlight: 'الفاصلة المنقوطة ; في نهاية كل خاصية إلزامية.',
    },
    {
      id: 'selectors',
      chapter: 'المحور ٣',
      title: 'Selectors',
      subtitle: 'استهداف العناصر التي نريد تنسيقها',
      paragraphs: [
        'Selectors هي الطريقة التي نحدد بها العنصر الذي نريد تنسيقه. Element Selector يستهدف وسم HTML مباشرة، Class Selector يستهدف العناصر ذات class معيّن، و ID Selector يستهدف عنصراً واحداً بمعرّف فريد.',
      ],
      codeCaption: 'أنواع Selectors',
      code: `/* Element Selector */
p {
  color: red;
}

/* Class Selector */
/* HTML: <p class="info">مرحباً</p> */
.info {
  color: green;
}

/* ID Selector */
/* HTML: <h1 id="title">Welcome</h1> */
#title {
  color: blue;
}`,
      bullets: [
        'Element → p { } يطبّق على جميع الفقرات',
        'Class → .info { } يطبّق على العناصر ذات class="info"',
        'ID → #title { } يطبّق على عنصر واحد بـ id="title"',
      ],
      highlight: 'استخدم class للتنسيق المتكرر، و id عندما يكون العنصر فريداً في الصفحة.',
    },
    {
      id: 'colors',
      chapter: 'المحور ٤',
      title: 'الألوان في CSS',
      subtitle: 'أسماء الألوان، HEX، و RGB',
      paragraphs: [
        'يمكن تحديد الألوان في CSS بعدة طرق: بأسماء جاهزة مثل red و blue، أو بقيم HEX مثل #2563eb، أو بصيغة RGB مثل rgb(255, 0, 0).',
      ],
      codeCaption: 'طرق تحديد الألوان',
      code: `color: red;
color: blue;
color: green;

color: #2563eb;
color: #f97316;

color: rgb(255, 0, 0);`,
      highlight: 'HEX و RGB يمنحانك تحكماً أدق في درجات الألوان.',
    },
    {
      id: 'backgrounds',
      chapter: 'المحور ٥',
      title: 'الخلفيات',
      subtitle: 'background-color للصفحة والعناصر',
      paragraphs: [
        'خاصية background-color تغيّر لون خلفية أي عنصر — سواء كانت الصفحة كاملة (body) أو بطاقة أو قسم معيّن.',
      ],
      codeCaption: 'أمثلة على الخلفيات',
      code: `background-color: lightgray;

body {
  background-color: #f5f5f5;
}

.card {
  background-color: white;
}`,
      highlight: 'الخلفية الفاتحة للصفحة مع بطاقات بيضاء تعطي مظهراً نظيفاً واحترافياً.',
    },
    {
      id: 'typography',
      chapter: 'المحور ٦',
      title: 'تنسيق النصوص',
      subtitle: 'الحجم، النوع، السماكة، المحاذاة، واللون',
      paragraphs: [
        'CSS تمنحك تحكماً كاملاً في مظهر النصوص: حجم الخط، نوع الخط، سماكته، محاذاته، ولونه.',
      ],
      codeCaption: 'خصائص النص',
      code: `font-size: 24px;
font-family: Arial;
font-weight: bold;
text-align: center;
color: navy;`,
      highlight: 'اجمع بين font-size و color و text-align لتحسين قراءة المحتوى.',
    },
    {
      id: 'borders',
      chapter: 'المحور ٧',
      title: 'الحدود Borders',
      subtitle: 'إطار حول العناصر وحواف دائرية',
      paragraphs: [
        'يمكن إضافة حدود حول العناصر باستخدام border، وتغيير لونها، وجعل الزوايا دائرية باستخدام border-radius.',
      ],
      codeCaption: 'الحدود والزوايا',
      code: `border: 2px solid black;
border: 2px solid blue;
border-radius: 10px;`,
      highlight: 'border-radius يعطي البطاقات والأزرار مظهراً عصرياً.',
    },
    {
      id: 'spacing',
      chapter: 'المحور ٨',
      title: 'المسافات',
      subtitle: 'Padding و Margin',
      paragraphs: [
        'Padding هي المسافة داخل العنصر — بين المحتوى والحدود. Margin هي المسافة خارج العنصر — بينه وبين العناصر المجاورة.',
        'فهم الفرق بينهما خطوة أساسية قبل تعلم Flexbox.',
      ],
      codeCaption: 'Padding و Margin',
      code: `.card {
  padding: 20px;
  margin: 20px;
}`,
      bullets: [
        'Padding → المسافة داخل العنصر',
        'Margin → المسافة خارج العنصر',
      ],
      highlight: 'فهم الفرق بين Margin و Padding خطوة أساسية قبل تعلم Flexbox.',
    },
    {
      id: 'card-example',
      chapter: 'المحور ٩',
      title: 'إنشاء بطاقة تعريف (Card)',
      subtitle: 'دمج الخصائص في مكوّن واحد',
      paragraphs: [
        'الآن نجمع ما تعلّمناه في بطاقة تعريف بسيطة: خلفية بيضاء، مسافات داخلية وخارجية، حدود خفيفة، وزوايا دائرية.',
      ],
      codeCaption: 'HTML + CSS',
      code: `<!-- HTML -->
<div class="card">
  <h1>Ali Khalil</h1>
  <p>Frontend Developer</p>
</div>

/* CSS */
.card {
  background-color: white;
  padding: 20px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}`,
      highlight: 'البطاقة نموذج شائع في تصميم الويب — ستستخدمه كثيراً في مشاريعك.',
    },
    {
      id: 'practice',
      chapter: 'التطبيق العملي',
      title: 'تصميم بطاقة شخصية',
      subtitle: 'تطبيق كل خصائص CSS التي تعلّمناها',
      paragraphs: [
        'قم بإنشاء بطاقة تحتوي على: صورة شخصية، الاسم، التخصص، نبذة قصيرة، وزر تواصل.',
        'استخدم: Color، Background Color، Font Size، Border، Border Radius، Margin، و Padding.',
      ],
      bullets: [
        'صورة شخصية',
        'الاسم والتخصص',
        'نبذة قصيرة',
        'زر تواصل',
        'Color و Background Color',
        'Font Size و Border و Border Radius',
        'Margin و Padding',
      ],
      highlight: 'جرّب تعديل القيم واحدة تلو الأخرى لترى تأثير كل خاصية.',
    },
    {
      id: 'challenge',
      chapter: 'التحدي',
      title: 'صفحة تعريف كاملة',
      subtitle: 'تنسيق صفحة HTML بالكامل',
      paragraphs: [
        'قم بتصميم صفحة تحتوي على: عنوان رئيسي، فقرة تعريفية، صورة، قائمة مهارات، وزر تواصل — ثم قم بتنسيق الصفحة بالكامل باستخدام CSS.',
      ],
      bullets: [
        'عنوان رئيسي',
        'فقرة تعريفية',
        'صورة',
        'قائمة مهارات',
        'زر تواصل',
        'تنسيق كامل باستخدام CSS',
      ],
      highlight: 'هذا التحدي يجمع HTML من المحاضرات السابقة مع CSS من هذه المحاضرة.',
    },
    {
      id: 'summary',
      chapter: 'الخلاصة',
      title: 'ما تعلّمناه في هذه المحاضرة',
      subtitle: 'أساسيات CSS جاهزة للخطوة التالية',
      paragraphs: [
        'في هذه المحاضرة بنينا أساساً قوياً في CSS — من فهم القواعد والمحددات إلى تطبيق الألوان والمسافات والحدود في تصميم حقيقي.',
      ],
      bullets: [
        'مفهوم CSS',
        'بنية قواعد CSS',
        'Selectors',
        'الألوان والخلفيات',
        'تنسيق النصوص',
        'الحدود Borders',
        'المسافات Margin و Padding',
        'تصميم بطاقة شخصية باستخدام CSS',
      ],
      highlight:
        'في المحاضرة القادمة سنتعلم Box Model وطرق عرض العناصر (Display)، وهي الخطوة التي تمهد لنا لاستخدام Flexbox وبناء تخطيطات احترافية للصفحات.',
    },
  ],
};
