import { useState } from "react";

const STREAMS = ["Science (PCM)","Science (PCB)","Commerce","Arts/Humanities","Vocational"];

const COURSES = {
  "Science (PCM)": [
    { id:"btech_cs",   name:"B.Tech Computer Science",      duration:"4 yr", fees:"₹4–20L",    avgSalary:35000, startSalary:22000, saturation:"HIGH",      placement:58, internship:72, futureProof:4, demand:"STABLE",    breakeven:36, colleges:4200, roiScore:62, entranceExam:"JEE Main/Advanced",       afterGrad:"MNC / MS abroad / MBA" },
    { id:"btech_ece",  name:"B.Tech Electronics (ECE)",     duration:"4 yr", fees:"₹3–18L",    avgSalary:28000, startSalary:18000, saturation:"HIGH",      placement:52, internship:60, futureProof:3, demand:"STABLE",    breakeven:44, colleges:3600, roiScore:55, entranceExam:"JEE Main/Advanced",       afterGrad:"VLSI / Embedded / GATE / PSU" },
    { id:"btech_civil",name:"B.Tech Civil Engineering",     duration:"4 yr", fees:"₹2–12L",    avgSalary:22000, startSalary:15000, saturation:"VERY HIGH", placement:40, internship:50, futureProof:2, demand:"FALLING",   breakeven:55, colleges:3100, roiScore:35, entranceExam:"JEE Main",                afterGrad:"Govt jobs / GATE / Contractor" },
    { id:"btech_mech", name:"B.Tech Mechanical",            duration:"4 yr", fees:"₹3–15L",    avgSalary:25000, startSalary:18000, saturation:"VERY HIGH", placement:41, internship:55, futureProof:2, demand:"FALLING",   breakeven:52, colleges:3800, roiScore:38, entranceExam:"JEE Main",                afterGrad:"Core mech / MBA / GATE" },
    { id:"btech_it",   name:"B.Tech Information Technology",duration:"4 yr", fees:"₹3–15L",    avgSalary:30000, startSalary:20000, saturation:"HIGH",      placement:55, internship:65, futureProof:4, demand:"STABLE",    breakeven:38, colleges:2800, roiScore:58, entranceExam:"JEE Main",                afterGrad:"IT job / startup / MS" },
    { id:"bca",        name:"BCA (Computer Applications)",  duration:"3 yr", fees:"₹60K–4L",   avgSalary:20000, startSalary:14000, saturation:"HIGH",      placement:45, internship:50, futureProof:3, demand:"STABLE",    breakeven:22, colleges:5100, roiScore:52, entranceExam:"Merit / State CET",       afterGrad:"MCA / Software job / Certs" },
    { id:"polytechnic",name:"Polytechnic Diploma",          duration:"3 yr", fees:"₹30K–1.5L", avgSalary:22000, startSalary:16000, saturation:"MEDIUM",    placement:68, internship:80, futureProof:3, demand:"STABLE",    breakeven:8,  colleges:1900, roiScore:78, entranceExam:"State Polytechnic CET",   afterGrad:"Industry job / Lateral BTech" },
    { id:"bsc_ds",     name:"B.Sc Data Science",            duration:"3 yr", fees:"₹1–5L",     avgSalary:32000, startSalary:20000, saturation:"MEDIUM",    placement:55, internship:65, futureProof:5, demand:"GROWING",   breakeven:18, colleges:620,  roiScore:71, entranceExam:"Merit / CUET",            afterGrad:"Data analyst / ML / MS" },
    { id:"bsc_pure",   name:"B.Sc Physics/Chemistry/Maths", duration:"3 yr", fees:"₹20K–2L",   avgSalary:20000, startSalary:13000, saturation:"MEDIUM",    placement:38, internship:30, futureProof:3, demand:"STABLE",    breakeven:12, colleges:8000, roiScore:45, entranceExam:"Merit / CUET",            afterGrad:"MSc / Teaching / UPSC" },
  ],
  "Science (PCB)": [
    { id:"mbbs",       name:"MBBS",                         duration:"5.5 yr",fees:"₹25–80L",   avgSalary:60000, startSalary:40000, saturation:"LOW",       placement:95, internship:100,futureProof:5, demand:"GROWING",   breakeven:111,colleges:706,  roiScore:55, entranceExam:"NEET UG",                 afterGrad:"MD/MS / Hospital / Private" },
    { id:"bds",        name:"BDS (Dentistry)",              duration:"5 yr",  fees:"₹10–40L",   avgSalary:35000, startSalary:20000, saturation:"HIGH",      placement:72, internship:100,futureProof:4, demand:"STABLE",    breakeven:88, colleges:312,  roiScore:48, entranceExam:"NEET UG",                 afterGrad:"Private clinic / MDS / Abroad" },
    { id:"bpharm",     name:"B.Pharm",                      duration:"4 yr",  fees:"₹2–8L",     avgSalary:22000, startSalary:15000, saturation:"HIGH",      placement:52, internship:60, futureProof:3, demand:"STABLE",    breakeven:40, colleges:1800, roiScore:45, entranceExam:"NEET / State CET",        afterGrad:"Pharma company / M.Pharm" },
    { id:"bsc_nursing",name:"B.Sc Nursing",                 duration:"4 yr",  fees:"₹1.5–6L",   avgSalary:28000, startSalary:18000, saturation:"LOW",       placement:88, internship:95, futureProof:5, demand:"VERY HIGH", breakeven:24, colleges:2100, roiScore:80, entranceExam:"NEET / State",            afterGrad:"Govt / Private / Gulf / Canada" },
    { id:"paramedical",name:"Paramedical (MLT/Radiology)",  duration:"3 yr",  fees:"₹80K–3L",   avgSalary:20000, startSalary:14000, saturation:"LOW",       placement:76, internship:85, futureProof:4, demand:"GROWING",   breakeven:14, colleges:980,  roiScore:76, entranceExam:"State CET / Merit",       afterGrad:"Hospital / Diagnostic / Abroad" },
    { id:"bsc_biotech",name:"B.Sc Biotechnology",           duration:"3 yr",  fees:"₹1–5L",     avgSalary:22000, startSalary:14000, saturation:"HIGH",      placement:42, internship:45, futureProof:4, demand:"GROWING",   breakeven:24, colleges:1200, roiScore:50, entranceExam:"CUET / Merit",            afterGrad:"MSc / Research / Pharma R&D" },
  ],
  "Commerce": [
    { id:"ca",         name:"CA (Foundation → Final)",      duration:"4–5 yr",fees:"₹1–2L total",avgSalary:55000,startSalary:30000, saturation:"LOW",       placement:90, internship:100,futureProof:4, demand:"STABLE",    breakeven:3,  colleges:0,    roiScore:91, entranceExam:"CA Foundation (ICAI)",    afterGrad:"Big4 / Industry CFO / Own practice" },
    { id:"cs_course",  name:"CS (Company Secretary)",       duration:"3–4 yr",fees:"₹60K–1L",   avgSalary:40000, startSalary:22000, saturation:"LOW",       placement:80, internship:100,futureProof:4, demand:"STABLE",    breakeven:5,  colleges:0,    roiScore:82, entranceExam:"CS Foundation (ICSI)",    afterGrad:"Corporate secretarial / Compliance" },
    { id:"cma",        name:"CMA (Cost Accountant)",        duration:"3–4 yr",fees:"₹50K–80K",   avgSalary:38000, startSalary:20000, saturation:"LOW",       placement:75, internship:100,futureProof:3, demand:"STABLE",    breakeven:4,  colleges:0,    roiScore:78, entranceExam:"CMA Foundation (ICMAI)",  afterGrad:"Cost audit / Industry / PSU" },
    { id:"bcom_hons",  name:"B.Com (Hons) + CFA prep",     duration:"3 yr",  fees:"₹50K–3L",   avgSalary:38000, startSalary:22000, saturation:"MEDIUM",    placement:62, internship:68, futureProof:4, demand:"GROWING",   breakeven:12, colleges:1200, roiScore:72, entranceExam:"CUET / State merit",      afterGrad:"Finance / Banking / MBA" },
    { id:"bba",        name:"BBA",                          duration:"3 yr",  fees:"₹1–5L",     avgSalary:22000, startSalary:16000, saturation:"HIGH",      placement:48, internship:55, futureProof:3, demand:"STABLE",    breakeven:22, colleges:3100, roiScore:50, entranceExam:"CUET / IPM / DU JAT",     afterGrad:"MBA / Marketing / Sales" },
    { id:"bcom",       name:"B.Com General",                duration:"3 yr",  fees:"₹30K–2L",   avgSalary:18000, startSalary:13000, saturation:"VERY HIGH", placement:35, internship:40, futureProof:2, demand:"FALLING",   breakeven:11, colleges:8200, roiScore:42, entranceExam:"Merit / CUET",            afterGrad:"Accountant / MBA / Govt exam" },
    { id:"bfia",       name:"BFIA (Finance & Accounting)",  duration:"3 yr",  fees:"₹1–4L",     avgSalary:28000, startSalary:18000, saturation:"LOW",       placement:65, internship:72, futureProof:4, demand:"GROWING",   breakeven:14, colleges:280,  roiScore:70, entranceExam:"CUET / Merit",            afterGrad:"FinTech / Banking / Investment" },
  ],
  "Arts/Humanities": [
    { id:"llb_5yr",    name:"LLB (5-yr Integrated)",        duration:"5 yr",  fees:"₹1–8L",     avgSalary:30000, startSalary:15000, saturation:"MEDIUM",    placement:55, internship:70, futureProof:4, demand:"GROWING",   breakeven:22, colleges:1100, roiScore:65, entranceExam:"CLAT / AILET",            afterGrad:"Law firm / Litigation / Legal KPO" },
    { id:"ba_polsci",  name:"BA Political Science (Hons)",  duration:"3 yr",  fees:"₹15K–2L",   avgSalary:24000, startSalary:15000, saturation:"MEDIUM",    placement:40, internship:35, futureProof:3, demand:"STABLE",    breakeven:10, colleges:3200, roiScore:52, entranceExam:"CUET / Merit",            afterGrad:"UPSC / Journalism / NGO / MA" },
    { id:"ba_eco",     name:"BA Economics (Hons)",          duration:"3 yr",  fees:"₹20K–2L",   avgSalary:28000, startSalary:18000, saturation:"MEDIUM",    placement:52, internship:48, futureProof:4, demand:"STABLE",    breakeven:8,  colleges:1800, roiScore:68, entranceExam:"CUET / Merit",            afterGrad:"Finance / Banking / UPSC / MA" },
    { id:"ba_english", name:"BA English (Hons)",            duration:"3 yr",  fees:"₹15K–2L",   avgSalary:20000, startSalary:12000, saturation:"HIGH",      placement:35, internship:38, futureProof:3, demand:"STABLE",    breakeven:12, colleges:4500, roiScore:44, entranceExam:"CUET / Merit",            afterGrad:"Content / Teaching / UPSC / MA" },
    { id:"journalism", name:"Journalism & Mass Comm",       duration:"3 yr",  fees:"₹50K–4L",   avgSalary:22000, startSalary:14000, saturation:"HIGH",      placement:42, internship:65, futureProof:3, demand:"CHANGING",  breakeven:20, colleges:900,  roiScore:48, entranceExam:"CUET / College entrance",  afterGrad:"Media / PR / Digital / Advertising" },
    { id:"psychology", name:"B.Sc / BA Psychology",        duration:"3 yr",  fees:"₹40K–3L",   avgSalary:24000, startSalary:16000, saturation:"LOW",       placement:58, internship:55, futureProof:5, demand:"GROWING",   breakeven:14, colleges:680,  roiScore:73, entranceExam:"CUET / Merit",            afterGrad:"HR / Counselling / MA / Research" },
    { id:"social_work",name:"Bachelor of Social Work (BSW)",duration:"3 yr",  fees:"₹20K–2L",   avgSalary:18000, startSalary:12000, saturation:"LOW",       placement:55, internship:80, futureProof:4, demand:"GROWING",   breakeven:12, colleges:520,  roiScore:60, entranceExam:"Merit / CUET",            afterGrad:"NGO / Govt welfare / TISS MA" },
    { id:"hotel_mgmt", name:"Hotel Management (BHM)",       duration:"4 yr",  fees:"₹2–8L",     avgSalary:25000, startSalary:16000, saturation:"MEDIUM",    placement:70, internship:95, futureProof:3, demand:"STABLE",    breakeven:28, colleges:400,  roiScore:65, entranceExam:"NCHMCT JEE / State",      afterGrad:"Hotel chain / Hospitality / Abroad" },
  ],
  "Vocational": [
    { id:"iti_elec",   name:"ITI — Electrician",            duration:"2 yr",  fees:"₹10–40K",   avgSalary:22000, startSalary:15000, saturation:"LOW",       placement:75, internship:85, futureProof:5, demand:"GROWING",   breakeven:3,  colleges:14000,roiScore:88, entranceExam:"State ITI / 10th marks",  afterGrad:"Self employ / Industry / EV sector" },
    { id:"iti_fitter", name:"ITI — Fitter / Welder",        duration:"2 yr",  fees:"₹10–35K",   avgSalary:20000, startSalary:14000, saturation:"LOW",       placement:70, internship:80, futureProof:3, demand:"STABLE",    breakeven:3,  colleges:12000,roiScore:80, entranceExam:"State ITI merit",         afterGrad:"Industry / Self employ / Gulf" },
    { id:"iti_copa",   name:"ITI — COPA (Computer Operator)",duration:"1 yr", fees:"₹8–25K",    avgSalary:15000, startSalary:11000, saturation:"MEDIUM",    placement:60, internship:65, futureProof:3, demand:"STABLE",    breakeven:2,  colleges:8000, roiScore:72, entranceExam:"State ITI merit",         afterGrad:"Data entry / Office / BCA lateral" },
    { id:"pmkvy",      name:"PMKVY Skill Course (3–6 mo)",  duration:"3–6 mo",fees:"FREE (Govt)",avgSalary:16000, startSalary:12000, saturation:"MEDIUM",    placement:55, internship:50, futureProof:3, demand:"STABLE",    breakeven:1,  colleges:9000, roiScore:70, entranceExam:"No exam — direct enroll", afterGrad:"Entry level / Self employ" },
    { id:"animation",  name:"Diploma Animation / Multimedia",duration:"2–3 yr",fees:"₹1–5L",    avgSalary:22000, startSalary:14000, saturation:"MEDIUM",    placement:55, internship:65, futureProof:4, demand:"GROWING",   breakeven:18, colleges:1200, roiScore:62, entranceExam:"Portfolio / entrance",    afterGrad:"Gaming / VFX / YouTube / Ad agency" },
  ],
};

