import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "हमारे बारे में | 507 Head",
  description:
    "507 हैड (छतरगढ़, बीकानेर, राजस्थान) का परिचय, इतिहास, नहरी क्रांति, ग्रामीण पत्रकारिता और हमारी संपादकीय प्रतिबद्धता।",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcf9f5] text-[#222222]">
      {/* Hero Section */}
      <section
        className="relative border-b border-[#dfc5a6] bg-[#e8d5bc] bg-cover bg-right md:bg-center bg-no-repeat py-12 sm:py-16 md:py-20 overflow-hidden"
        style={{ backgroundImage: "url('/images/about-fort-bg.jpg')" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#dec29c]/80 via-[#e9d2b2]/50 to-transparent"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-xl md:max-w-2xl lg:max-w-[620px] text-left space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfc5a6] bg-white/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8a4b1f] shadow-xs">
              <span
                className="h-2 w-2 rounded-full bg-[#8a4b1f] animate-pulse"
                aria-hidden="true"
              />
              <span>छतरगढ़ • बीकानेर • राजस्थान</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#542a19] tracking-tight leading-[1.15]">
              अपनी मिट्टी, अपनी पहचान, अपनी कहानियाँ
            </h1>

            <p className="text-base sm:text-lg text-[#5e4433] leading-relaxed">
              507 Head पश्चिमी राजस्थान के ग्रामीण जीवन, थार मरुस्थल की विरासत,
              किसानों के परिश्रम और लोक परंपराओं को समर्पित एक स्वतंत्र डिजिटल मंच
              है।
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 space-y-14">

        {/* --- 507 हैड क्या है --- */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#8a4b1f]" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222] leading-tight">
              507 हैड क्या है और इसका क्या महत्व है?
            </h2>
          </div>
          <div className="pl-0 sm:pl-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#444]">
            <p>
              507 हैड (507 Head) राजस्थान के बीकानेर जिले की छतरगढ़ तहसील के
              अंतर्गत इंदिरा गांधी नहर परियोजना (IGNP) की मुख्य शाखा पर स्थित एक
              ऐतिहासिक जल वितरण बिंदु और ग्रामीण इलाका है।
            </p>
            <p>
              नहर आने से पहले यह संपूर्ण क्षेत्र &lsquo;महामरुस्थल&rsquo; का
              हिस्सा था, जहाँ केवल रेत के विशाल धोरे, खेजड़ी के पेड़ और पीने के
              पानी के लिए मीलों की यात्राएं थीं। नहरी पानी पहुँचने के बाद 507 हैड
              न केवल खेतों के लिए जीवनदायिनी बना, बल्कि यहाँ बसे सैकड़ों गाँवों के
              सामाजिक, सांस्कृतिक और आर्थिक उत्थान का केंद्र बन गया।
            </p>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b896] to-transparent" />
          <span className="text-[#c5a57a] text-lg">✦</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b896] to-transparent" />
        </div>

        {/* --- हमारा उद्देश्य --- */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#8a4b1f]" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222] leading-tight">
              हमारा उद्देश्य (Our Mission)
            </h2>
          </div>
          <p className="pl-0 sm:pl-6 text-base sm:text-lg leading-relaxed text-[#444]">
            मुख्यधारा की मीडिया में अक्सर सुदूर ग्रामीण अंचलों, स्थानीय किसानों
            की वास्तविक समस्याओं, नहरी जल प्रबंधन और पारंपरिक ज्ञान की उपेक्षा
            हो जाती है। हमारा संकल्प है:
          </p>

          <div className="pl-0 sm:pl-6 space-y-3">
            {[
              {
                bold: "सच्ची व निष्पक्ष ग्रामीण पत्रकारिता:",
                text: "507 हैड और आसपास के किसानों, पशुपालकों और युवाओं की आवाज को प्रामाणिकता के साथ उठाना।",
              },
              {
                bold: "मरुस्थलीय विरासत का संरक्षण:",
                text: "थार की लोक कला, बुजुर्गों के अनमोल अनुभव, पारंपरिक खान-पान और देशी बीजों के ज्ञान को डिजिटल रूप में सहेजना।",
              },
              {
                bold: "किसान समृद्धि और आधुनिक तकनीक:",
                text: "कम पानी में बेहतर पैदावार, ड्रिप सिंचाई और उन्नत पशुपालन के वैज्ञानिक तौर-तरीकों को स्थानीय भाषा में पहुँचाना।",
              },
            ].map((item) => (
              <div
                key={item.bold}
                className="flex items-start gap-3 rounded-xl border border-[#eadbc9] bg-white p-4 shadow-xs"
              >
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8a4b1f]" aria-hidden="true" />
                <p className="text-sm sm:text-base text-[#444] leading-relaxed">
                  <strong className="text-[#542a19]">{item.bold}</strong>{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b896] to-transparent" />
          <span className="text-[#c5a57a] text-lg">✦</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b896] to-transparent" />
        </div>

        {/* --- 7 मुख्य विषय --- */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-[#8a4b1f]" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222] leading-tight">
              7 मुख्य विषय (Editorial Pillars)
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 pl-0 sm:pl-6">
            {[
              {
                num: "01",
                title: "इतिहास और विरासत",
                desc: "क्षेत्र का इतिहास, नहरी निर्माण और संघर्ष गाथाएं।",
              },
              {
                num: "02",
                title: "खेती-बाड़ी",
                desc: "फसल प्रबंधन, नहरी बारी, मिट्टी परीक्षण और जैविक खेती।",
              },
              {
                num: "03",
                title: "किसान",
                desc: "अन्नदाताओं के जीवन के सच्चे किस्से और उनकी आवश्यकताएं।",
              },
              {
                num: "04",
                title: "बुजुर्गों की सीख",
                desc: "चौपाल की बातें, लोक सूक्तियां और जीवन दर्शन।",
              },
              {
                num: "05",
                title: "सांस्कृतिक विरासत",
                desc: "लोकगीत, मांड, पारंपरिक रीति-रिवाज और मेले।",
              },
              {
                num: "06",
                title: "पशुपालन",
                desc: "राठी गाय, ऊँट संरक्षण, चारा प्रबंधन और डेयरी।",
              },
              {
                num: "07",
                title: "खान-पान",
                desc: "बाजरे का सोगरा, कैर-सांगरी और पौष्टिक देशी स्वाद।",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-xl border border-[#e5ddd3] bg-white p-5 transition-all duration-200 hover:border-[#8a4b1f]/40 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-[#8a4b1f]/10 text-xs font-black text-[#8a4b1f]">
                    {pillar.num}
                  </span>
                  <div>
                    <strong className="block text-[#542a19] text-base font-bold">
                      {pillar.title}
                    </strong>
                    <p className="text-xs text-[#777] mt-1 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CTA Card --- */}
        <div className="rounded-2xl bg-gradient-to-br from-[#8a4b1f] to-[#6b3915] p-8 sm:p-10 text-center space-y-4 shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            क्या आपके पास कोई कहानी या जानकारी है?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            यदि आप 507 हैड या बीकानेर क्षेत्र से जुड़ी कोई ऐतिहासिक जानकारी,
            सफलता की कहानी या समस्या साझा करना चाहते हैं, तो हमसे अवश्य संपर्क
            करें।
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-[#8a4b1f] shadow-md hover:bg-[#f9f2e7] transition-colors"
          >
            हमसे संपर्क करें →
          </Link>
        </div>
      </section>
    </main>
  );
}
