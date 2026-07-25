/**
 * Eden — the FindWellness knowledge garden.
 *
 * Plain-English briefs on the research and technology reshaping wellness.
 * Every claim here is written to be conservative and mainstream-accurate;
 * sources are real, well-known studies and reviews, described honestly.
 * This is editorial content, not medical advice.
 */

export type EvidenceGrade = "Strong" | "Moderate" | "Early";

export type EdenBrief = {
  slug: string;
  title: string;
  dek: string;
  tag: "Research" | "Protocols" | "Technology";
  minutes: number;
  updated: string;
  tldr: string;
  body: string[];
  evidence: { claim: string; grade: EvidenceGrade; note: string }[];
  sources: string[];
};

export const edenTags = ["Research", "Protocols", "Technology"] as const;

export const edenBriefs: EdenBrief[] = [
  {
    slug: "glp-1-receptor-agonists",
    title: "The GLP-1 era",
    dek: "Semaglutide and tirzepatide rewrote what medicine can do about weight. Here is what the evidence actually supports.",
    tag: "Research",
    minutes: 10,
    updated: "July 2026",
    tldr: "GLP-1 receptor agonists produce weight loss that no prior drug class approached, and at least one has now been shown to cut cardiovascular events in people with obesity. They also carry real caveats around muscle loss, side effects, cost, and the fact that the effect fades when you stop. They are medications, not lifestyle accessories, and they belong under a clinician's supervision.",
    body: [
      "For most of modern medicine, drugs for weight loss were a graveyard of modest effects and quiet withdrawals. That changed with a class of medications originally designed for type 2 diabetes. GLP-1 receptor agonists mimic a gut hormone the body releases after eating, and in doing so they slow stomach emptying, blunt appetite, and quiet the mental chatter about food that many people describe as constant. The result is weight loss at a scale that was previously the domain of bariatric surgery.",
      "The two names that matter most are semaglutide and tirzepatide. Semaglutide, sold as Wegovy for weight and Ozempic for diabetes, acts on the GLP-1 receptor alone. Tirzepatide, sold as Zepbound and Mounjaro, acts on two receptors at once, adding a second gut hormone called GIP. In the pivotal trials, semaglutide produced roughly 15 percent average body-weight loss over 68 weeks, and tirzepatide pushed that figure past 20 percent at its highest dose. These are averages across thousands of participants, not marketing figures.",
      "Weight, however, was never the real endpoint that mattered. The landmark result came in 2023, when the SELECT trial showed that semaglutide reduced major cardiovascular events, meaning heart attack, stroke, and cardiovascular death, by about 20 percent in people who had established heart disease and obesity but not diabetes. That moved the conversation from cosmetic to cardiometabolic. A drug that helps people lose weight is interesting. A drug that measurably lowers the risk of a heart attack is a different category of tool.",
      "The most important caveat is what you lose along with the fat. When people drop weight quickly, a meaningful fraction of it is lean mass, including skeletal muscle. Body-composition sub-studies suggest muscle can account for roughly a quarter to a third of the total lost. In a healthy younger adult that may matter little, but in an older person, preserving muscle is central to staying strong, metabolically healthy, and independent. This is why resistance training and adequate protein are not optional add-ons to GLP-1 therapy. They are part of doing it well.",
      "The side effects are mostly gastrointestinal and mostly manageable: nausea, constipation, and reflux that tend to ease as the dose is titrated slowly. More serious risks are rarer but real, which is one reason these drugs are prescribed and monitored rather than bought casually. Starting low and increasing gradually is not bureaucratic caution. It is how tolerability is achieved.",
      "There is also the uncomfortable arithmetic of stopping. When people discontinue the medication without other durable changes, most of the lost weight returns over the following year, and some of the cardiometabolic improvements reverse with it. This reframes the drugs less as a cure and more as a chronic treatment for a chronic condition, in the same way blood-pressure medication is. The question is not whether they work but whether a person can stay on them, afford them, and pair them with habits that make the results last.",
      "Who are they for? Clinical eligibility generally centers on a body-mass index of 30 or above, or 27 and above with a weight-related condition such as prediabetes or hypertension. That framing captures medical need better than appearance does. Using these drugs to shed a vanity five pounds is both off-label and a poor trade against the cost, the side effects, and the muscle considerations.",
      "The honest summary is that GLP-1 medications are one of the most consequential advances in metabolic medicine in a generation, and also that the internet has run far ahead of the data on their more speculative uses. Claims that they slow aging, protect the brain, or treat addiction are, for now, hypotheses rather than findings. The proven story is already remarkable enough. It just happens to be a medical one, best written with a clinician rather than a group chat.",
    ],
    evidence: [
      {
        claim: "Semaglutide and tirzepatide produce roughly 15 to 22 percent average weight loss",
        grade: "Strong",
        note: "Consistent across the large STEP and SURMOUNT trial programs.",
      },
      {
        claim: "Semaglutide cuts major cardiovascular events in people with obesity but without diabetes",
        grade: "Strong",
        note: "The SELECT trial showed about a 20 percent relative reduction over roughly three years.",
      },
      {
        claim: "A meaningful share of the weight lost is lean mass, including muscle",
        grade: "Moderate",
        note: "Body-composition sub-studies estimate roughly a quarter to a third; long-term functional impact is still being studied.",
      },
      {
        claim: "Weight largely returns when the drug is stopped without other durable changes",
        grade: "Strong",
        note: "Withdrawal studies show most lost weight regained within about a year.",
      },
      {
        claim: "These drugs slow aging or protect cognition",
        grade: "Early",
        note: "No human outcome data supports this; it remains speculative.",
      },
    ],
    sources: [
      "New England Journal of Medicine — STEP 1 trial of semaglutide 2.4 mg for weight management, 2021",
      "New England Journal of Medicine — SURMOUNT-1 trial of tirzepatide for obesity, 2022",
      "New England Journal of Medicine — SELECT trial of semaglutide and cardiovascular outcomes, 2023",
      "Diabetes, Obesity and Metabolism — Wilding et al., weight regain and cardiometabolic effects after withdrawal of semaglutide, 2022",
    ],
  },
  {
    slug: "nad-plus",
    title: "NAD+ and its precursors",
    dek: "The molecule at the center of the longevity supplement boom is real. Most of the promises attached to it are not yet.",
    tag: "Research",
    minutes: 9,
    updated: "July 2026",
    tldr: "NAD+ is a genuinely important coenzyme that declines with age, and oral precursors like NR and NMN reliably raise its levels in the blood. What remains unproven is whether topping up NAD+ actually slows aging or extends healthspan in humans. IV NAD+ drips, in particular, are marketed far ahead of any solid evidence.",
    body: [
      "NAD+ is not marketing. Nicotinamide adenine dinucleotide is a coenzyme every cell in your body uses to turn food into energy and to run repair machinery, and its levels genuinely fall as we age. That decline is the seed of a plausible and appealing idea: if aging tissue is running low on NAD+, perhaps refilling the tank could restore some youthful function. It is a good hypothesis. The gap between a good hypothesis and a proven therapy is where the entire supplement category currently lives.",
      "You cannot usefully swallow NAD+ itself, so the field focuses on precursors the body converts into it. The two headliners are nicotinamide riboside, or NR, and nicotinamide mononucleotide, or NMN, both forms of vitamin B3 chemistry dressed up in longevity branding. The first thing to establish about any precursor is whether it actually raises NAD+ in people, and on that narrow question the answer is reassuringly clear.",
      "Placebo-controlled human trials have shown that oral NR is well tolerated and meaningfully increases NAD+ levels in the blood of healthy middle-aged and older adults. That is a real, replicated finding. It tells you the delivery works. It does not, by itself, tell you that the higher NAD+ does anything you would notice or care about, which is the harder and more important question.",
      "On that harder question, the evidence thins quickly. Some small studies have found specific metabolic signals, such as a trial in which NMN improved muscle insulin sensitivity in prediabetic women. Others have reported modest changes in blood pressure or physical measures in particular subgroups. These are worth taking seriously as leads, but they are small, sometimes not replicated, and a long way from demonstrating that precursors make people healthier or longer-lived. No trial has shown an effect on the outcomes that ultimately matter, like disease or mortality.",
      "The IV NAD+ infusion deserves its own paragraph, because it is where the marketing most outruns the science. Clinics offer hours-long drips of NAD+ directly into the bloodstream, often at a striking price, and often accompanied by claims about energy, focus, addiction, and aging. The controlled evidence supporting these specific promises is essentially absent. The infusions are also frequently uncomfortable, and basic questions about how much actually reaches cells remain unresolved. Paying premium prices for an unpleasant experience with little outcome data is a difficult trade to defend.",
      "It is worth naming why the hype exists. NAD+ sits close to sirtuins, a family of enzymes tied to a decade of high-profile aging research and confident public messaging. Enthusiasm ran ahead of the human data, and regulators have since scrutinized how these compounds are sold. Excitement about a mechanism is not the same as evidence about an outcome, and this category is a textbook example of the difference.",
      "If you are still curious, the sane posture is modest. Precursors like NR appear safe in studied doses, so the risk of trying them is mostly financial rather than physical. Just calibrate expectations to the evidence, which supports raising a biomarker and little more. Treat anyone promising that a drip will reverse your biological age as making a claim the literature does not currently back.",
    ],
    evidence: [
      {
        claim: "Oral NR and NMN raise NAD+ levels in the blood",
        grade: "Strong",
        note: "Demonstrated repeatedly in placebo-controlled human trials.",
      },
      {
        claim: "Raising NAD+ improves specific metabolic markers in some groups",
        grade: "Moderate",
        note: "For example, muscle insulin sensitivity in prediabetic women; small studies with mixed replication.",
      },
      {
        claim: "NAD+ precursors extend human healthspan or lifespan",
        grade: "Early",
        note: "No clinical outcome trials; the leap from biomarker to benefit is unproven.",
      },
      {
        claim: "IV NAD+ infusions outperform inexpensive oral precursors",
        grade: "Early",
        note: "Essentially no controlled evidence; marketed well ahead of the science.",
      },
    ],
    sources: [
      "Nature Communications — Martens et al., chronic nicotinamide riboside supplementation elevates NAD+ in healthy middle-aged and older adults, 2018",
      "Nature Communications — Trammell et al., nicotinamide riboside is orally bioavailable and increases NAD+ in humans, 2016",
      "Science — Yoshino et al., nicotinamide mononucleotide increases muscle insulin sensitivity in prediabetic women, 2021",
    ],
  },
  {
    slug: "vo2max-zone-2",
    title: "VO2max and Zone 2",
    dek: "Cardiorespiratory fitness may be the most powerful longevity number you can actually change. Here is how to build it.",
    tag: "Protocols",
    minutes: 9,
    updated: "July 2026",
    tldr: "Across large cohorts, higher cardiorespiratory fitness predicts lower mortality with a dose-response that shows no clear ceiling, and being unfit carries risk on par with major diseases. Building it takes two ingredients: a base of easy aerobic work, often called Zone 2, and a smaller dose of hard intervals to lift the VO2max ceiling. A proper test tells you where you stand; a wearable estimate is a rough guide.",
    body: [
      "If longevity had a single trainable vital sign, cardiorespiratory fitness would be the leading candidate. It is usually expressed as VO2max, the maximum amount of oxygen your body can take in and use during hard effort, and it captures how well your heart, lungs, blood, and muscles work together. Unlike your age or your genes, it responds to training, which makes it one of the few longevity numbers you can actually move.",
      "The epidemiology is unusually strong for a lifestyle variable. In a study of more than 120,000 patients undergoing treadmill testing, higher measured fitness tracked with lower all-cause mortality, and the benefit kept accruing at the highest fitness levels rather than plateauing. Just as striking, the least-fit group carried a risk of dying comparable to, or greater than, that associated with conditions like coronary disease and diabetes. Being unfit, in other words, is not a neutral baseline. It is itself a serious risk factor.",
      "That evidence reframes exercise from a weight-management chore into something closer to preventive medicine. A meta-analysis pooling many cohorts found that each increment of fitness corresponded to a meaningful reduction in mortality and cardiovascular events. Major cardiology bodies have gone as far as to argue fitness should be treated as a clinical vital sign, measured and tracked like blood pressure.",
      "Building fitness well means training two systems, and this is where Zone 2 enters. Zone 2 is a deliberately easy intensity, roughly the fastest pace at which you could still hold a conversation, sitting near the point where your body is clearing lactate about as fast as it produces it. Training here is unglamorous and feels almost too gentle, which is precisely the point. It expands the density of mitochondria in your muscles and improves your ability to burn fat for fuel, widening the aerobic base everything else is built on.",
      "The base alone will not maximize the ceiling, though, which is why short bouts of genuinely hard work belong in the plan too. High-intensity intervals, such as the well-studied protocol of four four-minute efforts near maximum with recovery between them, are an efficient way to raise VO2max itself. A common and sensible structure for non-athletes is roughly eighty percent easy aerobic work and twenty percent hard, a pattern endurance athletes have used for decades.",
      "In practice this need not be complicated. Several Zone 2 sessions a week of 45 to 90 minutes, whether brisk incline walking, easy cycling, or a slow jog, plus one weekly session of hard intervals, will move the needle for most people within a couple of months. The most common mistake is running the easy days too hard and the hard days too easy, so that everything blurs into an unproductive middle. Keeping easy genuinely easy is the discipline that makes the system work.",
      "Testing closes the loop. The gold standard is a lab cardiopulmonary exercise test, which measures the gases you breathe and returns a real VO2max along with your ventilatory thresholds. Consumer wearables now estimate VO2max from heart rate and pace, and while the trend they show is useful, the absolute number can be off by a fair margin. Use the wearable to watch direction over months, and consider a proper test if you want an accurate baseline to train against.",
      "The encouraging part is that fitness is remarkably responsive at almost any age. The people with the most to gain are those starting from the lowest base, where moving out of the bottom fitness category is associated with some of the largest reductions in risk. You do not need to become an athlete. You need to stop being unfit, and then keep going.",
    ],
    evidence: [
      {
        claim: "Higher cardiorespiratory fitness predicts lower all-cause mortality",
        grade: "Strong",
        note: "Large cohorts show a dose-response relationship with no clear upper limit of benefit.",
      },
      {
        claim: "Low fitness carries mortality risk comparable to major disease states",
        grade: "Strong",
        note: "The least-fit patients had risk on par with or exceeding diabetes and coronary disease.",
      },
      {
        claim: "Zone 2 training expands mitochondrial density and fat oxidation",
        grade: "Moderate",
        note: "Well grounded in exercise physiology; the optimal dose for non-athletes is less settled.",
      },
      {
        claim: "Short high-intensity intervals efficiently raise the VO2max ceiling",
        grade: "Moderate",
        note: "Protocols like four-by-four minutes reliably improve VO2max within months.",
      },
    ],
    sources: [
      "JAMA Network Open — Mandsager et al., association of cardiorespiratory fitness with long-term mortality, 2018",
      "JAMA — Kodama et al., cardiorespiratory fitness as a quantitative predictor of all-cause mortality and cardiovascular events, meta-analysis, 2009",
      "Circulation — American Heart Association scientific statement on cardiorespiratory fitness as a clinical vital sign (Ross et al.), 2016",
    ],
  },
  {
    slug: "heat-and-cold",
    title: "Heat and cold, honestly",
    dek: "The sauna has surprisingly serious cohort data behind it. The cold plunge has enthusiasm. Knowing the difference matters.",
    tag: "Protocols",
    minutes: 8,
    updated: "July 2026",
    tldr: "Long-running Finnish cohort studies link frequent sauna use to lower cardiovascular and all-cause mortality, though the data are observational rather than proof of cause. Deliberate cold exposure is popular and has interesting short-term effects on mood and physiology, but the evidence for lasting health benefits is far thinner than the internet suggests. Both can fit a routine if you respect the caveats.",
    body: [
      "Heat and cold have become wellness theater, but underneath the plunge videos and infrared marketing sits a real and uneven body of evidence. The two practices are not equally supported, and treating them as interchangeable rituals obscures an important asymmetry: one has decades of population data, and the other mostly has enthusiasm and a handful of small studies.",
      "The sauna is the surprisingly serious one. A long-running Finnish cohort followed thousands of middle-aged men and found that those who used a traditional sauna four to seven times a week had markedly lower rates of sudden cardiac death, fatal cardiovascular disease, and death from any cause than those who went once a week. Later analyses from the same research group reported associations with lower risk of dementia as well. The dose-response pattern, where more frequent use tracked with lower risk, is part of what makes the finding compelling.",
      "The mechanism is plausible, which strengthens the case. Sitting in heat raises your heart rate and dilates your blood vessels in a way that resembles moderate physical exercise, and repeated exposure appears to improve the function of the endothelium, the lining of your blood vessels. It is reasonable to think of a sauna session as a mild cardiovascular stressor your body adapts to, in the same family as exercise rather than an exotic intervention.",
      "The honest caveat is that this is observational evidence. People who sauna frequently in Finland may differ from those who do not in ways that also affect health, and no large randomized trial has proven the sauna itself causes the longer life. The association is strong and consistent enough to take seriously, but it is an association, and it deserves that qualifier every time it is cited.",
      "Cold is the more oversold half. Deliberate cold exposure, whether an ice bath or a cold plunge, reliably produces short-term physiological effects: a surge in noradrenaline and dopamine, a jolt of alertness, and a genuine mood lift many people find rewarding. Those acute effects are real and may be reason enough to enjoy it. What is missing is good evidence that regular cold plunging improves long-term health outcomes such as metabolic disease or longevity, where the science remains early and mostly speculative.",
      "There is also a specific tension worth knowing if you lift weights. Controlled studies show that plunging into cold water immediately after resistance training can blunt the muscle-building signal and, over time, attenuate gains in strength and size. If hypertrophy is your goal, the cold is best saved for a different time of day, not used as an immediate post-workout reward. The recovery that cold provides is partly perceptual, and that perception can come at a cost to adaptation.",
      "Practical protocols, for those who want them, are simple. A sauna session of roughly 15 to 20 minutes at traditional temperatures, a few times a week, mirrors the exposures in the cohort data. Cold exposure is typically brief, on the order of one to three minutes in genuinely cold water, done for the mood and alertness effect rather than any promised metabolic miracle. Neither should be treated as trivial for people with cardiovascular conditions, and the sudden stress of extreme cold in particular warrants a clinician's sign-off first.",
    ],
    evidence: [
      {
        claim: "Frequent sauna use is associated with lower cardiovascular and all-cause mortality",
        grade: "Moderate",
        note: "Strong, consistent Finnish cohort data, but observational rather than proof of cause.",
      },
      {
        claim: "Sauna heat stresses the cardiovascular system similarly to moderate exercise",
        grade: "Moderate",
        note: "Acute heart-rate and endothelial responses are well documented.",
      },
      {
        claim: "Cold plunging meaningfully improves long-term health outcomes",
        grade: "Early",
        note: "Enthusiasm outpaces evidence; most data cover mood, recovery perception, and short-term physiology.",
      },
      {
        claim: "Cold immediately after strength training blunts muscle adaptation",
        grade: "Moderate",
        note: "Controlled trials show attenuated hypertrophy signaling and long-term gains.",
      },
    ],
    sources: [
      "JAMA Internal Medicine — Laukkanen et al., association between sauna bathing and fatal cardiovascular and all-cause mortality events, 2015",
      "Age and Ageing — Laukkanen et al., sauna bathing and risk of dementia, 2017",
      "The Journal of Physiology — Roberts et al., post-exercise cold water immersion attenuates anabolic signaling and long-term resistance-training adaptations, 2015",
    ],
  },
  {
    slug: "cgm-for-metabolic-health",
    title: "Glucose monitors for the non-diabetic",
    dek: "A continuous glucose monitor turns your blood sugar into a live feed. The feed is fascinating; the evidence that it makes healthy people healthier is thin.",
    tag: "Technology",
    minutes: 8,
    updated: "July 2026",
    tldr: "Continuous glucose monitors reveal that people respond very differently to the same foods, which is a genuine and useful insight. But there are no outcome trials showing that wearing one improves health in people without diabetes, and normal glucose swings are easy to over-pathologize. The best case is a motivated person using it as a short, structured experiment.",
    body: [
      "A continuous glucose monitor is a small sensor worn on the arm that samples the fluid just under your skin and streams an estimate of your blood sugar to your phone every few minutes. For people with diabetes it is a genuinely important medical device. The newer story is its migration to people without diabetes, sold through subscription programs as a window into metabolic health. The window is real. What you should conclude from the view is where things get complicated.",
      "The most durable insight the technology has delivered is that glucose responses are personal. In a landmark study of hundreds of people, researchers found that individuals could have strikingly different blood-sugar responses to the exact same meal, to the point that a food that spikes one person leaves another flat. That undercuts the idea of a single universally good or bad food and supports a more individualized view of nutrition. It is a legitimately interesting finding, and it is the strongest thing a CGM has going for it.",
      "The trouble begins when a research insight becomes a consumer promise. There are, as yet, no randomized trials showing that healthy people who wear a CGM end up healthier, lose more weight, or avoid disease compared with those who do not. The benefit is inferred from the plausibility of the feedback loop, not demonstrated by outcomes. That is a meaningful gap, and it is worth holding in mind when a program implies the device itself is the intervention.",
      "There is also a risk of pathologizing the normal. Blood sugar is supposed to rise after you eat, especially after carbohydrates, and a post-meal bump is not evidence of damage. Someone new to a CGM can watch an ordinary, healthy excursion and conclude they have a problem, then start avoiding perfectly reasonable foods on the basis of a squiggle. The sensors are also imperfect, with a typical error margin that makes small differences noisier than they look on the graph.",
      "Related research described so-called glucotypes, patterns of glucose variability that differ between people even within the normal range. It is a compelling idea and a useful research tool, but it has not been validated as a basis for medical decisions, and it should not be treated as a diagnosis you can read off your phone. Interesting is not the same as actionable.",
      "So who actually benefits? The strongest case is someone with prediabetes, insulin resistance, or a family history that puts metabolic health front of mind, using the device with guidance. For that person, seeing how a specific breakfast or an after-dinner walk changes their own curve can turn abstract advice into concrete behavior. The value is in the behavior change the data motivates, not in the data as an end in itself.",
      "A reasonable way to use one, then, is as a time-boxed experiment rather than a permanent accessory. Wear it for a few weeks, learn how your own body responds to your usual meals, movement, sleep, and stress, extract a handful of lessons, and move on. Over-the-counter versions have made this easier and cheaper, which is good, provided the lower barrier does not turn a useful curiosity into a source of daily anxiety.",
    ],
    evidence: [
      {
        claim: "Glucose responses to identical meals vary widely between individuals",
        grade: "Strong",
        note: "Demonstrated in large personalized-nutrition research.",
      },
      {
        claim: "CGM use in non-diabetics improves hard health outcomes",
        grade: "Early",
        note: "No outcome trials exist; the benefit is inferred rather than proven.",
      },
      {
        claim: "CGM feedback can support behavior change in motivated users",
        grade: "Moderate",
        note: "Plausible and reported, though confounded by the general attention the device brings.",
      },
      {
        claim: "Consumer glucotypes should drive individual medical decisions",
        grade: "Early",
        note: "An interesting research finding, not a validated clinical tool.",
      },
    ],
    sources: [
      "Cell — Zeevi et al., personalized nutrition by prediction of glycemic responses, 2015",
      "PLOS Biology — Hall et al., glucotypes reveal new patterns of glucose dysregulation, 2018",
      "Diabetes Care — Battelino et al., international consensus on continuous glucose monitoring data interpretation and time in range, 2019",
    ],
  },
  {
    slug: "epigenetic-clocks",
    title: "Reading a biological age",
    dek: "Methylation clocks promise to tell you how old you really are. The science is genuine, the consumer results are noisy, and the sane use is narrow.",
    tag: "Technology",
    minutes: 9,
    updated: "July 2026",
    tldr: "Epigenetic clocks estimate biological age from chemical marks on your DNA, and the better ones predict mortality and disease more accurately than your birthday does. But a single consumer result carries real technical noise, different clocks disagree, and evidence that lifestyle changes reliably reverse them is still early. Track trends, not single numbers.",
    body: [
      "Your cells carry more than your genetic code; they carry a layer of chemical annotations on top of it. One of the most studied is DNA methylation, small molecular tags that switch genes on and off and that shift in predictable ways as you age. Epigenetic clocks are algorithms that read the pattern of these tags at hundreds or thousands of sites and translate it into a number: your estimated biological age. It is one of the more scientifically grounded ideas in the longevity space, which is exactly why it is worth understanding its limits.",
      "The first clocks, developed around 2013, were built simply to predict chronological age, and they did so remarkably well, estimating how many years a person had lived from a blood or tissue sample. That was a proof of concept more than a health tool. Knowing a clock can guess your age is impressive, but it does not tell you anything your driver's license does not.",
      "The more useful generation came next. Clocks such as PhenoAge and GrimAge were trained not on age but on health outcomes, incorporating clinical markers and mortality data, and they predict disease risk and lifespan better than chronological age alone. A newer measure, DunedinPACE, does something subtly different: rather than estimating how old you are, it estimates how fast you are aging, the pace at which your body is accumulating change. That distinction between a point and a rate matters for how you would ever act on the result.",
      "Now the caution. When you send a sample to a consumer testing company, the number that comes back carries meaningful technical noise. Split the same blood draw and run it twice and the two biological ages can differ by more than you would expect, because the underlying measurement is sensitive to processing details. A single result reported to one decimal place implies a precision the assay does not actually have.",
      "Different clocks also disagree with one another, sometimes substantially, because they were built on different data with different goals. Being told you are biologically 42 by one test and 49 by another is not a paradox to resolve; it reflects that these are distinct statistical models, not readings of a single true quantity. Comparing your result across brands, or across time using different methods, mostly generates confusion.",
      "The most important open question is whether the clocks are actionable. It is one thing to measure biological age and another to show that a diet, a supplement, or an exercise program reliably turns it back. A few small trials have hinted at movement in the right direction, but robust randomized evidence that interventions durably reverse epigenetic age is not yet in hand. Until it is, a lower number after a lifestyle change is encouraging but not proof the change caused it.",
      "The sane way to use these tests, if you use them at all, is as a longitudinal signal rather than a verdict. Pick one clock, stick with the same provider and method, and watch the trend across years rather than agonizing over any single value. Treat a result as one noisy input among many, alongside your fitness, your labs, and how you actually feel, and resist the temptation to let a single decimal reorganize your life.",
    ],
    evidence: [
      {
        claim: "Second-generation clocks predict mortality and healthspan",
        grade: "Moderate",
        note: "Measures like PhenoAge and GrimAge outperform chronological-age clocks in cohort studies.",
      },
      {
        claim: "A single consumer biological-age result is precise",
        grade: "Early",
        note: "Technical noise means the same sample can return noticeably different ages.",
      },
      {
        claim: "Lifestyle interventions measurably reverse epigenetic age",
        grade: "Early",
        note: "A few small trials are suggestive; robust randomized evidence is lacking.",
      },
      {
        claim: "Clocks can track the pace of aging, not just a point estimate",
        grade: "Moderate",
        note: "DunedinPACE was purpose-built and validated for the rate of aging.",
      },
    ],
    sources: [
      "Genome Biology — Horvath, DNA methylation age of human tissues and cell types, 2013",
      "Aging — Levine et al., an epigenetic biomarker of aging for lifespan and healthspan (PhenoAge), 2018",
      "eLife — Belsky et al., DunedinPACE, a DNA methylation biomarker of the pace of aging, 2022",
    ],
  },
  {
    slug: "creatine-beyond-muscle",
    title: "Creatine, beyond the muscle",
    dek: "The most-studied supplement in sports nutrition is quietly building a case for the brain and for aging well.",
    tag: "Research",
    minutes: 8,
    updated: "July 2026",
    tldr: "Creatine monohydrate has overwhelming evidence for strength and lean mass and one of the strongest safety records of any supplement. Its more interesting frontier is the brain, where it appears to help most when brain creatine is low, such as during sleep deprivation or on a vegetarian diet. The broad cognitive claims are more modest and less settled than the muscle ones.",
    body: [
      "Creatine is the rare supplement that has earned its reputation. It is a compound your body already makes and stores mostly in muscle, where it helps regenerate the immediate energy currency cells burn during short, intense effort. It is also among the most thoroughly studied supplements in existence, with hundreds of trials, an unusually clean safety profile, and a boring but reliable core effect. That boring reliability is precisely what makes its newer, more interesting story worth taking seriously.",
      "The established case is about muscle, and it is not in doubt. Taken at a few grams a day, creatine monohydrate reliably improves strength, power, and lean mass when paired with resistance training, an effect replicated so many times that professional sports-nutrition bodies treat it as settled. If all creatine did was this, it would still be one of the few supplements worth the shelf space.",
      "The frontier is the brain, which also runs on the same energy system creatine supports. The guiding insight is that creatine seems to help most when brain creatine stores are depleted or under strain, and less when they are already full. That single idea explains much of the pattern in the research and is the key to reading the more excited headlines with appropriate skepticism.",
      "Two situations illustrate it. Vegetarians, who get little dietary creatine because it comes mainly from meat, have shown improvements in memory and reasoning tasks when supplemented, more so than meat-eaters with fuller stores. Similarly, creatine appears to buffer some of the cognitive hit from sleep deprivation, when the brain's energy economy is stressed. The effect shows up where the deficit is, which is exactly what a coherent mechanism predicts.",
      "For well-rested, well-fed adults, the cognitive story is real but more modest. Systematic reviews of controlled trials suggest creatine can produce small improvements in aspects of memory, with the clearest signal in older adults, whose baseline stores and needs differ from the young. This is a genuine effect worth noting, not a nootropic miracle, and the honest framing is a nudge rather than a transformation. Some emerging work also explores creatine as an adjunct in mood and healthy aging, but that remains early.",
      "Safety is where creatine quietly shines. Decades of study in healthy people have found it well tolerated at standard doses, and the frequently repeated worry about kidney damage does not hold up in people with healthy kidneys. Creatine can nudge blood creatinine, a marker labs use to estimate kidney function, slightly upward, but this is a benign artifact of how the marker works rather than evidence of harm. Anyone with existing kidney disease should still clear it with a clinician first.",
      "Practically, the protocol is refreshingly simple. Three to five grams a day of plain creatine monohydrate, taken consistently, is enough; the loading phases and exotic branded forms are mostly marketing. It is cheap, it dissolves in water, and unlike most of the longevity aisle, it is backed by a mountain of data. For the brain-specific benefits, the evidence is still maturing, so the reasonable stance is optimism grounded in a mechanism, not certainty ahead of it.",
    ],
    evidence: [
      {
        claim: "Creatine monohydrate improves strength and lean mass with training",
        grade: "Strong",
        note: "Among the most replicated findings in sports nutrition.",
      },
      {
        claim: "Creatine supports cognition when brain stores are low",
        grade: "Moderate",
        note: "Benefits appear under sleep deprivation and in vegetarians; effects are modest.",
      },
      {
        claim: "Creatine broadly boosts memory in healthy, well-fed adults",
        grade: "Early",
        note: "Meta-analyses suggest small effects, strongest in older adults.",
      },
      {
        claim: "Standard doses are safe for people with healthy kidneys",
        grade: "Strong",
        note: "Decades of data; the small creatinine rise is a benign lab artifact.",
      },
    ],
    sources: [
      "Proceedings of the Royal Society B — Rae et al., oral creatine monohydrate supplementation improves brain performance, 2003",
      "Experimental Gerontology — Avgerinos et al., effects of creatine supplementation on cognitive function, systematic review of randomized controlled trials, 2018",
      "Journal of the International Society of Sports Nutrition — Kreider et al., position stand on creatine safety and efficacy, 2017",
    ],
  },
  {
    slug: "sleep-wearables",
    title: "What your sleep ring knows",
    dek: "Oura and WHOOP-class devices are excellent at some things and confidently wrong about others. The trick is knowing which is which.",
    tag: "Technology",
    minutes: 8,
    updated: "July 2026",
    tldr: "Modern sleep wearables measure duration, heart rate, and heart-rate variability well, and their trends can be genuinely useful. They are much shakier at labeling the specific stages of sleep, and they are not diagnostic devices. For a certain kind of user, obsessing over the nightly score can backfire into worse sleep, a phenomenon clinicians call orthosomnia.",
    body: [
      "A sleep ring or band promises to quantify the third of your life you spend unconscious, and to a real extent it delivers. Devices in the Oura and WHOOP class combine a motion sensor with an optical heart-rate sensor, and some add skin temperature, to reconstruct what your body did overnight. Understanding what these sensors can and cannot actually measure is the difference between a helpful habit and a nightly source of stress.",
      "Start with what they do well. For coarse but important metrics, consumer wearables have validated reasonably against laboratory equipment: total sleep duration, resting heart rate, heart-rate variability, and overnight temperature deviations. These are exactly the trends that respond to alcohol, late meals, illness, and stress, which makes the devices useful mirrors for behavior. If your ring shows your resting heart rate creeping up and your HRV dropping across a hard week, that is a signal worth heeding.",
      "The weaker part is sleep staging. Distinguishing light, deep, and REM sleep is genuinely hard to do from the wrist or finger, because it normally requires measuring brain waves, and the algorithms infer stages from indirect signals like movement and heart rate. Validation studies find only moderate agreement with clinical polysomnography, with deep and REM sleep the most error-prone. When your app declares you got exactly 48 minutes of deep sleep, treat that as an educated guess, not a measurement.",
      "This distinction matters because it tells you which numbers to trust. The aggregate picture, how long you slept and how your cardiovascular markers trended, is solid. The confident breakdown into color-coded stages is softer, and comparing last night's deep-sleep minutes against a friend's, or against an arbitrary target, reads more precision into the data than the sensor can support.",
      "These devices are also not medical diagnostics, and it is important not to let a wrist tracker substitute for a clinical evaluation. They are not designed or cleared to diagnose conditions like sleep apnea, and while some newer models flag breathing disturbances or low blood oxygen, those features are screening hints at best. If you snore heavily, wake unrefreshed, or suspect a disorder, the answer is a clinician and possibly a real sleep study, not a firmware update.",
      "There is a distinctly modern failure mode worth naming. Clinicians have described orthosomnia, a preoccupation with achieving perfect sleep data that paradoxically makes sleep worse. The pattern is familiar: a person becomes anxious about their sleep score, that anxiety makes it harder to fall and stay asleep, and the resulting poor score deepens the worry. The tool meant to help becomes the source of the problem, and for some people the healthiest move is to stop checking the number.",
      "Used with that awareness, the devices earn their place. Watch trends across weeks rather than agonizing over any single night, use the data to test concrete changes like an earlier last drink or a cooler room, and let the aggregate numbers guide you while holding the stage breakdown loosely. The goal is to sleep better, not to score better, and the two are not always the same thing.",
    ],
    evidence: [
      {
        claim: "Wearables track sleep duration, heart rate, and HRV reasonably well",
        grade: "Strong",
        note: "Validation studies show good agreement with reference equipment for these coarse metrics.",
      },
      {
        claim: "Wearables accurately stage light, deep, and REM sleep",
        grade: "Early",
        note: "Agreement with lab polysomnography is only moderate, worst for deep and REM.",
      },
      {
        claim: "Nightly scores can diagnose disorders such as sleep apnea",
        grade: "Early",
        note: "Not designed or cleared as diagnostics; newer breathing flags are screening hints at best.",
      },
      {
        claim: "Fixating on sleep scores can itself worsen sleep",
        grade: "Moderate",
        note: "Orthosomnia is a described clinical phenomenon in perfectionistic users.",
      },
    ],
    sources: [
      "Journal of Clinical Sleep Medicine — Baron et al., orthosomnia: are some patients taking the quantified self too far, 2017",
      "Medicine & Science in Sports & Exercise — de Zambotti et al., wearable sleep technology in clinical and research settings, 2019",
      "Nature and Science of Sleep — validation of a consumer sleep-tracking ring against polysomnography, 2021",
    ],
  },
];