// ── COLLEGE DATA ──────────────────────────────────────────────────────────────

// ── COLLEGE DATA ──────────────────────────────────────────────────────────────
// New trust fields on every record:
// regionalAvgFees   = average fees for this course in this city/state (market benchmark)
// feeVerdict        = "FAIR" | "SLIGHTLY HIGH" | "OVERCHARGED" vs regional average
// extraChargesOk    = true/false — are hidden/extra charges within UGC norms
// refundPolicy      = true/false — UGC-mandated refund on withdrawal honored
// courseJobMatch    = % graduates working in a field actually related to their course
// raggingRecord     = "CLEAN" | "MINOR COMPLAINTS" | "SERIOUS INCIDENTS"
// legalCases        = array of strings — known FIR/court cases against college/management (empty = none found)
const COLLEGES = [
  { id:"bits_pilani",  name:"BITS Pilani",                 city:"Pilani",     state:"Rajasthan",  type:"Private",     course:"btech_cs",  nirf:26,naac:"A++",fees:550000, hiddenCost:120000,regionalAvgFees:420000,feeVerdict:"SLIGHTLY HIGH",extraChargesOk:true, refundPolicy:true, courseJobMatch:88,claimedPlacement:95,realPlacement:91,avgPackage:1800000,minPackage:600000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:35000,ppoRate:38,companiesReal:["Google","Microsoft","Qualcomm","Samsung","Goldman Sachs"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"Merit scholarships available",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:92,redFlags:[],alumniFeedback:"Strong industry connect. PS internship is best thing about BITS — 2 real industry semesters.",admissionVerdict:"GO",admissionScore:94 },
  { id:"iit_bombay",   name:"IIT Bombay",                  city:"Mumbai",     state:"Maharashtra",type:"Government",  course:"btech_cs",  nirf:3, naac:"A++",fees:230000, hiddenCost:90000, regionalAvgFees:220000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:93,claimedPlacement:97,realPlacement:95,avgPackage:3200000,minPackage:900000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:60000,ppoRate:55,companiesReal:["Google","Microsoft","Goldman Sachs","Uber","Apple","McKinsey"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"SC/ST free + merit based",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["2021: Ragging complaint in hostel — institute action taken, no court case"],alumniScore:98,redFlags:[],alumniFeedback:"India ka #1. Internship mandatory aur international companies aati hain. Brand lifelong kaam aati hai.",admissionVerdict:"GO",admissionScore:98 },
  { id:"iit_delhi",    name:"IIT Delhi",                   city:"Delhi",      state:"Delhi",      type:"Government",  course:"btech_cs",  nirf:2, naac:"A++",fees:220000, hiddenCost:85000, regionalAvgFees:215000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:92,claimedPlacement:96,realPlacement:93,avgPackage:2900000,minPackage:850000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:55000,ppoRate:52,companiesReal:["Amazon","Google","D.E. Shaw","Zomato","Bain","BCG"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"SC/ST free + NEC",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:97,redFlags:[],alumniFeedback:"Delhi location ka bhi fayda — startup aur consulting ecosystem bahut strong hai.",admissionVerdict:"GO",admissionScore:96 },
  { id:"mnit_jaipur",  name:"MNIT Jaipur",                 city:"Jaipur",     state:"Rajasthan",  type:"Government",  course:"btech_cs",  nirf:48,naac:"A",  fees:145000, hiddenCost:60000, regionalAvgFees:150000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:70,claimedPlacement:85,realPlacement:72,avgPackage:1200000,minPackage:350000, internshipReal:true, internshipMandatory:false,internshipSemester:false,stipendAvg:20000,ppoRate:22,companiesReal:["TCS","Infosys","Wipro","Amazon","Jio"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"State merit + SC/ST",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:[],alumniScore:78,redFlags:["Internship students khud dhundhte hain — college nahi deta"],alumniFeedback:"Govt college toh fees kam. Placement decent par top companies sirf top rankers ko milti hain.",admissionVerdict:"GOOD",admissionScore:76 },
  { id:"iit_jodhpur",  name:"IIT Jodhpur",                 city:"Jodhpur",    state:"Rajasthan",  type:"Government",  course:"btech_cs",  nirf:52,naac:"A++",fees:220000, hiddenCost:80000, regionalAvgFees:218000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:87,claimedPlacement:93,realPlacement:89,avgPackage:2100000,minPackage:700000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:40000,ppoRate:42,companiesReal:["Google","Amazon","Microsoft","Flipkart","D.E. Shaw","ISRO"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"SC/ST free",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:91,redFlags:[],alumniFeedback:"New IIT par brand value strong. Research excellent. Internship guaranteed.",admissionVerdict:"GO",admissionScore:91 },
  { id:"dtu_delhi",    name:"Delhi Technological University",city:"Delhi",    state:"Delhi",      type:"Government",  course:"btech_cs",  nirf:55,naac:"A",  fees:165000, hiddenCost:50000, regionalAvgFees:160000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:68,claimedPlacement:84,realPlacement:76,avgPackage:1100000,minPackage:380000, internshipReal:true, internshipMandatory:false,internshipSemester:false,stipendAvg:22000,ppoRate:25,companiesReal:["Amazon","Flipkart","Samsung","Paytm","MakeMyTrip"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"Delhi domicile + merit",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:80,redFlags:["Top companies sirf top 20% ke liye"],alumniFeedback:"Delhi govt college — fees kam, placements decent. Location ka fayda milta hai.",admissionVerdict:"GOOD",admissionScore:78 },
  { id:"nit_trichy",   name:"NIT Tiruchirappalli",          city:"Trichy",     state:"Tamil Nadu", type:"Government",  course:"btech_cs",  nirf:10,naac:"A++",fees:150000, hiddenCost:55000, regionalAvgFees:155000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:80,claimedPlacement:88,realPlacement:84,avgPackage:1500000,minPackage:450000, internshipReal:true, internshipMandatory:false,internshipSemester:false,stipendAvg:25000,ppoRate:30,companiesReal:["Amazon","Zoho","Infosys","TCS","Cognizant","Samsung"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"SC/ST + merit",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:88,redFlags:["Internship mostly self-arranged"],alumniFeedback:"Best NIT India mein. South India ki companies khoob aati hain. Zoho ka strong connection.",admissionVerdict:"GO",admissionScore:86 },
  { id:"vit_vellore",  name:"VIT Vellore",                  city:"Vellore",    state:"Tamil Nadu", type:"Private",     course:"btech_cs",  nirf:15,naac:"A++",fees:390000, hiddenCost:140000,regionalAvgFees:300000,feeVerdict:"OVERCHARGED",extraChargesOk:false,refundPolicy:false,courseJobMatch:52,claimedPlacement:90,realPlacement:68,avgPackage:720000, minPackage:280000, internshipReal:true, internshipMandatory:true, internshipSemester:false,stipendAvg:15000,ppoRate:20,companiesReal:["TCS","Infosys","Wipro","Capgemini","IBM","Accenture"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:false,facultyIndustry:false,ugcApproved:true,scholarship:"VITEEE rank based",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["Hostel fee dispute complaints on student forums — no major litigation found"],alumniScore:70,redFlags:["90% claim vs 68% real","Mostly service companies — product rare","Fees bohot zyada for value","No clear refund policy on withdrawal"],alumniFeedback:"Brand naam accha par paisa zyada lagta hai. Service companies hi aati hain mostly.",admissionVerdict:"THINK",admissionScore:60 },
  { id:"manipal_jaipur",name:"Manipal University Jaipur",   city:"Jaipur",     state:"Rajasthan",  type:"Private",     course:"btech_cs",  nirf:80,naac:"A",  fees:420000, hiddenCost:130000,regionalAvgFees:280000,feeVerdict:"OVERCHARGED",extraChargesOk:false,refundPolicy:false,courseJobMatch:40,claimedPlacement:87,realPlacement:61,avgPackage:650000, minPackage:250000, internshipReal:true, internshipMandatory:true, internshipSemester:false,stipendAvg:12000,ppoRate:18,companiesReal:["Infosys","Wipro","Capgemini","HCL","Cognizant"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:false,facultyIndustry:false,ugcApproved:true,scholarship:"Limited merit scholarships",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["Parent complaints on fee hike without prior notice (2022)"],alumniScore:64,redFlags:["Fees brochure ₹4.2L — actual ₹5.5L+ with hostel","Product companies rare","Fees 50% above Jaipur regional average for similar colleges","Withdrawal refund difficult — students report partial/no refund"],alumniFeedback:"Infrastructure accha par sirf service companies placement mein. Product jana ho toh khud karo.",admissionVerdict:"THINK",admissionScore:58 },
  { id:"poornima",     name:"Poornima University",          city:"Jaipur",     state:"Rajasthan",  type:"Private",     course:"btech_cs",  nirf:0, naac:"B+", fees:280000, hiddenCost:95000, regionalAvgFees:200000,feeVerdict:"OVERCHARGED",extraChargesOk:false,refundPolicy:false,courseJobMatch:18,claimedPlacement:90,realPlacement:38,avgPackage:400000, minPackage:180000, internshipReal:false,internshipMandatory:false,internshipSemester:false,stipendAvg:0,    ppoRate:4, companiesReal:["Small IT firms","Local startups"],industryConnect:"LOW",labUpdated:false,studyEarn:false,facultyIndustry:false,ugcApproved:true,scholarship:"None significant",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["Multiple student complaints on consumer forums re: fee refund denial"],alumniScore:42,redFlags:["Claimed 90% vs real 38%","No mandatory internship","Outdated labs","Hidden fees zyada","Alumni LinkedIn pe college naam nahi likhte","Fees 40% above regional average for what's delivered","Only 18% graduates work in CS-related jobs — most do unrelated work","No refund on withdrawal — multiple complaints found"],alumniFeedback:"3 saal waste hua. Sirf local companies aati hain. Internship Internshala se khud dhundhni padti hai.",admissionVerdict:"AVOID",admissionScore:28 },
  { id:"amity_jaipur", name:"Amity University Jaipur",     city:"Jaipur",     state:"Rajasthan",  type:"Private",     course:"btech_cs",  nirf:0, naac:"A",  fees:380000, hiddenCost:150000,regionalAvgFees:200000,feeVerdict:"OVERCHARGED",extraChargesOk:false,refundPolicy:false,courseJobMatch:15,claimedPlacement:92,realPlacement:44,avgPackage:380000, minPackage:150000, internshipReal:false,internshipMandatory:false,internshipSemester:false,stipendAvg:0,    ppoRate:5, companiesReal:["Very small firms","Internship mills"],industryConnect:"LOW",labUpdated:false,studyEarn:false,facultyIndustry:false,ugcApproved:true,scholarship:"None real",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["Student forum complaints re: hidden fees and forced annual 'development charges'"],alumniScore:38,redFlags:["92% claim vs 44% reality","Actual package bahut kam","Hidden fees ₹1.5L extra","Internship fake","Labs 2018 se update nahi","Fees almost double Jaipur regional average","Only 15% graduates in CS-relevant jobs","Forced extra charges beyond brochure, no refund route"],alumniFeedback:"Brand name ke liye bahut zyada paisa. Real placement bilkul kam. Pachtaya ki kyon aaya.",admissionVerdict:"AVOID",admissionScore:22 },
  { id:"srm_chennai",  name:"SRM University Chennai",       city:"Chennai",    state:"Tamil Nadu", type:"Private",     course:"btech_cs",  nirf:35,naac:"A++",fees:360000, hiddenCost:160000,regionalAvgFees:270000,feeVerdict:"OVERCHARGED",extraChargesOk:false,refundPolicy:false,courseJobMatch:25,claimedPlacement:92,realPlacement:51,avgPackage:420000, minPackage:180000, internshipReal:false,internshipMandatory:false,internshipSemester:false,stipendAvg:0,    ppoRate:6, companiesReal:["Small IT","Mass recruiters only"],industryConnect:"LOW",labUpdated:false,studyEarn:false,facultyIndustry:false,ugcApproved:true,scholarship:"Rank based",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["2019: Hostel safety complaint investigated by university — no court case found"],alumniScore:44,redFlags:["92% vs 51% — bada jhooth","Mass recruitment — quality nahi","No real internship","Faculty inexperienced","Fees 33% above regional average","Only 25% in CS-relevant roles post-graduation"],alumniFeedback:"Placement drives mein 2000 students ek saath — koi individual attention nahi. Avoid karo.",admissionVerdict:"AVOID",admissionScore:30 },
  { id:"iit_kgp_mech", name:"IIT Kharagpur (Mech)",         city:"Kharagpur",  state:"WB",         type:"Government",  course:"btech_mech",nirf:5, naac:"A++",fees:220000, hiddenCost:80000, regionalAvgFees:215000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:55,claimedPlacement:88,realPlacement:82,avgPackage:1400000,minPackage:500000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:35000,ppoRate:35,companiesReal:["ISRO","DRDO","L&T","Tata Motors","Mahindra","Shell"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"SC/ST free",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:90,redFlags:["Core mech jobs shrinking — many pivot to MBA/MS","Only 55% end up in core mechanical roles — many shift to non-core"],alumniFeedback:"IIT brand se core + non-core dono milti hai. Bahut log MBA ya data science mein shift karte hain.",admissionVerdict:"GO",admissionScore:85 },
  { id:"coep_pune",    name:"COEP Pune (Mech)",             city:"Pune",       state:"Maharashtra",type:"Government",  course:"btech_mech",nirf:70,naac:"A",  fees:120000, hiddenCost:45000, regionalAvgFees:125000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:60,claimedPlacement:78,realPlacement:68,avgPackage:650000, minPackage:280000, internshipReal:true, internshipMandatory:false,internshipSemester:false,stipendAvg:12000,ppoRate:18,companiesReal:["Tata Motors","Bajaj","Mahindra","KPIT","Cummins"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"State merit",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:75,redFlags:["Core mech market shrinking — automation risk"],alumniFeedback:"Pune industrial belt ka fayda. Auto industry connections strong. Fees government jaisi.",admissionVerdict:"GOOD",admissionScore:72 },
  { id:"cmi_chennai",  name:"Chennai Mathematical Institute",city:"Chennai",   state:"Tamil Nadu", type:"Government",  course:"bsc_ds",    nirf:0, naac:"A",  fees:80000,  hiddenCost:35000, regionalAvgFees:90000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:85,claimedPlacement:85,realPlacement:82,avgPackage:1200000,minPackage:400000, internshipReal:true, internshipMandatory:true, internshipSemester:false,stipendAvg:30000,ppoRate:40,companiesReal:["Google","Jane Street","Goldman Sachs","Quant firms","Research labs"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"Full merit scholarships",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:91,redFlags:["Very niche — only for math-strong students"],alumniFeedback:"Hidden gem. Quant finance aur research mein sabse strong. Sirf math-passionate log apply karein.",admissionVerdict:"GO",admissionScore:88 },
  { id:"iit_madras_online",name:"IIT Madras — BS Data Science (Online)",city:"Online",state:"All India",type:"Government",course:"bsc_ds",nirf:1,naac:"A++",fees:200000,hiddenCost:10000,regionalAvgFees:200000,feeVerdict:"FAIR",extraChargesOk:true,refundPolicy:true,courseJobMatch:62,claimedPlacement:72,realPlacement:65,avgPackage:900000,minPackage:350000,internshipReal:true,internshipMandatory:false,internshipSemester:false,stipendAvg:18000,ppoRate:22,companiesReal:["Flipkart","Razorpay","Freshworks","Analytics firms"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"Income-based fee waiver",girlsFriendly:true,hostelAvail:false,raggingRecord:"CLEAN",legalCases:[],alumniScore:78,redFlags:["Online — campus experience nahi","Internship khud dhundhni padti hai"],alumniFeedback:"IIT brand ke saath work-while-study possible. Genuine seekhne walo ke liye bahut achha.",admissionVerdict:"GOOD",admissionScore:74 },
  { id:"aiims_delhi",  name:"AIIMS New Delhi",              city:"Delhi",      state:"Delhi",      type:"Government",  course:"mbbs",      nirf:1, naac:"A++",fees:50000,  hiddenCost:80000, regionalAvgFees:90000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:96,claimedPlacement:99,realPlacement:99,avgPackage:1200000,minPackage:600000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:30000,ppoRate:80,companiesReal:["Govt hospitals","Private hospitals","Research","Abroad (USMLE)"],industryConnect:"HIGH",labUpdated:true,studyEarn:false,facultyIndustry:true,ugcApproved:true,scholarship:"Almost free fees",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["Historic ragging cases reported in hostels pre-2015 — strict anti-ragging measures since"],alumniScore:99,redFlags:["NEET top 50 rank chahiye — extremely competitive"],alumniFeedback:"Sabse prestigious. Internship compulsory aur high quality. Fees almost free for what you get.",admissionVerdict:"GO",admissionScore:99 },
  { id:"sms_jaipur",   name:"SMS Medical College Jaipur",  city:"Jaipur",     state:"Rajasthan",  type:"Government",  course:"mbbs",      nirf:30,naac:"A",  fees:110000, hiddenCost:60000, regionalAvgFees:120000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:90,claimedPlacement:95,realPlacement:90,avgPackage:900000, minPackage:480000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:25000,ppoRate:65,companiesReal:["SMS Hospital","Fortis","Mahatma Gandhi Hospital","Govt service"],industryConnect:"HIGH",labUpdated:true,studyEarn:false,facultyIndustry:true,ugcApproved:true,scholarship:"State domicile benefit",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:86,redFlags:["PG seat competition bahut zyada"],alumniFeedback:"Rajasthan ka top govt medical college. Clinical exposure bahut acchi — patient volume zyada.",admissionVerdict:"GO",admissionScore:88 },
  { id:"private_mbbs", name:"Private MBBS Jaipur (Avg)",   city:"Jaipur",     state:"Rajasthan",  type:"Private",     course:"mbbs",      nirf:0, naac:"B+", fees:1500000,hiddenCost:500000,regionalAvgFees:1300000,feeVerdict:"SLIGHTLY HIGH",extraChargesOk:false,refundPolicy:false,courseJobMatch:75,claimedPlacement:90,realPlacement:82,avgPackage:720000, minPackage:360000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:15000,ppoRate:45,companiesReal:["Attached hospital","Private hospitals","Govt service"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:false,facultyIndustry:true,ugcApproved:true,scholarship:"NRI quota only",girlsFriendly:true,hostelAvail:true,raggingRecord:"MINOR COMPLAINTS",legalCases:["Donation/'management quota' payment complaints common across private medical colleges in this category — verify specifics before paying"],alumniScore:70,redFlags:["₹2 crore total — break-even 9+ years","NRI quota seats bahut mehngi","Only if govt seat nahi mili","Capitation/donation demands beyond official fee structure reported — illegal under law, verify before paying anything extra","No clear refund policy if seat surrendered"],alumniFeedback:"MBBS milti hai — par ₹2 crore ka loan bahut bada burden. Sirf last resort mein karo.",admissionVerdict:"THINK",admissionScore:52 },
  { id:"ruhs_nursing", name:"RUHS College of Nursing",     city:"Jaipur",     state:"Rajasthan",  type:"Government",  course:"bsc_nursing",nirf:0, naac:"A",  fees:60000,  hiddenCost:30000, regionalAvgFees:65000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:94,claimedPlacement:95,realPlacement:92,avgPackage:360000, minPackage:240000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:8000, ppoRate:55,companiesReal:["SMS Hospital","Fortis","Medanta","Govt hospitals","Abroad — Gulf/UK"],industryConnect:"HIGH",labUpdated:true,studyEarn:false,facultyIndustry:true,ugcApproved:true,scholarship:"Govt subsidized fees",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:88,redFlags:[],alumniFeedback:"Rajasthan govt nursing college. Clinical rotations genuine. Job pakki hai — nurses ki shortage hai.",admissionVerdict:"GO",admissionScore:90 },
  { id:"pgimer_nursing",name:"PGIMER Chandigarh Nursing",  city:"Chandigarh", state:"Punjab",     type:"Government",  course:"bsc_nursing",nirf:2, naac:"A++",fees:45000,  hiddenCost:40000, regionalAvgFees:50000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:96,claimedPlacement:98,realPlacement:96,avgPackage:480000, minPackage:300000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:12000,ppoRate:70,companiesReal:["PGIMER","AIIMS","Fortis","Max","Abroad — Gulf/UK/Canada"],industryConnect:"HIGH",labUpdated:true,studyEarn:false,facultyIndustry:true,ugcApproved:true,scholarship:"Govt subsidized",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:95,redFlags:[],alumniFeedback:"India mein nursing ke liye top institution. International opportunities bahut strong. Job guaranteed.",admissionVerdict:"GO",admissionScore:95 },
  { id:"icai_jaipur",  name:"ICAI — CA Program (Jaipur)",  city:"Jaipur",     state:"Rajasthan",  type:"Professional",course:"ca",        nirf:0, naac:"N/A",fees:35000,  hiddenCost:20000, regionalAvgFees:35000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:95,claimedPlacement:95,realPlacement:90,avgPackage:800000, minPackage:300000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:10000,ppoRate:60,companiesReal:["Big 4 (Deloitte/EY/KPMG/PwC)","Banks","PSUs","Corporate finance"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"N/A (exam-based program)",girlsFriendly:true,hostelAvail:false,raggingRecord:"CLEAN",legalCases:[],alumniScore:94,redFlags:["High failure rate — sirf 10% clear all levels first attempt","3 yr articleship low paid but mandatory"],alumniFeedback:"Sabse best ROI professional course India mein. 3 saal articleship mein real kaam milta hai.",admissionVerdict:"GO",admissionScore:93 },
  { id:"icsi_cs",      name:"ICSI — CS Program",           city:"All India",  state:"All India",  type:"Professional",course:"cs_course", nirf:0, naac:"N/A",fees:25000,  hiddenCost:15000, regionalAvgFees:25000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:90,claimedPlacement:80,realPlacement:75,avgPackage:600000, minPackage:250000, internshipReal:true, internshipMandatory:true, internshipSemester:false,stipendAvg:8000, ppoRate:40,companiesReal:["Corporate secretarial roles","Legal compliance","MNCs","PSUs"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"N/A",girlsFriendly:true,hostelAvail:false,raggingRecord:"CLEAN",legalCases:[],alumniScore:82,redFlags:["Less known than CA — job market smaller","Often done alongside degree"],alumniFeedback:"CA se alag niche hai. Corporate governance aur compliance mein excellent scope.",admissionVerdict:"GO",admissionScore:80 },
  { id:"srcc_delhi",   name:"SRCC Delhi University",       city:"Delhi",      state:"Delhi",      type:"Government",  course:"bcom",      nirf:5, naac:"A++",fees:25000,  hiddenCost:30000, regionalAvgFees:28000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:65,claimedPlacement:82,realPlacement:78,avgPackage:900000, minPackage:350000, internshipReal:true, internshipMandatory:false,internshipSemester:false,stipendAvg:20000,ppoRate:30,companiesReal:["Deloitte","EY","KPMG","Goldman Sachs","Bain","BCG"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"EWS + merit",girlsFriendly:true,hostelAvail:false,raggingRecord:"CLEAN",legalCases:[],alumniScore:90,redFlags:["Cut-off 99%+ — bahut competitive","Internship mostly self-arranged"],alumniFeedback:"B.Com ke liye India ka #1. Brand consulting aur finance mein bahut strong. Fees almost free.",admissionVerdict:"GO",admissionScore:88 },
  { id:"hansraj_bcom", name:"Hansraj College (B.Com Hons)",city:"Delhi",      state:"Delhi",      type:"Government",  course:"bcom_hons", nirf:20,naac:"A+", fees:22000,  hiddenCost:25000, regionalAvgFees:25000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:58,claimedPlacement:75,realPlacement:70,avgPackage:750000, minPackage:280000, internshipReal:true, internshipMandatory:false,internshipSemester:false,stipendAvg:15000,ppoRate:25,companiesReal:["Deloitte","Grant Thornton","KPMG","Hedge funds","Banks"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"DU merit + EWS",girlsFriendly:true,hostelAvail:false,raggingRecord:"CLEAN",legalCases:[],alumniScore:82,redFlags:["Placement support limited — khud karna padta hai"],alumniFeedback:"DU brand aur fees almost free. Finance mein jaana ho toh CFA saath mein shuru karo.",admissionVerdict:"GO",admissionScore:82 },
  { id:"christ_bcom",  name:"Christ University Bangalore", city:"Bangalore",  state:"Karnataka",  type:"Private",     course:"bcom",      nirf:40,naac:"A+", fees:120000, hiddenCost:60000, regionalAvgFees:95000, feeVerdict:"SLIGHTLY HIGH",extraChargesOk:true, refundPolicy:true, courseJobMatch:45,claimedPlacement:80,realPlacement:65,avgPackage:420000, minPackage:200000, internshipReal:true, internshipMandatory:true, internshipSemester:false,stipendAvg:10000,ppoRate:20,companiesReal:["Deloitte","KPMG","Wipro BPS","Local firms","Startups"],industryConnect:"MEDIUM",labUpdated:true,studyEarn:false,facultyIndustry:false,ugcApproved:true,scholarship:"Merit based",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:72,redFlags:["Strict rules — freedom nahi","Fees medium but placements average","Fees ~25% above Bangalore regional average"],alumniFeedback:"Discipline acchi sikhti hai. Placements decent. Bangalore location ka thoda fayda.",admissionVerdict:"THINK",admissionScore:62 },
  { id:"nmims_bba",    name:"NMIMS Mumbai — BBA",          city:"Mumbai",     state:"Maharashtra",type:"Private",     course:"bba",       nirf:25,naac:"A+", fees:450000, hiddenCost:120000,regionalAvgFees:350000,feeVerdict:"SLIGHTLY HIGH",extraChargesOk:true, refundPolicy:true, courseJobMatch:55,claimedPlacement:85,realPlacement:72,avgPackage:750000, minPackage:320000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:18000,ppoRate:28,companiesReal:["HDFC","Axis Bank","Amazon","P&G","Asian Paints","Deloitte"],industryConnect:"HIGH",labUpdated:true,studyEarn:false,facultyIndustry:true,ugcApproved:true,scholarship:"NPAT rank based",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:78,redFlags:["Fees zyada hain","Mumbai mein living cost bhi add hoti hai","~28% above Mumbai regional average for BBA"],alumniFeedback:"BBA ke liye strong brand. Internship genuine hai. Mumbai se industry exposure accha.",admissionVerdict:"GOOD",admissionScore:74 },
  { id:"nluj",         name:"NLU Jodhpur",                 city:"Jodhpur",    state:"Rajasthan",  type:"Government",  course:"llb_5yr",   nirf:3, naac:"A+", fees:180000, hiddenCost:70000, regionalAvgFees:175000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:85,claimedPlacement:88,realPlacement:84,avgPackage:1400000,minPackage:500000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:25000,ppoRate:35,companiesReal:["AZB","Cyril Amarchand","Khaitan","JSA","Top courts"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"SC/ST + merit",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:89,redFlags:[],alumniFeedback:"India ka top NLU. Internship culture strong — mandatory court/firm internships every semester.",admissionVerdict:"GO",admissionScore:88 },
  { id:"nlud",         name:"NLU Delhi",                   city:"Delhi",      state:"Delhi",      type:"Government",  course:"llb_5yr",   nirf:1, naac:"A+", fees:200000, hiddenCost:80000, regionalAvgFees:195000,feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:88,claimedPlacement:90,realPlacement:88,avgPackage:1800000,minPackage:600000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:30000,ppoRate:42,companiesReal:["AZB","S&R","Trilegal","Cyril Amarchand","Supreme Court"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"SC/ST + merit",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:93,redFlags:[],alumniFeedback:"Delhi location — Supreme Court aur top law firms sab paas. Internship culture excellent.",admissionVerdict:"GO",admissionScore:92 },
  { id:"uniraj_law",   name:"Univ. of Rajasthan — Law",   city:"Jaipur",     state:"Rajasthan",  type:"Government",  course:"llb_5yr",   nirf:0, naac:"B+", fees:25000,  hiddenCost:15000, regionalAvgFees:30000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:25,claimedPlacement:60,realPlacement:28,avgPackage:200000, minPackage:80000,  internshipReal:false,internshipMandatory:false,internshipSemester:false,stipendAvg:0,    ppoRate:3, companiesReal:["Self-arranged court internships only"],industryConnect:"LOW",labUpdated:false,studyEarn:true,facultyIndustry:false,ugcApproved:true,scholarship:"State fee concession",girlsFriendly:true,hostelAvail:false,raggingRecord:"MINOR COMPLAINTS",legalCases:[],alumniScore:51,redFlags:["Placement almost zero","No formal internship","Faculty mostly non-practicing","Infrastructure purana","Only 25% end up genuinely practicing law"],alumniFeedback:"Fees bahut kam. Baaki sab apne dum par karna padta hai. Self-driven logon ke liye theek.",admissionVerdict:"THINK",admissionScore:45 },
  { id:"igidr_eco",    name:"IGIDR Mumbai (Economics)",   city:"Mumbai",     state:"Maharashtra",type:"Government",  course:"ba_eco",    nirf:0, naac:"A+", fees:65000,  hiddenCost:40000, regionalAvgFees:70000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:80,claimedPlacement:88,realPlacement:84,avgPackage:900000, minPackage:400000, internshipReal:true, internshipMandatory:true, internshipSemester:false,stipendAvg:20000,ppoRate:35,companiesReal:["RBI","SEBI","World Bank","McKinsey","Crisil","Bain"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"Merit + SC/ST",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:88,redFlags:[],alumniFeedback:"Economics ke liye underrated gem. RBI aur SEBI ka direct pipeline. Policy + research careers best.",admissionVerdict:"GO",admissionScore:86 },
  { id:"iimc_delhi",   name:"IIMC New Delhi",              city:"Delhi",      state:"Delhi",      type:"Government",  course:"journalism",nirf:1, naac:"A",  fees:75000,  hiddenCost:40000, regionalAvgFees:80000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:75,claimedPlacement:78,realPlacement:70,avgPackage:480000, minPackage:180000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:12000,ppoRate:30,companiesReal:["NDTV","ABP","Dainik Bhaskar","BBC India","Reuters","PR firms"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"Merit based",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:82,redFlags:["Media industry pay low first 3 years"],alumniFeedback:"Journalism ke liye India ka #1. Faculty practicing journalists hain. Internship real news orgs mein.",admissionVerdict:"GO",admissionScore:80 },
  { id:"tiss_psych",   name:"TISS Mumbai — Applied Psych", city:"Mumbai",     state:"Maharashtra",type:"Government",  course:"psychology",nirf:5, naac:"A+", fees:55000,  hiddenCost:45000, regionalAvgFees:60000, feeVerdict:"FAIR",extraChargesOk:true, refundPolicy:true, courseJobMatch:78,claimedPlacement:85,realPlacement:80,avgPackage:550000, minPackage:280000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:15000,ppoRate:38,companiesReal:["Deloitte HR","Unilever","Google People Ops","NGOs","Hospitals"],industryConnect:"HIGH",labUpdated:true,studyEarn:true,facultyIndustry:true,ugcApproved:true,scholarship:"Need-based waiver",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:88,redFlags:[],alumniFeedback:"Applied psychology ka best college. HR tech aur organizational psych mein strong placements.",admissionVerdict:"GO",admissionScore:85 },
  { id:"manipal_para", name:"Manipal — Health Professions",city:"Manipal",   state:"Karnataka",  type:"Private",     course:"paramedical",nirf:15,naac:"A+", fees:180000, hiddenCost:90000, regionalAvgFees:150000,feeVerdict:"SLIGHTLY HIGH",extraChargesOk:true, refundPolicy:true, courseJobMatch:82,claimedPlacement:88,realPlacement:80,avgPackage:380000, minPackage:200000, internshipReal:true, internshipMandatory:true, internshipSemester:true, stipendAvg:10000,ppoRate:50,companiesReal:["Manipal Hospitals","Fortis","Apollo","Narayana Health","Gulf"],industryConnect:"HIGH",labUpdated:true,studyEarn:false,facultyIndustry:true,ugcApproved:true,scholarship:"Merit based",girlsFriendly:true,hostelAvail:true,raggingRecord:"CLEAN",legalCases:[],alumniScore:82,redFlags:["Fees high for paramedical","Hostel mandatory adds cost","~20% above regional average for paramedical"],alumniFeedback:"Paramedical ke liye best private option. Hospital attached — clinical exposure genuine.",admissionVerdict:"GOOD",admissionScore:80 },
];

// ── SELF EMPLOYMENT DATA ──────────────────────────────────────────────────────
const SE_CATEGORIES = ["🔧 Skilled Trade","💇 Beauty & Wellness","🍳 Food & Kitchen","📚 Coaching","💻 Digital","🌾 Farming","⚖️ Legal/Finance","🏡 Services","🎪 Events/Travel"];
const STATES = ["Rajasthan","UP","Maharashtra","Delhi","MP","Bihar","Gujarat","Karnataka","Tamil Nadu","WB","Punjab","Haryana"];
const SELF_EMP = [
  { id:"electrician",   name:"Electrician",             cat:"🔧 Skilled Trade",  course:"ITI Electrician (2 yr)",          courseFee:20000, setupCost:30000, monthlyProfit:[20000,55000], breakeven:3, futureProof:5, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"HIGH","Delhi":"VERY HIGH","MP":"LOW","Bihar":"VERY LOW","Gujarat":"MEDIUM","Karnataka":"HIGH","Tamil Nadu":"MEDIUM","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:88, why:"EV aur solar ki wajah se demand 2030 tak double hogi. AI replace nahi kar sakta." },
  { id:"ac_tech",       name:"AC Technician",           cat:"🔧 Skilled Trade",  course:"ITI / Short course (6 mo)",       courseFee:15000, setupCost:25000, monthlyProfit:[25000,70000], breakeven:2, futureProof:5, demand:"VERY HIGH", stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:92, why:"Climate change se AC usage badh raha hai. Tier-2/3 cities mein bahut kam technicians." },
  { id:"solar_tech",    name:"Solar Panel Technician",  cat:"🔧 Skilled Trade",  course:"MNRE certified course (3 mo)",    courseFee:12000, setupCost:20000, monthlyProfit:[30000,80000], breakeven:2, futureProof:5, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"LOW","Maharashtra":"LOW","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"VERY LOW","Karnataka":"LOW","Tamil Nadu":"VERY LOW","WB":"LOW","Punjab":"VERY LOW","Haryana":"VERY LOW"}, roiScore:95, why:"Govt ka ₹75,000 crore solar push. Rajasthan mein almost zero technicians — first mover advantage." },
  { id:"ev_mechanic",   name:"EV Mechanic",             cat:"🔧 Skilled Trade",  course:"ITI + EV specialization (6 mo)",  courseFee:18000, setupCost:40000, monthlyProfit:[30000,90000], breakeven:2, futureProof:5, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"VERY LOW","Maharashtra":"LOW","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"VERY LOW","Punjab":"VERY LOW","Haryana":"VERY LOW"}, roiScore:94, why:"2030 tak 30% vehicles EV honge. Mechanics almost zero hain — 10 saal ka window open hai." },
  { id:"plumber",       name:"Plumber",                 cat:"🔧 Skilled Trade",  course:"ITI Plumber (2 yr) / Short (6 mo)",courseFee:15000,setupCost:20000, monthlyProfit:[18000,50000], breakeven:2, futureProof:4, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:82, why:"Real estate boom se demand steady. Emergency calls = premium pricing." },
  { id:"carpenter",     name:"Carpenter / Furniture",   cat:"🔧 Skilled Trade",  course:"ITI Carpenter (2 yr)",            courseFee:15000, setupCost:35000, monthlyProfit:[20000,60000], breakeven:3, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"LOW","Bihar":"LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:78, why:"Custom furniture demand growing. Urban Company se orders milte hain." },
  { id:"mobile_repair", name:"Mobile / Laptop Repair",  cat:"🔧 Skilled Trade",  course:"Short course (3 mo)",             courseFee:8000,  setupCost:15000, monthlyProfit:[15000,40000], breakeven:1, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"MEDIUM","UP":"HIGH","Maharashtra":"VERY HIGH","Delhi":"VERY HIGH","MP":"MEDIUM","Bihar":"LOW","Gujarat":"HIGH","Karnataka":"HIGH","Tamil Nadu":"HIGH","WB":"MEDIUM","Punjab":"MEDIUM","Haryana":"MEDIUM"}, roiScore:72, why:"Stable demand par cities mein saturation. Rural mein scope hai abhi." },
  { id:"cctv_install",  name:"CCTV / Security Systems", cat:"🔧 Skilled Trade",  course:"Short course (1 mo)",             courseFee:8000,  setupCost:20000, monthlyProfit:[20000,55000], breakeven:2, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"VERY LOW"}, roiScore:84, why:"Security awareness boom. AMC contracts = recurring income." },
  { id:"ro_service",    name:"RO / Water Purifier Service",cat:"🔧 Skilled Trade",course:"Brand training (free / ₹5K)",   courseFee:5000,  setupCost:10000, monthlyProfit:[15000,40000], breakeven:1, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:80, why:"Water quality crisis se demand permanent. AMC = monthly recurring income." },
  { id:"beautician",    name:"Beautician / Parlour",    cat:"💇 Beauty & Wellness",course:"Beauty course (6 mo)",          courseFee:25000, setupCost:80000, monthlyProfit:[20000,60000], breakeven:5, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"MEDIUM","UP":"MEDIUM","Maharashtra":"VERY HIGH","Delhi":"VERY HIGH","MP":"LOW","Bihar":"LOW","Gujarat":"MEDIUM","Karnataka":"HIGH","Tamil Nadu":"MEDIUM","WB":"MEDIUM","Punjab":"MEDIUM","Haryana":"MEDIUM"}, roiScore:74, why:"Tier-2/3 cities mein women parlours growing. Bridal season extra income." },
  { id:"yoga_fitness",  name:"Yoga / Fitness Trainer",  cat:"💇 Beauty & Wellness",course:"Yoga cert (3 mo)",              courseFee:20000, setupCost:10000, monthlyProfit:[18000,55000], breakeven:1, futureProof:5, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:80, why:"Post-COVID health boom. Online classes se national reach. No shop needed." },
  { id:"mehendi",       name:"Mehendi Artist",          cat:"💇 Beauty & Wellness",course:"Self-learn / YouTube (free)",   courseFee:0,     setupCost:5000,  monthlyProfit:[10000,50000], breakeven:0, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"MEDIUM","UP":"MEDIUM","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"LOW","Bihar":"LOW","Gujarat":"MEDIUM","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"MEDIUM","Haryana":"MEDIUM"}, roiScore:70, why:"Wedding season mein ₹3K–8K per function. Bridal mehendi premium pricing." },
  { id:"tailoring",     name:"Tailoring / Boutique",    cat:"💇 Beauty & Wellness",course:"Tailoring course (3–6 mo)",     courseFee:10000, setupCost:25000, monthlyProfit:[12000,45000], breakeven:3, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"LOW","Bihar":"LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:72, why:"Custom stitching demand stable. Bridal alteration premium. Work from home." },
  { id:"tiffin",        name:"Tiffin / Cloud Kitchen",  cat:"🍳 Food & Kitchen", course:"No course needed",                courseFee:0,     setupCost:30000, monthlyProfit:[20000,60000], breakeven:2, futureProof:4, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"HIGH","Delhi":"HIGH","MP":"LOW","Bihar":"VERY LOW","Gujarat":"MEDIUM","Karnataka":"MEDIUM","Tamil Nadu":"MEDIUM","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:82, why:"Working professionals demand. Zomato/Swiggy se orders — no shop needed." },
  { id:"catering",      name:"Catering / Events Food",  cat:"🍳 Food & Kitchen", course:"No course needed",                courseFee:0,     setupCost:20000, monthlyProfit:[25000,80000], breakeven:1, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"MEDIUM","UP":"LOW","Maharashtra":"HIGH","Delhi":"HIGH","MP":"LOW","Bihar":"LOW","Gujarat":"MEDIUM","Karnataka":"MEDIUM","Tamil Nadu":"MEDIUM","WB":"LOW","Punjab":"MEDIUM","Haryana":"MEDIUM"}, roiScore:75, why:"Wedding season scope. Rajasthan mein events industry badi hai." },
  { id:"bakery",        name:"Home Bakery / Cake",      cat:"🍳 Food & Kitchen", course:"Baking course (1–3 mo)",          courseFee:8000,  setupCost:20000, monthlyProfit:[15000,50000], breakeven:2, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"VERY LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"VERY LOW","Haryana":"VERY LOW"}, roiScore:78, why:"Custom cake culture boom. Instagram marketing. Home-based — no rent." },
  { id:"tuition",       name:"Home Tuition / Coaching", cat:"📚 Coaching",       course:"Subject knowledge only",          courseFee:0,     setupCost:5000,  monthlyProfit:[12000,45000], breakeven:1, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"HIGH","UP":"HIGH","Maharashtra":"HIGH","Delhi":"VERY HIGH","MP":"MEDIUM","Bihar":"MEDIUM","Gujarat":"HIGH","Karnataka":"HIGH","Tamil Nadu":"HIGH","WB":"HIGH","Punjab":"HIGH","Haryana":"HIGH"}, roiScore:60, why:"Low investment par saturation zyada. Niche subjects mein scope." },
  { id:"dance_music",   name:"Dance / Music Teacher",   cat:"📚 Coaching",       course:"Degree / Self-trained",           courseFee:0,     setupCost:10000, monthlyProfit:[15000,50000], breakeven:2, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:72, why:"Parents invest heavily in extracurriculars. YouTube = passive income." },
  { id:"driving_school",name:"Driving School",          cat:"📚 Coaching",       course:"Driving license + RTO registration",courseFee:5000, setupCost:50000, monthlyProfit:[25000,70000], breakeven:3, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"LOW","Bihar":"LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:82, why:"Vehicle ownership growing. Mandatory license = guaranteed demand." },
  { id:"freelance_design",name:"Freelance Graphic Design",cat:"💻 Digital",      course:"Online course (3–6 mo)",          courseFee:10000, setupCost:50000, monthlyProfit:[20000,80000], breakeven:3, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:77, why:"International clients se dollars mein payment. Fiverr/Upwork se reach." },
  { id:"content_creator",name:"Content Creator / YouTuber",cat:"💻 Digital",     course:"Self-learn",                      courseFee:0,     setupCost:30000, monthlyProfit:[5000,200000],breakeven:12,futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"VERY LOW","Maharashtra":"LOW","Delhi":"LOW","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"VERY LOW","Karnataka":"LOW","Tamil Nadu":"VERY LOW","WB":"VERY LOW","Punjab":"VERY LOW","Haryana":"VERY LOW"}, roiScore:65, why:"High risk high reward. Regional language content mein scope. 12-18 mo patience chahiye." },
  { id:"social_media_mgr",name:"Social Media Manager",  cat:"💻 Digital",        course:"Online cert (2–3 mo)",            courseFee:8000,  setupCost:10000, monthlyProfit:[15000,50000], breakeven:1, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:70, why:"Local businesses need social presence. 5-10 clients = good income." },
  { id:"mushroom",      name:"Mushroom Farming",         cat:"🌾 Farming",       course:"ICAR/KVK training (1 mo)",        courseFee:3000,  setupCost:25000, monthlyProfit:[15000,45000], breakeven:2, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"VERY LOW","Maharashtra":"LOW","Delhi":"NA","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"VERY LOW","Karnataka":"VERY LOW","Tamil Nadu":"VERY LOW","WB":"VERY LOW","Punjab":"VERY LOW","Haryana":"VERY LOW"}, roiScore:86, why:"Indoor farming — weather independent. Hotels ki direct demand. Govt subsidy available." },
  { id:"dairy",         name:"Dairy / Goat Farming",     cat:"🌾 Farming",       course:"Pashu Palan Dept training (free)",courseFee:0,     setupCost:80000, monthlyProfit:[20000,60000], breakeven:6, futureProof:4, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"LOW","Delhi":"NA","MP":"LOW","Bihar":"LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:76, why:"Govt subsidy (NABARD). Milk demand permanent. Rajasthan goat farming tradition strong." },
  { id:"organic_farm",  name:"Organic Farming",          cat:"🌾 Farming",       course:"KVK training (free)",             courseFee:0,     setupCost:50000, monthlyProfit:[15000,55000], breakeven:8, futureProof:5, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"LOW","Delhi":"NA","MP":"LOW","Bihar":"LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:74, why:"Premium pricing. Urban direct delivery se middleman cut. Export = double income." },
  { id:"gst_consultant",name:"GST / Tax Consultant",     cat:"⚖️ Legal/Finance", course:"GST cert (2 mo)",                 courseFee:8000,  setupCost:10000, monthlyProfit:[20000,65000], breakeven:1, futureProof:4, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"MEDIUM","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:83, why:"Har business ko GST filing chahiye. March season premium fees." },
  { id:"insurance_dsa", name:"Insurance / Loan DSA",     cat:"⚖️ Legal/Finance", course:"IRDA exam (1 mo)",                courseFee:2000,  setupCost:0,     monthlyProfit:[10000,55000], breakeven:0, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"MEDIUM","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:70, why:"Zero setup cost. Commission scales with network. Rural penetration kam abhi bhi." },
  { id:"property_agent",name:"Property Dealer / Agent",  cat:"⚖️ Legal/Finance", course:"RERA registration + training",    courseFee:15000, setupCost:20000, monthlyProfit:[20000,150000],breakeven:2, futureProof:3, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"HIGH","Delhi":"HIGH","MP":"LOW","Bihar":"LOW","Gujarat":"MEDIUM","Karnataka":"HIGH","Tamil Nadu":"MEDIUM","WB":"LOW","Punjab":"MEDIUM","Haryana":"MEDIUM"}, roiScore:76, why:"Real estate boom. 1-2% commission = ₹20K-1L per deal. Network hi asset hai." },
  { id:"pest_control",  name:"Pest Control Service",     cat:"🏡 Services",      course:"Short training (15 days)",        courseFee:5000,  setupCost:30000, monthlyProfit:[20000,60000], breakeven:2, futureProof:4, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:82, why:"Annual contracts = recurring income. No competition in small towns." },
  { id:"laundry",       name:"Laundry / Dry Cleaning",   cat:"🏡 Services",      course:"No formal course",                courseFee:0,     setupCost:40000, monthlyProfit:[15000,50000], breakeven:4, futureProof:3, demand:"GROWING",   stateData:{"Rajasthan":"VERY LOW","UP":"VERY LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"VERY LOW","Bihar":"VERY LOW","Gujarat":"LOW","Karnataka":"MEDIUM","Tamil Nadu":"LOW","WB":"LOW","Punjab":"VERY LOW","Haryana":"VERY LOW"}, roiScore:74, why:"Working couples = laundry demand. Doorstep pickup = premium pricing." },
  { id:"event_mgmt",    name:"Event Management",         cat:"🎪 Events/Travel", course:"Event mgmt cert (3–6 mo)",        courseFee:20000, setupCost:30000, monthlyProfit:[20000,100000],breakeven:3, futureProof:3, demand:"STABLE",    stateData:{"Rajasthan":"MEDIUM","UP":"MEDIUM","Maharashtra":"HIGH","Delhi":"HIGH","MP":"LOW","Bihar":"LOW","Gujarat":"MEDIUM","Karnataka":"HIGH","Tamil Nadu":"MEDIUM","WB":"MEDIUM","Punjab":"HIGH","Haryana":"HIGH"}, roiScore:72, why:"Wedding industry ₹5 lakh crore. Rajasthan = wedding destination = huge scope." },
  { id:"travel_agent",  name:"Travel Agent / Tour Guide",cat:"🎪 Events/Travel", course:"Tourism cert / IATA (3 mo)",      courseFee:15000, setupCost:10000, monthlyProfit:[15000,60000], breakeven:2, futureProof:3, demand:"GROWING",   stateData:{"Rajasthan":"LOW","UP":"LOW","Maharashtra":"MEDIUM","Delhi":"HIGH","MP":"LOW","Bihar":"LOW","Gujarat":"LOW","Karnataka":"LOW","Tamil Nadu":"LOW","WB":"LOW","Punjab":"LOW","Haryana":"LOW"}, roiScore:70, why:"Post-COVID travel boom. Rajasthan = top tourist destination." },
];

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const SAT_COLOR={"VERY HIGH":"#ef4444","HIGH":"#f97316","MEDIUM":"#eab308","LOW":"#22c55e","VERY LOW":"#16a34a","NA":"#475569"};
const SAT_LABEL={"VERY HIGH":"🔴 बहुत भीड़","HIGH":"🟠 भीड़ है","MEDIUM":"🟡 ठीक है","LOW":"🟢 मौका है","VERY LOW":"🟢 बेस्ट मौका","NA":"⚪ N/A"};
const VERDICT={"GO":{color:"#22c55e",bg:"#052e16",border:"#16a34a",icon:"✅",label:"JOIN KARO"},"GOOD":{color:"#3b82f6",bg:"#0c1a2e",border:"#1e3a5f",icon:"👍",label:"ACHHA HAI"},"THINK":{color:"#eab308",bg:"#1c1700",border:"#713f12",icon:"⚠️",label:"SOCHNA PADEGA"},"AVOID":{color:"#ef4444",bg:"#1c0a0a",border:"#7f1d1d",icon:"🚨",label:"AVOID KARO"}};

// ── SHARED UI ─────────────────────────────────────────────────────────────────
const S = { page:{minHeight:"100vh",background:"#020617",fontFamily:"'Inter',sans-serif",padding:18}, wrap:{maxWidth:480,margin:"0 auto"}, card:{background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16,marginBottom:10}, inner:{background:"#020617",borderRadius:8,padding:10}, mono:{fontFamily:"monospace"} };
function ROIBar({score,color}){ const c=color||(score>=75?"#22c55e":score>=55?"#eab308":"#ef4444"); return(<div style={{marginTop:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:9,color:"#64748b",...S.mono}}>SCORE</span><span style={{fontSize:9,fontWeight:700,color:c,...S.mono}}>{score}/100</span></div><div style={{height:4,background:"#1e293b",borderRadius:99}}><div style={{height:4,width:`${score}%`,background:c,borderRadius:99,transition:"width 0.6s"}}/></div></div>); }
function Stars({n}){ return <span>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:11,color:i<=n?"#f59e0b":"#1e293b"}}>★</span>)}</span>; }
function Pill({label,color,bg}){ return <span style={{fontSize:10,fontWeight:700,color,background:bg||color+"22",borderRadius:99,padding:"2px 8px",whiteSpace:"nowrap"}}>{label}</span>; }
function Back({onClick,color="#6366f1"}){ return <button onClick={onClick} style={{background:"none",border:"none",color,cursor:"pointer",fontSize:13,fontWeight:600}}>← Wapas</button>; }
function MiniStat({label,value,color}){ return <div style={{...S.inner}}><div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:3}}>{label}</div><div style={{fontSize:14,fontWeight:800,color}}>{value}</div></div>; }
function SearchBar({value,onChange,placeholder}){ return <div style={{position:"relative",marginBottom:14}}><span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#475569",fontSize:14}}>🔍</span><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||"Search..."} style={{width:"100%",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"10px 12px 10px 36px",color:"#f1f5f9",fontSize:13,outline:"none",boxSizing:"border-box"}}/>{value&&<button onClick={()=>onChange("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:16}}>✕</button>}</div>; }
function FilterPills({options,active,onChange,accent="#6366f1"}){ return <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>{options.map(([v,l])=><button key={v} onClick={()=>onChange(v)} style={{background:active===v?"#1e1b4b":"#0f172a",border:`1px solid ${active===v?accent:"#1e293b"}`,borderRadius:99,padding:"4px 11px",color:active===v?"#818cf8":"#64748b",fontSize:10,cursor:"pointer",fontWeight:active===v?700:400,whiteSpace:"nowrap"}}>{l}</button>)}</div>; }

// ── COURSE CARD ───────────────────────────────────────────────────────────────
function CourseCard({c,onSelect}){
  const col=c.roiScore>=75?"#22c55e":c.roiScore>=55?"#eab308":"#ef4444";
  return(
    <div onClick={()=>onSelect(c)} style={{...S.card,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.borderColor=col} onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}>
      <div style={{fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:4}}>{c.name}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
        <span style={{fontSize:10,color:"#64748b"}}>⏱ {c.duration}</span>
        <span style={{fontSize:10,color:"#64748b"}}>💰 {c.fees}</span>
        <span style={{fontSize:10,color:"#64748b"}}>📝 {c.entranceExam}</span>
      </div>
      <ROIBar score={c.roiScore}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:10}}>
        {[{l:"PLACEMENT",v:`${c.placement}%`,col:c.placement>=70?"#22c55e":c.placement>=50?"#eab308":"#ef4444"},{l:"SATURATION",v:SAT_LABEL[c.saturation],col:SAT_COLOR[c.saturation]},{l:"FUTURE",v:<Stars n={c.futureProof}/>,col:"#f59e0b"}].map(x=>(
          <div key={x.l} style={{...S.inner,textAlign:"center"}}><div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:2}}>{x.l}</div><div style={{fontSize:11,fontWeight:700,color:x.col}}>{x.v}</div></div>
        ))}
      </div>
      <div style={{marginTop:8,fontSize:10,color:"#64748b"}}>🎓 Baad mein: {c.afterGrad}</div>
      <div style={{marginTop:6,fontSize:11,color:col,fontWeight:600,textAlign:"right"}}>College check karo →</div>
    </div>
  );
}

// ── COLLEGE LIST ──────────────────────────────────────────────────────────────
function CollegeListScreen({course,onSelect,onBack}){
  const [search,setSearch]=useState("");
  const [stateF,setStateF]=useState("Sab");
  const [verdictF,setVerdictF]=useState("Sab");
  const [typeF,setTypeF]=useState("Sab");
  const all=COLLEGES.filter(c=>c.course===course.id);
  const allStates=["Sab",...Array.from(new Set(all.map(c=>c.state)))];
  const filtered=all.filter(c=>{
    if(stateF!=="Sab"&&c.state!==stateF) return false;
    if(verdictF!=="Sab"&&c.admissionVerdict!==verdictF) return false;
    if(typeF!=="Sab"&&c.type!==typeF) return false;
    if(search&&!c.name.toLowerCase().includes(search.toLowerCase())&&!c.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a,b)=>b.admissionScore-a.admissionScore);

  if(all.length===0) return(
    <div style={S.page}><div style={S.wrap}><Back onClick={onBack}/><div style={{marginTop:40,textAlign:"center",color:"#475569",fontSize:13}}><div style={{fontSize:40,marginBottom:12}}>🏗️</div>Is course ke colleges ka data abhi add ho raha hai.</div></div></div>
  );
  return(
    <div style={S.page}><div style={S.wrap}>
      <Back onClick={onBack}/>
      <div style={{margin:"14px 0 4px",fontSize:10,color:"#475569",...S.mono}}>COLLEGES FOR</div>
      <div style={{fontSize:16,fontWeight:800,color:"#f1f5f9",marginBottom:14}}>{course.name}</div>
      <SearchBar value={search} onChange={setSearch} placeholder="College ya city search karo..."/>
      <div style={{marginBottom:8}}>
        <div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:5}}>STATE</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{allStates.map(s=><button key={s} onClick={()=>setStateF(s)} style={{background:stateF===s?"#1e1b4b":"#0f172a",border:`1px solid ${stateF===s?"#6366f1":"#1e293b"}`,borderRadius:99,padding:"3px 9px",color:stateF===s?"#818cf8":"#64748b",fontSize:10,cursor:"pointer"}}>{s}</button>)}</div>
      </div>
      <FilterPills options={[["Sab","Sab"],["GO","✅ Join"],["GOOD","👍 Achha"],["THINK","⚠️ Soch"],["AVOID","🚨 Avoid"]]} active={verdictF} onChange={setVerdictF}/>
      <FilterPills options={[["Sab","Sab"],["Government","🏛️ Govt"],["Private","🏢 Private"],["Professional","📋 Professional"]]} active={typeF} onChange={setTypeF}/>
      <div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:10}}>{filtered.length} COLLEGES — score se sorted</div>
      {filtered.length===0&&<div style={{textAlign:"center",color:"#475569",padding:30,fontSize:13}}>Koi match nahi — filter badlo</div>}
      {filtered.map(col=>{
        const vc=VERDICT[col.admissionVerdict];
        return(
          <div key={col.id} onClick={()=>onSelect(col)} style={{...S.card,cursor:"pointer",border:`1px solid ${vc.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9",marginBottom:4}}>{col.name}</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  <Pill label={col.city} color="#64748b"/>
                  <Pill label={col.type} color="#6366f1"/>
                  {col.nirf>0&&<Pill label={`NIRF #${col.nirf}`} color="#f59e0b"/>}
                  {!col.ugcApproved&&<Pill label="⚠️ UGC?" color="#ef4444"/>}
                </div>
              </div>
              <div style={{background:vc.bg,border:`1px solid ${vc.border}`,borderRadius:10,padding:"6px 10px",textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:9,fontWeight:800,color:vc.color,...S.mono}}>{vc.icon} {vc.label}</div>
              </div>
            </div>
            <ROIBar score={col.admissionScore} color={vc.color}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginTop:10}}>
              {[{l:"REAL %",v:`${col.realPlacement}%`,col:col.realPlacement>=70?"#22c55e":col.realPlacement>=50?"#eab308":"#ef4444"},{l:"JHOOTH",v:`${col.claimedPlacement-col.realPlacement}%`,col:(col.claimedPlacement-col.realPlacement)>15?"#ef4444":"#22c55e"},{l:"INTERN",v:col.internshipReal?"Real✅":"Fake❌",col:col.internshipReal?"#22c55e":"#ef4444"},{l:"FEES/YR",v:`₹${((col.fees+col.hiddenCost)/100000).toFixed(1)}L`,col:"#94a3b8"}].map(x=>(
                <div key={x.l} style={{...S.inner,textAlign:"center"}}><div style={{fontSize:8,color:"#475569",...S.mono,marginBottom:2}}>{x.l}</div><div style={{fontSize:10,fontWeight:700,color:x.col}}>{x.v}</div></div>
              ))}
            </div>
            <div style={{marginTop:8,fontSize:10,color:"#64748b"}}>👩‍🎓 Girls friendly: {col.girlsFriendly?"✅":""} | 🏠 Hostel: {col.hostelAvail?"✅":"❌"} | 💰 {col.scholarship}</div>
          </div>
        );
      })}
    </div></div>
  );
}

// ── ADMISSION DETAIL ──────────────────────────────────────────────────────────
function AdmissionCard({college,onBack}){
  const [tab,setTab]=useState("overview");
  const vc=VERDICT[college.admissionVerdict];
  const realTotal=college.fees+college.hiddenCost;
  const gap=college.claimedPlacement-college.realPlacement;
  return(
    <div style={{...S.page}}><div style={S.wrap}>
      <Back onClick={onBack}/>
      <div style={{background:"#0f172a",border:`2px solid ${vc.border}`,borderRadius:16,padding:18,margin:"14px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:"#f1f5f9",marginBottom:6}}>{college.name}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              <Pill label={college.city} color="#64748b"/>
              <Pill label={college.type} color="#6366f1"/>
              <Pill label={`NAAC: ${college.naac}`} color="#f59e0b"/>
              {college.nirf>0&&<Pill label={`NIRF #${college.nirf}`} color="#a78bfa"/>}
              <Pill label={college.ugcApproved?"✅ UGC Approved":"⚠️ Verify UGC"} color={college.ugcApproved?"#22c55e":"#ef4444"}/>
            </div>
          </div>
          <div style={{background:vc.bg,border:`1px solid ${vc.border}`,borderRadius:12,padding:"10px 12px",textAlign:"center",flexShrink:0}}>
            <div style={{fontSize:22}}>{vc.icon}</div>
            <div style={{fontSize:9,fontWeight:800,color:vc.color,...S.mono}}>{vc.label}</div>
          </div>
        </div>
        <ROIBar score={college.admissionScore} color={vc.color}/>
        <div style={{marginTop:10,fontSize:10,color:"#64748b"}}>👩‍🎓 Girls: {college.girlsFriendly?"✅ Friendly":""} | 🏠 Hostel: {college.hostelAvail?"Available":"Not available"} | 💰 {college.scholarship}</div>
      </div>

      <div style={{display:"flex",gap:5,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {[["overview","📊 Overview"],["placement","💼 Placement"],["internship","🏭 Internship"],["cost","💰 Real Cost"],["flags","🚨 Red Flags"],["trust","🛡️ Trust & Safety"]].map(([v,l])=>(
          <button key={v} onClick={()=>setTab(v)} style={{background:tab===v?"#1e1b4b":"#0f172a",border:`1px solid ${tab===v?"#6366f1":"#1e293b"}`,borderRadius:99,padding:"5px 11px",color:tab===v?"#818cf8":"#64748b",fontSize:10,cursor:"pointer",fontWeight:tab===v?700:400,whiteSpace:"nowrap"}}>{l}</button>
        ))}
      </div>

      {tab==="overview"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <MiniStat label="REAL PLACEMENT" value={`${college.realPlacement}%`} color={college.realPlacement>=75?"#22c55e":college.realPlacement>=55?"#eab308":"#ef4444"}/>
            <MiniStat label="AVG PACKAGE" value={`₹${(college.avgPackage/100000).toFixed(1)}L/yr`} color="#6366f1"/>
            <MiniStat label="INTERNSHIP" value={college.internshipReal?"Real ✅":"Fake ❌"} color={college.internshipReal?"#22c55e":"#ef4444"}/>
            <MiniStat label="STUDY+EARN" value={college.studyEarn?"Possible ✅":"Strict ❌"} color={college.studyEarn?"#22c55e":"#f97316"}/>
          </div>
          <div style={{...S.card,marginBottom:12}}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:6}}>👥 ALUMNI KA SACH</div>
            <div style={{fontSize:12,color:"#cbd5e1",lineHeight:1.7,fontStyle:"italic"}}>"{college.alumniFeedback}"</div>
            <div style={{marginTop:8,display:"flex",alignItems:"center",gap:6}}><Stars n={Math.round(college.alumniScore/20)}/><span style={{fontSize:10,color:"#64748b"}}>{college.alumniScore}/100</span></div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:8}}>🏢 ACTUAL COMPANIES JO AATI HAIN</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{college.companiesReal.map(c=><span key={c} style={{background:"#1e293b",borderRadius:6,padding:"3px 10px",fontSize:11,color:"#94a3b8"}}>{c}</span>)}</div>
          </div>
        </div>
      )}

      {tab==="placement"&&(
        <div>
          <div style={{background:gap>20?"#1c0a0a":"#0f172a",border:`1px solid ${gap>20?"#7f1d1d":"#1e293b"}`,borderRadius:12,padding:16,marginBottom:12}}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:10}}>CLAIMED vs REAL PLACEMENT</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"#64748b",marginBottom:4}}>BROCHURE MEIN</div><div style={{fontSize:30,fontWeight:900,color:"#f97316"}}>{college.claimedPlacement}%</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:9,color:"#64748b",marginBottom:4}}>ACTUAL REALITY</div><div style={{fontSize:30,fontWeight:900,color:college.realPlacement>=70?"#22c55e":"#ef4444"}}>{college.realPlacement}%</div></div>
            </div>
            {gap>10&&<div style={{marginTop:10,background:"#2d0a0a",borderRadius:8,padding:8,textAlign:"center"}}><div style={{fontSize:12,fontWeight:700,color:"#ef4444"}}>⚠️ {gap}% ka jhooth — brochure mat mano!</div></div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <MiniStat label="AVG PACKAGE" value={`₹${(college.avgPackage/100000).toFixed(1)}L/yr`} color="#22c55e"/>
            <MiniStat label="MIN PACKAGE" value={`₹${(college.minPackage/100000).toFixed(1)}L/yr`} color="#eab308"/>
            <MiniStat label="PPO RATE" value={`${college.ppoRate}%`} color={college.ppoRate>=30?"#22c55e":"#f97316"}/>
            <MiniStat label="INDUSTRY CONNECT" value={college.industryConnect} color={college.industryConnect==="HIGH"?"#22c55e":college.industryConnect==="MEDIUM"?"#eab308":"#ef4444"}/>
          </div>
          <div style={{...S.card,borderColor:"#1e3a5f",background:"#0c1a2e"}}>
            <div style={{fontSize:9,color:"#3b82f6",...S.mono,marginBottom:6}}>📌 PPO MATLAB?</div>
            <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.6}}>Internship ke baad directly job offer. {college.ppoRate}% PPO = internship wale {college.ppoRate}% ko seedha job.</div>
          </div>
        </div>
      )}

      {tab==="internship"&&(
        <div>
          <div style={{background:college.internshipReal?"#052e16":"#1c0a0a",border:`2px solid ${college.internshipReal?"#16a34a":"#7f1d1d"}`,borderRadius:14,padding:18,marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:36,marginBottom:8}}>{college.internshipReal?"✅":"❌"}</div>
            <div style={{fontSize:16,fontWeight:800,color:college.internshipReal?"#22c55e":"#ef4444"}}>{college.internshipReal?"REAL INTERNSHIP HAI":"INTERNSHIP FAKE HAI"}</div>
            <div style={{fontSize:11,color:"#64748b",marginTop:6}}>{college.internshipReal?"College directly arrange karta hai":"Students khud Internshala se dhundhte hain"}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <MiniStat label="MANDATORY?" value={college.internshipMandatory?"Haan ✅":"Nahi ❌"} color={college.internshipMandatory?"#22c55e":"#ef4444"}/>
            <MiniStat label="SEMESTER INTERN?" value={college.internshipSemester?"Haan ✅":"Nahi ❌"} color={college.internshipSemester?"#22c55e":"#ef4444"}/>
            <MiniStat label="AVG STIPEND" value={college.stipendAvg>0?`₹${college.stipendAvg.toLocaleString()}/mo`:"Unpaid"} color={college.stipendAvg>0?"#22c55e":"#f97316"}/>
            <MiniStat label="PPO CONVERSION" value={`${college.ppoRate}%`} color={college.ppoRate>=30?"#22c55e":"#eab308"}/>
          </div>
          <div style={{...S.card,marginBottom:10}}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:6}}>👨‍🏫 FACULTY INDUSTRY SE?</div>
            <div style={{fontSize:13,fontWeight:700,color:college.facultyIndustry?"#22c55e":"#ef4444"}}>{college.facultyIndustry?"✅ Haan — Practitioners padhate hain":"❌ Nahi — Sirf theoretical faculty"}</div>
          </div>
          <div style={{...S.card,borderColor:"#1e3a5f",background:"#0c1a2e"}}>
            <div style={{fontSize:9,color:"#3b82f6",...S.mono,marginBottom:6}}>💡 STUDY + EARN?</div>
            <div style={{fontSize:13,fontWeight:700,color:college.studyEarn?"#22c55e":"#f97316"}}>{college.studyEarn?"✅ Part-time kaam possible hai":"⚠️ Attendance strict — earning mushkil"}</div>
          </div>
        </div>
      )}

      {tab==="cost"&&(
        <div>
          <div style={S.card}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:12}}>💰 REAL COST BREAKDOWN (per year)</div>
            {[{l:"Stated Fees (brochure)",v:`₹${college.fees.toLocaleString()}`,col:"#94a3b8",note:""},{l:"Hidden costs",v:`₹${college.hiddenCost.toLocaleString()}`,col:"#f97316",note:"Hostel, books, events, exam fees"},{l:"REAL TOTAL per year",v:`₹${realTotal.toLocaleString()}`,col:"#ef4444",bold:true}].map((x,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<2?"1px solid #1e293b":"none"}}>
                <div><div style={{fontSize:12,color:"#94a3b8",fontWeight:x.bold?700:400}}>{x.l}</div>{x.note&&<div style={{fontSize:10,color:"#475569"}}>{x.note}</div>}</div>
                <div style={{fontSize:x.bold?17:14,fontWeight:800,color:x.col}}>{x.v}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,margin:"12px 0"}}>
            <MiniStat label="AVG START SALARY" value={`₹${Math.round(college.avgPackage/12).toLocaleString()}/mo`} color="#22c55e"/>
            <MiniStat label="MIN SALARY" value={`₹${Math.round(college.minPackage/12).toLocaleString()}/mo`} color="#eab308"/>
          </div>
          <div style={{...S.card,borderColor:"#1e3a5f",background:"#0c1a2e"}}>
            <div style={{fontSize:9,color:"#3b82f6",...S.mono,marginBottom:6}}>⚡ PAISA LAGATE HO TOH?</div>
            <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.7}}>{college.admissionVerdict==="GO"?`✅ Investment worth it. Real placement ${college.realPlacement}% aur companies genuine hain.`:college.admissionVerdict==="AVOID"?`🚨 Mat lagao. Claimed ${college.claimedPlacement}% vs real ${college.realPlacement}% — ₹${realTotal.toLocaleString()}/yr waste honge.`:`⚠️ Sochna padega. Better alternatives ho sakte hain same fees mein.`}</div>
          </div>
        </div>
      )}

      {tab==="flags"&&(
        <div>
          {college.redFlags.length===0?(
            <div style={{background:"#052e16",border:"1px solid #16a34a",borderRadius:14,padding:24,textAlign:"center",marginBottom:12}}>
              <div style={{fontSize:40,marginBottom:8}}>🟢</div>
              <div style={{fontSize:15,fontWeight:800,color:"#22c55e"}}>Koi Red Flag Nahi!</div>
              <div style={{fontSize:12,color:"#64748b",marginTop:6}}>Is college ka record clean hai.</div>
            </div>
          ):(
            <div style={{marginBottom:12}}>
              <div style={{fontSize:9,color:"#ef4444",...S.mono,marginBottom:10}}>🚨 {college.redFlags.length} RED FLAGS</div>
              {college.redFlags.map((f,i)=><div key={i} style={{background:"#1c0a0a",border:"1px solid #7f1d1d",borderRadius:10,padding:12,marginBottom:8,display:"flex",gap:10}}><span style={{fontSize:16,flexShrink:0}}>⛳</span><span style={{fontSize:12,color:"#fca5a5",lineHeight:1.6}}>{f}</span></div>)}
            </div>
          )}
          <div style={S.card}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:10}}>✅ ADMISSION SE PEHLE CHECK KARO</div>
            {[
              {q:"Placement data NIRF se verify kiya?",a:college.realPlacement>=college.claimedPlacement*0.85},
              {q:"UGC / AICTE approved hai?",a:college.ugcApproved},
              {q:"Internship curriculum mein mandatory hai?",a:college.internshipMandatory},
              {q:"Real companies ka naam website pe hai?",a:college.companiesReal.length>=3&&!college.companiesReal[0].includes("small")},
              {q:"Lab equipment updated hai (2022+)?",a:college.labUpdated},
              {q:"Faculty industry experience wali hai?",a:college.facultyIndustry},
              {q:"Alumni LinkedIn pe college naam likhte hain?",a:college.alumniScore>=70},
              {q:"Hostel available hai (if needed)?",a:college.hostelAvail},
              {q:"Girls ke liye safe aur friendly environment?",a:college.girlsFriendly},
              {q:"Study karte hue part-time earn possible?",a:college.studyEarn},
              {q:"Hidden fees including real total cost nikala?",a:true},
              {q:"Scholarship options check kiye?",a:college.scholarship!=="None significant"&&college.scholarship!=="None real"},
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"7px 0",borderBottom:i<11?"1px solid #1e293b":"none"}}>
                <span style={{fontSize:14,flexShrink:0}}>{item.a?"✅":"❌"}</span>
                <span style={{fontSize:11,color:item.a?"#94a3b8":"#fca5a5"}}>{item.q}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="trust"&&(
        <div>
          {/* Fee Fairness */}
          <div style={{...S.card,marginBottom:12,border:`1px solid ${college.feeVerdict==="FAIR"?"#16a34a":college.feeVerdict==="OVERCHARGED"?"#7f1d1d":"#713f12"}`}}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:10}}>💰 FEE FAIRNESS — REGIONAL COMPARISON</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div style={{...S.inner,textAlign:"center"}}>
                <div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:3}}>YAHAN FEES/YR</div>
                <div style={{fontSize:18,fontWeight:800,color:"#f1f5f9"}}>₹{((college.fees+college.hiddenCost)/100000).toFixed(1)}L</div>
              </div>
              <div style={{...S.inner,textAlign:"center"}}>
                <div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:3}}>REGIONAL AVERAGE</div>
                <div style={{fontSize:18,fontWeight:800,color:"#94a3b8"}}>₹{(college.regionalAvgFees/100000).toFixed(1)}L</div>
              </div>
            </div>
            <div style={{textAlign:"center",padding:"10px",borderRadius:10,background:college.feeVerdict==="FAIR"?"#052e16":college.feeVerdict==="OVERCHARGED"?"#1c0a0a":"#1c1700",border:`1px solid ${college.feeVerdict==="FAIR"?"#16a34a":college.feeVerdict==="OVERCHARGED"?"#7f1d1d":"#713f12"}`}}>
              <div style={{fontSize:16,fontWeight:800,color:college.feeVerdict==="FAIR"?"#22c55e":college.feeVerdict==="OVERCHARGED"?"#ef4444":"#eab308"}}>
                {college.feeVerdict==="FAIR"?"✅ FEES FAIR HAIN":college.feeVerdict==="OVERCHARGED"?"🚨 OVERCHARGED — REGIONAL AVERAGE SE ZYADA":"⚠️ SLIGHTLY HIGH"}
              </div>
              <div style={{fontSize:11,color:"#64748b",marginTop:4}}>
                {college.feeVerdict==="FAIR"?"Is course ke liye yeh fees region mein normal hai.":college.feeVerdict==="OVERCHARGED"?"Yeh college regional average se significantly zyada charge kar raha hai — better value options exist.":"Thodi zyada hai par justify ho sakti hai brand/infrastructure se."}
              </div>
            </div>
          </div>

          {/* Extra Charges & Refund */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div style={{...S.inner,textAlign:"center"}}>
              <div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:4}}>EXTRA CHARGES UGC NORM MEIN?</div>
              <div style={{fontSize:14,fontWeight:800,color:college.extraChargesOk?"#22c55e":"#ef4444"}}>{college.extraChargesOk?"✅ Haan — Sahi hain":"❌ Nahi — Suspicious charges"}</div>
              <div style={{fontSize:9,color:"#475569",marginTop:4}}>{college.extraChargesOk?"Dev/lab/sports fees reasonable hain":"Verify karo — some charges may be outside UGC norms"}</div>
            </div>
            <div style={{...S.inner,textAlign:"center"}}>
              <div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:4}}>UGC REFUND POLICY FOLLOW KARTE HAIN?</div>
              <div style={{fontSize:14,fontWeight:800,color:college.refundPolicy?"#22c55e":"#ef4444"}}>{college.refundPolicy?"✅ Haan":"❌ Nahi — Risk hai"}</div>
              <div style={{fontSize:9,color:"#475569",marginTop:4}}>{college.refundPolicy?"Withdrawal pe partial refund milta hai as per UGC rules":"Students ne refund deny hone ki complaints ki hain"}</div>
            </div>
          </div>

          {/* Course → Job Relevance */}
          <div style={{...S.card,marginBottom:12}}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:8}}>🎯 COURSE → JOB RELEVANCE</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:12,color:"#94a3b8"}}>Apne course se related field mein kaam karte hain</div>
              <div style={{fontSize:20,fontWeight:900,color:college.courseJobMatch>=75?"#22c55e":college.courseJobMatch>=50?"#eab308":"#ef4444"}}>{college.courseJobMatch}%</div>
            </div>
            <div style={{height:8,background:"#1e293b",borderRadius:99}}>
              <div style={{height:8,width:`${college.courseJobMatch}%`,background:college.courseJobMatch>=75?"#22c55e":college.courseJobMatch>=50?"#eab308":"#ef4444",borderRadius:99}}/>
            </div>
            <div style={{marginTop:8,fontSize:11,color:"#64748b",lineHeight:1.6}}>
              {college.courseJobMatch>=75?"✅ Zyada tar graduates apne course se related kaam karte hain — paisa sahi jagah lag raha hai.":college.courseJobMatch>=50?"⚠️ Adhe log hi relevant field mein hain — baaki unrelated jobs mein hain ya unemployed.":"🚨 Sirf "+college.courseJobMatch+"% relevant field mein — matlab yeh degree job guarantee nahi karti. Carefully sochna."}
            </div>
          </div>

          {/* Ragging Record */}
          <div style={{...S.card,marginBottom:12,border:`1px solid ${college.raggingRecord==="CLEAN"?"#16a34a":college.raggingRecord==="SERIOUS INCIDENTS"?"#7f1d1d":"#713f12"}`}}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:8}}>🛡️ RAGGING / SAFETY RECORD</div>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:28}}>{college.raggingRecord==="CLEAN"?"🟢":college.raggingRecord==="SERIOUS INCIDENTS"?"🔴":"🟡"}</div>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:college.raggingRecord==="CLEAN"?"#22c55e":college.raggingRecord==="SERIOUS INCIDENTS"?"#ef4444":"#eab308"}}>{college.raggingRecord}</div>
                <div style={{fontSize:11,color:"#64748b"}}>
                  {college.raggingRecord==="CLEAN"?"UGC anti-ragging portal pe koi major complaint nahi mili":college.raggingRecord==="SERIOUS INCIDENTS"?"Serious ragging incidents reported — verify current status":"Minor complaints found — check current anti-ragging measures"}
                </div>
              </div>
            </div>
          </div>

          {/* Legal Cases */}
          <div style={S.card}>
            <div style={{fontSize:9,color:"#64748b",...S.mono,marginBottom:8}}>⚖️ MANAGEMENT / COLLEGE KE KHILAF CASES</div>
            {college.legalCases.length===0?(
              <div style={{background:"#052e16",border:"1px solid #16a34a",borderRadius:10,padding:12,textAlign:"center"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#22c55e"}}>✅ Koi known legal case nahi mila</div>
                <div style={{fontSize:10,color:"#64748b",marginTop:4}}>Public records mein management ke khilaf koi major FIR/court case nahi mila</div>
              </div>
            ):(
              <div>
                {college.legalCases.map((c,i)=>(
                  <div key={i} style={{background:"#1c1700",border:"1px solid #713f12",borderRadius:10,padding:12,marginBottom:8,display:"flex",gap:10}}>
                    <span style={{fontSize:16,flexShrink:0}}>⚠️</span>
                    <span style={{fontSize:11,color:"#fde68a",lineHeight:1.6}}>{c}</span>
                  </div>
                ))}
                <div style={{fontSize:10,color:"#475569",marginTop:6}}>*Student khud RTI ya consumer forum se verify kar sakta hai</div>
              </div>
            )}
          </div>

          {/* Student Rights reminder */}
          <div style={{...S.card,marginTop:10,borderColor:"#1e3a5f",background:"#0c1a2e"}}>
            <div style={{fontSize:9,color:"#3b82f6",...S.mono,marginBottom:8}}>📋 TUMHARA STUDENT RIGHTS CHECKLIST</div>
            {[
              "UGC refund rules: Withdrawal pe 15 days tak full refund milna chahiye (minus processing fee)",
              "Anti-ragging helpline: 1800-180-5522 — free, 24x7, confidential",
              "Fee receipt lena mandatory hai — cash mat do, online ya DD se pay karo",
              "Capitation/donation dena aur lena dono illegal hai — koi bhi maange toh UGC ko report karo",
              "Hostel room allotment writing mein lo — verbal commitment na maano",
              "Bond ya service agreement sign karne se pehle lawyer se dikhaao",
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<5?"1px solid #1e293b":"none"}}>
                <span style={{color:"#3b82f6",flexShrink:0,fontSize:12}}>ℹ️</span>
                <span style={{fontSize:11,color:"#94a3b8",lineHeight:1.5}}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div></div>
  );
}

