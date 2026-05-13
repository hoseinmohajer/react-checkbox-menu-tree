/**
 * Sample data with non-standard field names to demonstrate `fieldNames` mapping.
 * The data uses: key, title, desc, badges, ticked, items
 * instead of the default: id, label, description, tags, checked, children
 *
 * Half-check demo:
 *   - "مدیریت کاربران" has mixed children → shows half-check
 *   - "لیست کاربران" has 1 checked + 1 unchecked child → shows half-check
 *   - "تنظیمات سیستم" has 1 checked + 1 unchecked child → shows half-check
 */
export const MockData = [
  {
    key: "1",
    title: "مدیریت کاربران",
    desc: "تنظیمات و مدیریت حساب‌های کاربری سیستم",
    badges: ["مهم", "فعال", "امنیت"],
    ticked: true,
    items: [
      {
        key: "1-1",
        title: "لیست کاربران",
        desc: "مشاهده و جستجوی تمام کاربران",
        badges: ["گزارش"],
        ticked: true,
        items: [
          {
            key: "1-1-1",
            title: "کاربران فعال",
            badges: ["آنلاین"],
            ticked: true,
          },
          {
            key: "1-1-2",
            title: "کاربران غیرفعال",
            ticked: false,
          },
        ],
      },
      {
        key: "1-2",
        title: "نقش‌ها و دسترسی‌ها",
        desc: "مدیریت سطوح دسترسی کاربران",
        badges: ["امنیت", "RBAC"],
        ticked: false,
      },
    ],
  },
  {
    key: "2",
    title: "تنظیمات سیستم",
    desc: "پیکربندی عمومی و تنظیمات پیشرفته",
    badges: ["پیکربندی"],
    ticked: false,
    items: [
      {
        key: "2-1",
        title: "تنظیمات عمومی",
        ticked: false,
      },
      {
        key: "2-2",
        title: "تنظیمات امنیتی",
        badges: ["مهم", "SSL", "رمزنگاری"],
        ticked: true,
      },
    ],
  },
  {
    key: "3",
    title: "گزارش‌ها",
    desc: "گزارش‌های آماری و تحلیلی سیستم",
    badges: ["آمار", "داشبورد"],
    ticked: false,
  },
];
