import {Injectable} from '@angular/core';
import {CategoryModel} from "../../models/CategoryModel";

@Injectable({
  providedIn: 'root'
})
export class AppCategoriesService {
  private categories: CategoryModel[];

  private selectedCategories: string[];

  get getCategories(): CategoryModel[] {
    return this.categories;
  }

  get getSelectedCategories(): string[] {
    return this.selectedCategories;
  }

  categoryClicked(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.removeSelectedCategory(category);
    } else {
      this.addSelectedCategory(category);
    }
  }

  private addSelectedCategory(category: string) {
    this.selectedCategories.push(category)
  }

  private removeSelectedCategory(category: string) {
    let index = this.selectedCategories.findIndex(cat => cat === category);
    this.selectedCategories.splice(index, 1);
  }

  constructor() {
    this.selectedCategories = [];
    this.categories = [
      {
        main: "מחשב בהתאמה אישית",
        secondary: []
      },
      {
        main: "מכירת חיסול",
        secondary: []
      },
      {
        main: "מחשבים נייחים",
        secondary: [
          "מחשב מיני ומדיה סנטר",
          "מחשבי מותג",
          "מחשבים שולחניים מומלצים במבצע",
          "מחשבי גיימינג",
          "מחשבי All-in-One",
        ]
      },
      {
        main: "מחשבים ניידים",
        secondary: [
          "מחשב נייד Fujitsu",
          "מחשב נייד HP",
          "מחשב נייד Dell",
          "מחשב נייד Lenovo",
          "מחשב נייד Huawei",
          "מחשב נייד Asus",
          "מחשב נייד MSI",
          "מחשב נייד Microsoft",
          "מחשב נייד Apple",
          "מחשב נייד Acer",
          "מחשב נייד Gigabyte",
        ]
      },
      {
        main: "טאבלטים",
        secondary: [
          "טאבלטים Asus",
          "טאבלטים Lenovo",
          "טאבלטים Microsoft",
          "טאבלטים Apple iPad",
          "טאבלטים Samsung",
          "טאבלטים Huawei",
        ]
      },
      {
        main: "אבזרים למחשב נייד וטאבלט",
        secondary: [
          "משטחי קירור ומתקנים למחשב נייד",
          "סוללות למחשבים ניידים",
          "ספקי כח למחשב נייד",
          "תיקים וכיסוים למחשב נייד",
          "אביזרים לטאבלטים",
          "מגן פרטיות למסכי מחשב",
          "אביזרים למחשבים ניידים Apple",
        ]
      }, {
        main: "סמארטפונים",
        secondary: [
          "טלפון סלולרי Apple",
          "טלפון סלולרי Samsung",
          "טלפון סלולרי LG",
          "טלפון סלולרי OnePlus",
          "טלפון סלולרי Xiaomi Mi",
          "טלפון סלולרי Huawei",
          "טלפון סלולרי Nokia",
          "טלפון סלולרי Motorola",
          "טלפון סלולרי EasyPhone",
          "טלפון סלולרי Lenovo",
          "טלפון סלולרי Google",
          "טלפון סלולרי Realme",
          "טלפון סלולרי Oukitel",
        ]
      }, {
        main: "אבזרים לטלפון סלולרי",
        secondary: [
          "נרתיקים לטלפון סלולרי",
          "מגני מסך לטלפון סלולרי",
          "סוללות גיבוי",
          "אביזרי רכב לסמארטפונים",
          "סוללות לסלולרי",
          "מעבדת סלולר",
        ]
      }, {
        main: "שעוני יד חכמים וספורט",
        secondary: []
      }, {
        main: "תיקים וארנקים",
        secondary: []
      }, {
        main: "מוצרי חשמל ובית חכם",
        secondary: [
          "נגני MP3/MP4",
          "סוללות",
          "מגני ברקים, מייצבים ושעון שבת",
          "בית חכם",
          "תאורה ואביזרים",
          "שואבי אבק",
          "מוצרי חשמל למטבח",
          "טיפוח ויופי",
          "תאורה",
          "מקררים ומקפיאים",
          "כביסה",
          "מדיחי כלים",
          "אפיה ובישול",
          "מאווררים",
          "מוצרי חורף",
          "מיקרוגלים",
          "פנסים",
        ]
      }, {
        main: "ספרים אלקטרוניים",
        secondary: []
      }, {
        main: "מסכי מחשב וטלויזיות",
        secondary: [
          "מסכי מחשב",
          "טלוויזיות",
          "מתקני תלייה",
          "אביזרים נילווים לטלויזיות",
          "זרועות למסכים",
        ]
      }, {
        main: "חומרה למחשב",
        secondary: [
          "זכרונות",
          "כרטיסי קול",
          "ספקי כח",
          "כונן - צורב DVD",
          "מארזים",
          "מעבדים",
          "לוחות אם",
          "כרטיסי מסך",
          "קירור",
          "כרטיסי הרחבה",
        ]
      }, {
        main: "ציוד היקפי",
        secondary: [
          "עכברים",
          "מקלדות",
          "לוחות כתיבה",
          "אוזניות",
          "מיקרופונים",
          "רמקולים ותחנות עגינה",
          "אל פסק",
          "מצלמות רשת",
          "סורקים",
          "שלט רחוק",
          "קורא ברקודים",
          "מגרסות נייר",
          "מערכות צפיה ושמע",
          "כלי עבודה",
          "דיבוריות",
          "מכונות כריכה",
          "מכונות למינציה",
        ]
      }, {
        main: "בידור ופנאי - גיימינג",
        secondary: [
          "אופניים וקורקינט חשמלי",
          "רחפנים",
          "משקפי מציאות מדומה",
          "סקייטבורד",
          "קונסולות",
        ]
      }, {
        main: "כסאות ושולחנות גיימינג",
        secondary: [
          "כסאות גיימינג",
          "שולחנות גיימינג",
        ]
      }, {
        main: "אחסון נתונים",
        secondary: [
          "כוננים קשיחים",
          "זכרונות ניידים USB",
          "כרטיסי זכרון",
          "אביזרים ומארזים לכוננים",
          "NAS",
          "קורא כרטיסים",
        ]
      }, {
        main: "מדפסות ואבזרים",
        secondary: [
          "מדפסות ופלוטרים",
          "ראש דיו וטונרים",
        ]
      }, {
        main: "תוכנות",
        secondary: [
          "מערכות הפעלה",
          "אנטי וירוסים",
          "תוכנות Office",
          "Adobe",
        ]
      }, {
        main: "תקשורת ומוצרי רשת",
        secondary: [
          "מוצרי בלוטוס",
          "אקסס פוינט / מגדיל טווח / MESH",
          "אנטנה",
          "כרטיסי רשת",
          "קופסאות מיתוג",
          "רכזות רשת/ממתגים",
          "רשת על חשמל ביתי",
          "נתבים",
          "שרתי מדפסות",
          "GBIC / Media Converter",
          "Firewall",
          "מודמים סלולריים",
        ]
      }, {
        main: "טלפוניה ומרכזיית IP",
        secondary: [
          "מערכות ראש לטלפון",
          "טלפוני VoIP",
          "טלפונים",
        ]
      }, {
        main: "מצלמות אבטחה ואביזרים",
        secondary: [
          "מצלמת אבטחה",
          "NVR",
        ]
      }, {
        main: "מקרנים",
        secondary: []
      }, {
        main: "מצלמות רכב ואקסטרים",
        secondary: []
      }, {
        main: "לכידת וידאו וסטרימינג",
        secondary: []
      }, {
        main: "כבלים, מתאמים ומפצלים",
        secondary: [
          "USB כבלים וממירים",
          "כבלי SAS / MINI SAS",
          "כבלים לסמארטפונים, טאבלטים",
          "כבלים DVI",
          "ממירים מרחיקים ומגברים HDMI",
          "כבלי רשת",
          "כבלי וידאו/אודיו",
          "אביזרי חשמל",
        ]
      }, {
        main: "שרתים",
        secondary: []
      }, {
        main: "ארונות תקשורת",
        secondary: []
      }
    ]
  }
}