// ── SELF EMPLOYMENT CARD ──────────────────────────────────────────────────────
function SECard({item,selState}){
  const [open,setOpen]=useState(false);
  const sat=selState?(item.stateData[selState]||"NA"):null;
  return(
    <div style={{...S.card,border:`1px solid ${sat&&["LOW","VERY LOW"].includes(sat)?"#16a34a33":"#1e293b"}`}}>
      <div onClick={()=>setOpen(!open)} style={{cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div><div style={{fontSize:13,fontWeight:700,color:"#f1f5f9",marginBottom:4}}>{item.name}</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}><Pill label={item.cat} color="#6366f1"/>{sat&&<Pill label={SAT_LABEL[sat]} color={SAT_COLOR[sat]}/>}</div></div>
          <span style={{color:"#475569",fontSize:16}}>{open?"▲":"▼"}</span>
        </div>
        <ROIBar score={item.roiScore}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:10}}>
          {[{l:"PROFIT/MO",v:`₹${item.monthlyProfit[0]/1000}K–${item.monthlyProfit[1]/1000}K`,col:"#22c55e"},{l:"BREAK-EVEN",v:item.breakeven===0?"Instant":`${item.breakeven} mo`,col:item.breakeven<=3?"#22c55e":"#eab308"},{l:"FUTURE",v:<Stars n={item.futureProof}/>,col:"#f59e0b"}].map(x=>(
            <div key={x.l} style={{...S.inner,textAlign:"center"}}><div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:2}}>{x.l}</div><div style={{fontSize:11,fontWeight:700,color:x.col}}>{x.v}</div></div>
          ))}
        </div>
      </div>
      {open&&(
        <div style={{marginTop:12,borderTop:"1px solid #1e293b",paddingTop:12}}>
          <div style={{fontSize:10,color:"#64748b",marginBottom:4}}>📚 Course: {item.course}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            <MiniStat label="COURSE FEE" value={item.courseFee===0?"FREE":`₹${item.courseFee.toLocaleString()}`} color="#6366f1"/>
            <MiniStat label="SETUP COST" value={`₹${item.setupCost.toLocaleString()}`} color="#f97316"/>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:9,color:"#475569",...S.mono,marginBottom:6}}>STATE-WISE SATURATION</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{STATES.map(s=>{const sv=item.stateData[s]||"NA";return<div key={s} style={{background:SAT_COLOR[sv]+"22",border:`1p
