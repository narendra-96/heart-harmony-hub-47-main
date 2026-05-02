// // import { useEffect, useMemo, useState } from "react";
// // import { supabase } from "@/integrations/supabase/client";
// // import { useAuth } from "@/lib/auth";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Card } from "@/components/ui/card";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { Badge } from "@/components/ui/badge";
// // import {
// //   Camera,
// //   ChevronLeft,
// //   ChevronRight,
// //   Shield,
// //   ShieldCheck,
// // } from "lucide-react";

// // // ================================
// // // COUNTRY CODES
// // // ================================

// // const COUNTRY_CODES = [
// //   { code: "+91", label: "India (+91)" },
// //   { code: "+1", label: "USA (+1)" },
// //   { code: "+44", label: "UK (+44)" },
// //   { code: "+971", label: "UAE (+971)" },
// //   { code: "+61", label: "Australia (+61)" },
// //   { code: "+65", label: "Singapore (+65)" },
// //   { code: "+974", label: "Qatar (+974)" },
// //   { code: "+966", label: "Saudi Arabia (+966)" },
// // ];

// // // ================================
// // // COUNTRIES
// // // ================================

// // const COUNTRIES = [
// //   "India",
// //   "United States",
// //   "United Kingdom",
// //   "Australia",
// //   "Canada",
// //   "Singapore",
// //   "Germany",
// //   "France",
// //   "Japan",
// //   "Malaysia",
// //   "UAE",
// //   "Saudi Arabia",
// //   "Qatar",
// //   "South Africa",
// //   "Sri Lanka",
// //   "Nepal",
// //   "Bangladesh",
// //   "Pakistan",
// // ];

// // // ================================
// // // STATES
// // // ================================

// // const INDIA_STATES = [
// //   "Andhra Pradesh",
// //   "Arunachal Pradesh",
// //   "Assam",
// //   "Bihar",
// //   "Chhattisgarh",
// //   "Goa",
// //   "Gujarat",
// //   "Haryana",
// //   "Himachal Pradesh",
// //   "Jharkhand",
// //   "Karnataka",
// //   "Kerala",
// //   "Madhya Pradesh",
// //   "Maharashtra",
// //   "Manipur",
// //   "Meghalaya",
// //   "Mizoram",
// //   "Nagaland",
// //   "Odisha",
// //   "Punjab",
// //   "Rajasthan",
// //   "Sikkim",
// //   "Tamil Nadu",
// //   "Telangana",
// //   "Tripura",
// //   "Uttar Pradesh",
// //   "Uttarakhand",
// //   "West Bengal",
// //   "Delhi",
// // ];

// // // ================================
// // // CITIES
// // // ================================

// // const CITIES = {
// //   Telangana: ["Hyderabad", "Warangal", "Karimnagar", "Khammam"],
// //   Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore"],
// //   Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
// //   "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore"],
// //   "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Tirupati"],
// //   Kerala: ["Kochi", "Trivandrum", "Thrissur"],
// //   Delhi: ["New Delhi"],
// // };


// // export const BLOOD_GROUPS = [
// //   "A+",
// //   "A-",
// //   "B+",
// //   "B-",
// //   "AB+",
// //   "AB-",
// //   "O+",
// //   "O-",
// //   "Bombay Blood Group",
// //   "Rh-null",
// //   "Unknown",
// // ];

// // // ================================
// // // GOTHRAMS
// // // ================================

// // const GOTHRAMS = [
// //   "Aatreya",
// //   "Agastya",
// //   "Angirasa",
// //   "Athreya",
// //   "Bharadwaja",
// //   "Bhargava",
// //   "Bhrigu",
// //   "Garga",
// //   "Gautama",
// //   "Harita",
// //   "Jamadagni",
// //   "Kashyapa",
// //   "Kaushika",
// //   "Koundinya",
// //   "Mandavya",
// //   "Parashara",
// //   "Shandilya",
// //   "Srivatsa",
// //   "Vasishta",
// //   "Vishwamitra",
// //   "Pulastya",
// //   "Pulaha",
// //   "Kratu",
// //   "Atri",
// //   "Kanva",
// //   "Kapila",
// //   "Kutsa",
// //   "Maitreya",
// //   "Shaunaka",
// //   "Vatsa",
// //   "Yaska",
// //   "Galava",
// //   "Jaimini",
// //   "Katyayana",
// //   "Manava",
// //   "Valmiki",
// //   "Yajnavalkya",
// //   "Vamadeva",
// //   "Sankrithi",
// //   "Kapi",
// //   "Nidhruva",
// //   "Lohita",
// //   "Vyaghrapada",
// //   "Savarni",
// //   "Sounaka",
// //   "Paila",
// //   "Bodhayana",
// //   "Devla",
// //   "Maudgalya",
// //   "Aupamanyava",
// //   "Dhananjaya",
// //   "Koundilya",
// //   "Madhukalya",
// //   "Rohita",
// //   "Saakalya",
// //   "Somaraju",
// //   "Haritha",
// //   "Bharadwaj",
// //   "Kasyapa",
// //   "Atreya",
// //   "Devarata",
// //   "Vadhoola",
// //   "Upamanyu",
// //   "Satyayana",
// //   "Chyavana",
// //   "Raivata",
// //   "Alambayana",
// //   "Vaidarbha",
// //   "Kaundilya",
// //   "Sankhyayana",
// //   "Abhivandana",
// //   "Vadhula",
// //   "Karkotaka",
// //   "Dhanvantari",
// //   "Vishnuvardhana",
// //   "Kapinjala",
// //   "Romasha",
// //   "Shakti",
// //   "Suteekshna",
// //   "Vena",
// //   "Brihaspati",
// //   "Charaka",
// //   "Jatukarna",
// //   "Shukla",
// //   "Vyasa",
// //   "Parasarya",
// //   "Moudgalya",
// //   "Kaushik",
// //   "Pippalada",
// //   "Rathitara",
// //   "Sankriti",
// //   "Devala",
// //   "Kaudinya",
// //   "Aghamarshana",
// //   "Vatsya",
// //   "Marichi",
// //   "Shalihotra",
// //   "Vishnukundina",
// //   "Mandapala",
// //   "Drona",
// //   "Sandilya",
// //   "Kapinjala",
// //   "Haridra",
// //   "Soubhari",
// //   "Koundina",
// //   "Saunaka",
// //   "Vedamitra",
// //   "Other",
// // ];


// // export const CASTES = [
// //   "Brahmin",
// //   "Reddy",
// //   "Kamma",
// //   "Kapu",
// //   "Velama",
// //   "Naidu",
// //   "Yadav",
// //   "Rajput",
// //   "Maratha",
// //   "Patel",
// //   "Jat",
// //   "Agarwal",
// //   "Gupta",
// //   "Chettiar",
// //   "Mudaliar",
// //   "Nair",
// //   "Ezhava",
// //   "Vokkaliga",
// //   "Lingayat",
// //   "Kuruba",
// //   "Gowda",
// //   "Scheduled Caste (SC)",
// //   "Scheduled Tribe (ST)",
// //   "Other Backward Class (OBC)",
// //   "Baniya",
// //   "Kayastha",
// //   "Kshatriya",
// //   "Vaishya",
// //   "Sharma",
// //   "Iyer",
// //   "Iyengar",
// //   "Namboodiri",
// //   "Punjabi",
// //   "Sindhi",
// //   "Bunt",
// //   "Billava",
// //   "Devanga",
// //   "Balija",
// //   "Mala",
// //   "Madiga",
// //   "Kshatriya Raju",
// //   "Padmashali",
// //   "Viswakarma",
// //   "Vanniyar",
// //   "Thevar",
// //   "Gounder",
// //   "Adi Dravidar",
// //   "Arora",
// //   "Khatri",
// //   "Memon",
// //   "Ansari",
// //   "Sheikh",
// //   "Syed",
// //   "Pathan",
// //   "Dawoodi Bohra",
// //   "Jain",
// //   "Digambar",
// //   "Shwetambar",
// //   "Koli",
// //   "Meena",
// //   "Bishnoi",
// //   "Maheshwari",
// //   "Soni",
// //   "Teli",
// //   "Kumbhar",
// //   "Mochi",
// //   "Lohana",
// //   "Nadars",
// //   "Kori",
// //   "Kurmi",
// //   "Chaudhary",
// //   "Thakur",
// //   "Sahu",
// //   "Khandelwal",
// //   "Baidya",
// //   "CKP",
// //   "Besta",
// //   "Kasar",
// //   "Khatik",
// //   "Mukkulathor",
// //   "Agamudayar",
// //   "Vaddera",
// //   "Konar",
// //   "Setty Balija",
// //   "Perika",
// //   "Telaga",
// //   "Koppula Velama",
// //   "Turpu Kapu",
// //   "Mudiraj",
// //   "Bestha",
// //   "Boya",
// //   "Yellapu",
// //   "Arekatica",
// //   "Arya Vysya",
// //   "Komati",
// //   "Kummari",
// //   "Mangali",
// //   "Rajaka",
// //   "Gandla",
// //   "Jangam",
// //   "Dasari",
// //   "Pandit",
// //   "Sutar",
// //   "Sonar",
// //   "Other",
// // ];



// // const NAKSHATRAS = [
// //   "Ashwini",
// //   "Bharani",
// //   "Krittika",
// //   "Rohini",
// //   "Mrigashira",
// //   "Ardra",
// //   "Punarvasu",
// //   "Pushya",
// //   "Ashlesha",
// //   "Magha",
// //   "Hasta",
// //   "Chitra",
// //   "Swati",
// //   "Anuradha",
// //   "Revati",
// //   "Other",
// // ];

// // const RASIS = [
// //   "Mesha",
// //   "Vrishabha",
// //   "Mithuna",
// //   "Karka",
// //   "Simha",
// //   "Kanya",
// //   "Tula",
// //   "Vrischika",
// //   "Dhanu",
// //   "Makara",
// //   "Kumbha",
// //   "Meena",
// // ];

// // const THIDIS = [
// //   "Pratipada",
// //   "Dwitiya",
// //   "Tritiya",
// //   "Chaturthi",
// //   "Panchami",
// //   "Shashti",
// //   "Saptami",
// //   "Ashtami",
// //   "Navami",
// //   "Dashami",
// //   "Ekadashi",
// //   "Pournami",
// //   "Amavasya",
// // ];

// // const PROFESSIONS = [
// //   "Software Engineer",
// //   "Doctor",
// //   "Teacher",
// //   "Lawyer",
// //   "Business",
// //   "Government Employee",
// //   "Designer",
// //   "Farmer",
// //   "Student",
// //   "Other",
// // ];

// // const EDUCATIONS = [
// //   "SSC",
// //   "Intermediate",
// //   "Diploma",
// //   "B.Tech",
// //   "M.Tech",
// //   "MBA",
// //   "MBBS",
// //   "B.Sc",
// //   "M.Sc",
// //   "PhD",
// //   "Other",
// // ];

// // const RELIGIONS = [
// //   "Hindu",
// //   "Muslim",
// //   "Christian",
// //   "Sikh",
// //   "Jain",
// //   "Buddhist",
// //   "Other",
// // ];

// // const MOTHER_TONGUES = [
// //   "Telugu",
// //   "Tamil",
// //   "Hindi",
// //   "Kannada",
// //   "Malayalam",
// //   "English",
// //   "Other",
// // ];

// // const DIETS = [
// //   "Vegetarian",
// //   "Non Vegetarian",
// //   "Eggetarian",
// //   "Vegan",
// //   "Jain",
// // ];

// // const BODY_TYPES = ["Slim", "Average", "Athletic", "Heavy"];

// // const COMPLEXIONS = [
// //   "Very Fair",
// //   "Fair",
// //   "Wheatish",
// //   "Dusky",
// //   "Dark",
// // ];

// // const PRIVACY_OPTIONS = [
// //   {
// //     value: "public",
// //     label: "Visible to all",
// //   },
// //   {
// //     value: "matches_only",
// //     label: "Visible to matches only",
// //   },
// //   {
// //     value: "premium_only",
// //     label: "Visible to premium users",
// //   },
// //   {
// //     value: "hidden",
// //     label: "Hidden",
// //   },
// // ];

// // // ================================
// // // HELPERS
// // // ================================

// // const formatPhone = (value: string) => {
// //   return value.replace(/\D/g, "").slice(0, 10);
// // };

// // const validateFile = (file: File) => {
// //   const allowed = ["image/jpeg", "image/png", "application/pdf"];

// //   if (!allowed.includes(file.type)) {
// //     return "Invalid file type";
// //   }

// //   if (file.size > 5 * 1024 * 1024) {
// //     return "File too large";
// //   }

// //   return null;
// // };

// // const calculateProfileCompletion = (form: any) => {
// //   const fields = [
// //     "full_name",
// //     "date_of_birth",
// //     "religion",
// //     "mother_tongue",
// //     "education",
// //     "profession",
// //     "photo_url",
// //     "country",
// //     "state",
// //     "city",
// //     "about_me",
// //   ];

// //   let completed = 0;

// //   fields.forEach((field) => {
// //     if (form[field]) completed++;
// //   });

// //   return Math.round((completed / fields.length) * 100);
// // };

// // // ================================
// // // SEARCHABLE SELECT
// // // ================================

// // const SearchableSelect = ({
// //   label,
// //   options,
// //   value,
// //   onChange,
// // }: any) => {
// //   const [search, setSearch] = useState("");

// //   const filtered = options.filter((item: string) =>
// //     item.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="space-y-2">
// //       <Label>{label}</Label>

// //       <select
// //         value={value || ""}
// //         onChange={(e) => onChange(e.target.value)}
// //         className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
// //       >
// //         <option value="">Select {label}</option>

// //         {filtered.map((item: string) => (
// //           <option key={item} value={item}>
// //             {item}
// //           </option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // };

// // // ================================
// // // GALLERY MODAL
// // // ================================

// // const GalleryModal = ({
// //   open,
// //   images,
// //   selected,
// //   setSelected,
// //   onClose,
// // }: any) => {
// //   if (!open) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black/95">
// //       <div className="relative flex h-full items-center justify-center">
// //         <button
// //           className="absolute left-5 rounded-full bg-white/20 p-3 text-white"
// //           onClick={() =>
// //             setSelected(selected === 0 ? images.length - 1 : selected - 1)
// //           }
// //         >
// //           <ChevronLeft />
// //         </button>

// //         <img
// //           src={images[selected]}
// //           alt="gallery"
// //           className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
// //         />

// //         <button
// //           className="absolute right-5 rounded-full bg-white/20 p-3 text-white"
// //           onClick={() =>
// //             setSelected(selected === images.length - 1 ? 0 : selected + 1)
// //           }
// //         >
// //           <ChevronRight />
// //         </button>

// //         <button
// //           className="absolute right-5 top-5 rounded-lg bg-red-500 px-4 py-2 text-white"
// //           onClick={onClose}
// //         >
// //           Close
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // // ================================
// // // MAIN COMPONENT
// // // ================================

// // const MyProfile = () => {
// //   const { user } = useAuth();

// //   const [form, setForm] = useState<any>({});

// //   const [saving, setSaving] = useState(false);

// //   const [galleryOpen, setGalleryOpen] = useState(false);

// //   const [selectedImage, setSelectedImage] = useState(0);

// //   useEffect(() => {
// //     if (!user) return;

// //     supabase
// //       .from("profiles")
// //       .select("*")
// //       .eq("id", user.id)
// //       .maybeSingle()
// //       .then(({ data }) => {
// //         if (data) setForm(data);
// //       });
// //   }, [user]);

// //   const update = (key: string, value: any) => {
// //     setForm((prev: any) => ({
// //       ...prev,
// //       [key]: value,
// //     }));
// //   };

// //   const saveProfile = async () => {
// //     if (!user) return;

// //     setSaving(true);

// //     const { error } = await supabase.from("profiles").upsert({
// //       id: user.id,
// //       ...form,
// //       updated_at: new Date().toISOString(),
// //     });

// //     setSaving(false);

// //     if (error) {
// //       alert(error.message);
// //     } else {
// //       alert("Profile Saved");
// //     }
// //   };

// //   const handlePhotoUpload = async (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     field: string
// //   ) => {
// //     if (!e.target.files?.[0] || !user) return;

// //     try {
// //       const file = e.target.files[0];

// //       const validation = validateFile(file);

// //       if (validation) {
// //         alert(validation);
// //         return;
// //       }

// //       const ext = file.name.split(".").pop();

// //       const path = `${user.id}/${field}-${Date.now()}.${ext}`;

// //       const { error } = await supabase.storage
// //         .from("profile-photos")
// //         .upload(path, file, {
// //           upsert: true,
// //         });

// //       if (error) throw error;

// //       const { data } = supabase.storage
// //         .from("profile-photos")
// //         .getPublicUrl(path);

// //       update(field, data.publicUrl);
// //     } catch (e: any) {
// //       alert(e.message);
// //     }
// //   };

// //   const galleryImages = useMemo(() => {
// //     return [
// //       form.photo_url,
// //       form.photo_url_2,
// //       form.photo_url_3,
// //       form.photo_url_4,
// //       form.family_photo_url,
// //     ].filter(Boolean);
// //   }, [form]);

// //   const profilePercentage = calculateProfileCompletion(form);

// //   return (
// //     <div className="container max-w-7xl py-10">
// //       <div className="mb-8 text-center">
// //         <h1 className="text-5xl font-bold">Enterprise Matrimony Profile</h1>
// //         <p className="mt-2 text-muted-foreground">
// //           Complete your profile details
// //         </p>
// //       </div>

// //       <Card className="mb-6 p-6">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h2 className="text-2xl font-bold">Profile Completion</h2>
// //           </div>

// //           <Badge>{profilePercentage}%</Badge>
// //         </div>

// //         <div className="mt-4 h-4 rounded-full bg-muted overflow-hidden">
// //           <div
// //             className="h-full bg-green-500"
// //             style={{ width: `${profilePercentage}%` }}
// //           />
// //         </div>
// //       </Card>

// //       <Card className="p-8">
// //         {/* MAIN PHOTO */}

// //         <div className="mb-10 flex justify-center">
// //           <div className="space-y-3">
// //             <div
// //               onClick={() => {
// //                 setSelectedImage(0);
// //                 setGalleryOpen(true);
// //               }}
// //               className="relative h-48 w-48 cursor-pointer overflow-hidden rounded-full border-4 border-primary"
// //             >
// //               {form.photo_url ? (
// //                 <img
// //                   src={form.photo_url}
// //                   alt="main"
// //                   className="h-full w-full object-cover transition hover:scale-110"
// //                 />
// //               ) : (
// //                 <div className="flex h-full w-full items-center justify-center bg-muted">
// //                   <Camera className="h-10 w-10" />
// //                 </div>
// //               )}
// //             </div>

// //             <label className="cursor-pointer">
// //               <input
// //                 type="file"
// //                 className="hidden"
// //                 accept="image/*"
// //                 onChange={(e) => handlePhotoUpload(e, "photo_url")}
// //               />

// //               <div className="rounded-lg border px-4 py-2 text-center">
// //                 Upload Main Photo
// //               </div>
// //             </label>
// //           </div>
// //         </div>

// //         {/* BASIC DETAILS */}

// //         <div className="grid gap-4 md:grid-cols-2">
// //           <div>
// //             <Label>Full Name</Label>
// //             <Input
// //               value={form.full_name || ""}
// //               onChange={(e) => update("full_name", e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <Label>Date of Birth</Label>
// //             <Input
// //               type="date"
// //               value={form.date_of_birth || ""}
// //               onChange={(e) => update("date_of_birth", e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <Label>Birth Time</Label>
// //             <Input
// //               type="time"
// //               value={form.time_of_birth || ""}
// //               onChange={(e) => update("time_of_birth", e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <Label>AM / PM</Label>
// //             <select
// //               value={form.time_period || ""}
// //               onChange={(e) => update("time_period", e.target.value)}
// //               className="flex h-10 w-full rounded-md border border-input bg-background px-3"
// //             >
// //               <option value="">Select</option>
// //               <option value="AM">AM</option>
// //               <option value="PM">PM</option>
// //             </select>
// //           </div>

// //           <SearchableSelect
// //             label="Religion"
// //             options={RELIGIONS}
// //             value={form.religion}
// //             onChange={(v: string) => update("religion", v)}
// //           />

// //           <SearchableSelect
// //             label="Gothram"
// //             options={GOTHRAMS}
// //             value={form.community}
// //             onChange={(v: string) => update("community", v)}
// //           />

// //           <SearchableSelect
// //             label="caste"
// //             options={CASTES}
// //             value={form.caste}
// //             onChange={(v: string) => update("caste", v)}
// //           />

// //           <SearchableSelect
// //             label="Mother Tongue"
// //             options={MOTHER_TONGUES}
// //             value={form.mother_tongue}
// //             onChange={(v: string) => update("mother_tongue", v)}
// //           />

// //           <SearchableSelect
// //             label="Nakshatra"
// //             options={NAKSHATRAS}
// //             value={form.nakshatram}
// //             onChange={(v: string) => update("nakshatram", v)}
// //           />

// //           <SearchableSelect
// //             label="Rasi"
// //             options={RASIS}
// //             value={form.rasi}
// //             onChange={(v: string) => update("rasi", v)}
// //           />

// //           <SearchableSelect
// //             label="Thidi"
// //             options={THIDIS}
// //             value={form.thidi}
// //             onChange={(v: string) => update("thidi", v)}
// //           />

// //           <SearchableSelect
// //             label="Education"
// //             options={EDUCATIONS}
// //             value={form.education}
// //             onChange={(v: string) => update("education", v)}
// //           />

// //           <SearchableSelect
// //             label="Profession"
// //             options={PROFESSIONS}
// //             value={form.profession}
// //             onChange={(v: string) => update("profession", v)}
// //           />

// //           <SearchableSelect
// //             label="Diet"
// //             options={DIETS}
// //             value={form.diet}
// //             onChange={(v: string) => update("diet", v)}
// //           />

// //           <SearchableSelect
// //             label="Body Type"
// //             options={BODY_TYPES}
// //             value={form.body_type}
// //             onChange={(v: string) => update("body_type", v)}
// //           />

// //                     <SearchableSelect
// //             label="blood group"
// //             options={BLOOD_GROUPS}
// //             value={form.blood_group}
// //             onChange={(v: string) => update("blood_group", v)}
// //           />

// //           <SearchableSelect
// //             label="Complexion"
// //             options={COMPLEXIONS}
// //             value={form.complexion}
// //             onChange={(v: string) => update("complexion", v)}
// //           />

// //           <SearchableSelect
// //             label="Country"
// //             options={COUNTRIES}
// //             value={form.country}
// //             onChange={(v: string) => update("country", v)}
// //           />

// //           <SearchableSelect
// //             label="State"
// //             options={INDIA_STATES}
// //             value={form.state}
// //             onChange={(v: string) => update("state", v)}
// //           />

// //           <SearchableSelect
// //             label="City"
// //             options={CITIES[form.state] || []}
// //             value={form.city}
// //             onChange={(v: string) => update("city", v)}
// //           />
// //         </div>

// //         {/* ADDITIONAL PHOTOS */}

// //         <div className="mt-10">
// //           <h2 className="mb-4 text-2xl font-bold">Additional Photos</h2>

// //           <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
// //             {[
// //               "photo_url_2",
// //               "photo_url_3",
// //               "photo_url_4",
// //               "family_photo_url",
// //             ].map((field, index) => (
// //               <div key={field} className="space-y-2">
// //                 <div
// //                   onClick={() => {
// //                     setSelectedImage(index + 1);
// //                     setGalleryOpen(true);
// //                   }}
// //                   className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border"
// //                 >
// //                   {form[field] ? (
// //                     <img
// //                       src={form[field]}
// //                       alt={field}
// //                       className="h-full w-full object-cover transition hover:scale-110"
// //                     />
// //                   ) : (
// //                     <div className="flex h-full w-full items-center justify-center bg-muted">
// //                       <Camera className="h-8 w-8" />
// //                     </div>
// //                   )}
// //                 </div>

// //                 <label className="cursor-pointer">
// //                   <input
// //                     type="file"
// //                     className="hidden"
// //                     accept="image/*"
// //                     onChange={(e) => handlePhotoUpload(e, field)}
// //                   />

// //                   <div className="rounded-lg border px-3 py-2 text-center text-sm">
// //                     Upload
// //                   </div>
// //                 </label>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* CONTACT */}

// //         <div className="mt-10 grid gap-4 md:grid-cols-2">
// //           <div>
// //             <Label>Contact Number</Label>

// //             <div className="flex gap-2">
// //               <select
// //                 value={form.contact_code || "+91"}
// //                 onChange={(e) => update("contact_code", e.target.value)}
// //                 className="rounded-md border px-3"
// //               >
// //                 {COUNTRY_CODES.map((c) => (
// //                   <option key={c.code} value={c.code}>
// //                     {c.label}
// //                   </option>
// //                 ))}
// //               </select>

// //               <Input
// //                 maxLength={10}
// //                 value={form.contact_phone || ""}
// //                 onChange={(e) =>
// //                   update("contact_phone", formatPhone(e.target.value))
// //                 }
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <Label>Alternate Number</Label>

// //             <div className="flex gap-2">
// //               <select
// //                 value={form.alt_code || "+91"}
// //                 onChange={(e) => update("alt_code", e.target.value)}
// //                 className="rounded-md border px-3"
// //               >
// //                 {COUNTRY_CODES.map((c) => (
// //                   <option key={c.code} value={c.code}>
// //                     {c.label}
// //                   </option>
// //                 ))}
// //               </select>

// //               <Input
// //                 maxLength={10}
// //                 value={form.alternate_phone || ""}
// //                 onChange={(e) =>
// //                   update("alternate_phone", formatPhone(e.target.value))
// //                 }
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* WHATSAPP */}

// //         <div className="mt-6 flex items-center gap-3">
// //           <Checkbox
// //             checked={form.whatsapp_same}
// //             onCheckedChange={(checked) =>
// //               update("whatsapp_same", checked)
// //             }
// //           />

// //           <Label>WhatsApp same as contact number</Label>
// //         </div>

// //         {/* PARENT DETAILS */}

// //         <div className="mt-10 grid gap-4 md:grid-cols-3">
// //           <div>
// //             <Label>Parent Name</Label>
// //             <Input
// //               value={form.parent_name || ""}
// //               onChange={(e) => update("parent_name", e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <Label>Relation</Label>
// //             <Input
// //               value={form.parent_relation || ""}
// //               onChange={(e) => update("parent_relation", e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <Label>Parent Contact</Label>
// //             <Input
// //               value={form.parent_phone || ""}
// //               onChange={(e) =>
// //                 update("parent_phone", formatPhone(e.target.value))
// //               }
// //             />
// //           </div>
// //         </div>

// //         {/* ABOUT */}

// //         <div className="mt-10">
// //           <Label>About Me</Label>

// //           <Textarea
// //             rows={5}
// //             value={form.about_me || ""}
// //             onChange={(e) => update("about_me", e.target.value)}
// //           />
// //         </div>

// //         {/* VERIFICATION */}

// //         <div className="mt-10 rounded-xl border p-6">
// //           <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
// //             <ShieldCheck />
// //             Verification
// //           </h2>

// //           <div className="grid gap-4 md:grid-cols-2">
// //             <div>
// //               <Label>Aadhaar Upload</Label>
// //               <Input type="file" accept="image/*,.pdf" />
// //             </div>

// //             <div>
// //               <Label>Passport Upload</Label>
// //               <Input type="file" accept="image/*,.pdf" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* PRIVACY */}

// //         <div className="mt-10 rounded-xl border p-6">
// //           <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
// //             <Shield />
// //             Privacy
// //           </h2>

// //           <select
// //             value={form.photo_privacy || "public"}
// //             onChange={(e) => update("photo_privacy", e.target.value)}
// //             className="flex h-10 w-full rounded-md border border-input bg-background px-3"
// //           >
// //             {PRIVACY_OPTIONS.map((option) => (
// //               <option key={option.value} value={option.value}>
// //                 {option.label}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* SAVE */}

// //         <div className="mt-10">
// //           <Button
// //             onClick={saveProfile}
// //             disabled={saving}
// //             className="w-full text-lg"
// //           >
// //             {saving ? "Saving..." : "Save Profile"}
// //           </Button>
// //         </div>
// //       </Card>

// //       <GalleryModal
// //         open={galleryOpen}
// //         images={galleryImages}
// //         selected={selectedImage}
// //         setSelected={setSelectedImage}
// //         onClose={() => setGalleryOpen(false)}
// //       />
// //     </div>
// //   );
// // };

// // export default MyProfile;


// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Camera } from "lucide-react";

// // ==========================================
// // SIMPLE OPTIONS
// // ==========================================

// const CASTES = [
//   "Brahmin",
//   "Reddy",
//   "Kamma",
//   "Kapu",
//   "Velama",
//   "Naidu",
//   "Rajput",
//   "Vaishya",
//   "Other",
// ];

// const GOTHRAMS = [
//   "Aatreya",
//   "Agastya",
//   "Angirasa",
//   "Athreya",
//   "Bharadwaja",
//   "Bhargava",
//   "Bhrigu",
//   "Garga",
//   "Gautama",
//   "Harita",
//   "Jamadagni",
//   "Kashyapa",
//   "Kaushika",
//   "Koundinya",
//   "Mandavya",
//   "Parashara",
//   "Shandilya",
//   "Srivatsa",
//   "Vasishta",
//   "Vishwamitra",
//   "Other",
// ];

// const RASIS = [
//   "Mesha",
//   "Vrishabha",
//   "Mithuna",
//   "Karka",
//   "Simha",
//   "Kanya",
//   "Tula",
//   "Vrischika",
//   "Dhanu",
//   "Makara",
//   "Kumbha",
//   "Meena",
// ];

// const NAKSHATRAS = [
//   "Ashwini",
//   "Bharani",
//   "Krittika",
//   "Rohini",
//   "Mrigashira",
//   "Ardra",
//   "Punarvasu",
//   "Pushya",
//   "Ashlesha",
//   "Magha",
//   "Hasta",
//   "Chitra",
//   "Swati",
//   "Revati",
// ];

// const COMPLEXIONS = [
//   "Very Fair",
//   "Fair",
//   "Wheatish",
//   "Dusky",
//   "Dark",
// ];

// const EDUCATIONS = [
//   "SSC",
//   "Intermediate",
//   "Degree",
//   "B.Tech",
//   "M.Tech",
//   "MBA",
//   "MBBS",
//   "PhD",
// ];

// const OCCUPATIONS = [
//   "Software Engineer",
//   "Doctor",
//   "Teacher",
//   "Business",
//   "Government Job",
//   "Farmer",
//   "Other",
// ];

// // ==========================================
// // COMPONENT
// // ==========================================

// const MatrimonyBiodata = () => {
//   const [form, setForm] = useState<any>({
//     full_name: "",
//     dob: "",
//     birth_time: "",
//     birth_place: "",
//     caste: "",
//     s_gothram: "",
//     m_gothram: "",
//     rashi: "",
//     nakshatram: "",
//     height: "",
//     complexion: "",
//     education: "",
//     occupation: "",
//     income: "",
//     properties: "",
//     father_name: "",
//     father_occupation: "",
//     mother_name: "",
//     mother_occupation: "",
//     siblings: "",
//     address: "",
//     contact: "",
//     about: "",
//     photo: "",
//   });

//   const update = (key: string, value: any) => {
//     setForm((prev: any) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   // ==========================================
//   // PHOTO
//   // ==========================================

//   const handlePhoto = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (!e.target.files?.[0]) return;

//     const file = e.target.files[0];

//     const url = URL.createObjectURL(file);

//     update("photo", url);
//   };

//   // ==========================================
//   // ROW
//   // ==========================================

//   const Row = ({
//     label,
//     value,
//   }: any) => (
//     <div className="grid grid-cols-[180px_20px_1fr] border-b py-2 text-[15px] font-semibold text-red-900">
//       <div>{label}</div>
//       <div>:</div>
//       <div>{value || "-"}</div>
//     </div>
//   );

//   return (
//     <div className="flex justify-center bg-[#f5f0e8] p-6">
//       <Card className="w-full max-w-3xl overflow-hidden border-[3px] border-yellow-700 bg-white shadow-2xl">

//         {/* HEADER */}

//         <div className="border-b border-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-50 py-6 text-center">
//           <h1 className="text-4xl font-bold tracking-widest text-yellow-800">
//             SHREERASTU
//           </h1>

//           <p className="mt-2 text-lg font-semibold text-red-700">
//             MATRIMONY BIODATA
//           </p>
//         </div>

//         {/* MAIN */}

//         <div className="grid gap-8 p-8 md:grid-cols-[220px_1fr]">

//           {/* PHOTO */}

//           <div className="space-y-4">

//             <div className="overflow-hidden rounded-xl border-4 border-yellow-700">
//               {form.photo ? (
//                 <img
//                   src={form.photo}
//                   alt="profile"
//                   className="h-[260px] w-full object-cover"
//                 />
//               ) : (
//                 <div className="flex h-[260px] items-center justify-center bg-yellow-50">
//                   <Camera className="h-14 w-14 text-yellow-700" />
//                 </div>
//               )}
//             </div>

//             <label className="block cursor-pointer">
//               <input
//                 type="file"
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handlePhoto}
//               />

//               <div className="rounded-lg bg-red-700 px-4 py-3 text-center font-bold text-white">
//                 Upload Photo
//               </div>
//             </label>

//             {/* EDIT FORM */}

//             <div className="space-y-4">

//               <div>
//                 <Label>Full Name</Label>
//                 <Input
//                   value={form.full_name}
//                   onChange={(e) =>
//                     update("full_name", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Date of Birth</Label>
//                 <Input
//                   type="date"
//                   value={form.dob}
//                   onChange={(e) =>
//                     update("dob", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Birth Time</Label>
//                 <Input
//                   type="time"
//                   value={form.birth_time}
//                   onChange={(e) =>
//                     update("birth_time", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Place of Birth</Label>
//                 <Input
//                   value={form.birth_place}
//                   onChange={(e) =>
//                     update("birth_place", e.target.value)
//                   }
//                 />
//               </div>

//               {/* CASTE */}

//               <div>
//                 <Label>Caste</Label>

//                 <select
//                   value={form.caste}
//                   onChange={(e) =>
//                     update("caste", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {CASTES.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* S GOTHRAM */}

//               <div>
//                 <Label>S Gothram</Label>

//                 <select
//                   value={form.s_gothram}
//                   onChange={(e) =>
//                     update("s_gothram", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {GOTHRAMS.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* M GOTHRAM */}

//               <div>
//                 <Label>M Gothram</Label>

//                 <select
//                   value={form.m_gothram}
//                   onChange={(e) =>
//                     update("m_gothram", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {GOTHRAMS.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* BIODATA */}

//           <div>

//             {/* DETAILS */}

//             <div className="rounded-xl border-2 border-yellow-700 bg-yellow-50 p-5">

//               <Row
//                 label="Name"
//                 value={form.full_name}
//               />

//               <Row
//                 label="Date of Birth"
//                 value={form.dob}
//               />

//               <Row
//                 label="Time of Birth"
//                 value={form.birth_time}
//               />

//               <Row
//                 label="Place of Birth"
//                 value={form.birth_place}
//               />

//               <Row
//                 label="Caste"
//                 value={form.caste}
//               />

//               <Row
//                 label="S Gothram"
//                 value={form.s_gothram}
//               />

//               <Row
//                 label="M Gothram"
//                 value={form.m_gothram}
//               />

//               <Row
//                 label="Rashi"
//                 value={form.rashi}
//               />

//               <Row
//                 label="Nakshatram"
//                 value={form.nakshatram}
//               />

//               <Row
//                 label="Height"
//                 value={form.height}
//               />

//               <Row
//                 label="Complexion"
//                 value={form.complexion}
//               />

//               <Row
//                 label="Education"
//                 value={form.education}
//               />

//               <Row
//                 label="Occupation"
//                 value={form.occupation}
//               />

//               <Row
//                 label="Income"
//                 value={form.income}
//               />

//               <Row
//                 label="Properties"
//                 value={form.properties}
//               />
//             </div>

//             {/* FAMILY */}

//             <div className="mt-8 overflow-hidden rounded-xl border-2 border-red-700">

//               <div className="bg-red-700 px-5 py-3 text-xl font-bold text-white">
//                 FAMILY DETAILS
//               </div>

//               <div className="p-5">

//                 <Row
//                   label="Father Name"
//                   value={form.father_name}
//                 />

//                 <Row
//                   label="Occupation"
//                   value={form.father_occupation}
//                 />

//                 <Row
//                   label="Mother Name"
//                   value={form.mother_name}
//                 />

//                 <Row
//                   label="Occupation"
//                   value={form.mother_occupation}
//                 />

//                 <Row
//                   label="Siblings"
//                   value={form.siblings}
//                 />
//               </div>
//             </div>

//             {/* CONTACT */}

//             <div className="mt-8 overflow-hidden rounded-xl border-2 border-red-700">

//               <div className="bg-red-700 px-5 py-3 text-xl font-bold text-white">
//                 CONTACT DETAILS
//               </div>

//               <div className="p-5">

//                 <Row
//                   label="Address"
//                   value={form.address}
//                 />

//                 <Row
//                   label="Contact No"
//                   value={form.contact}
//                 />
//               </div>
//             </div>

//             {/* ABOUT */}

//             <div className="mt-8">
//               <Label className="mb-2 block text-lg font-bold text-red-800">
//                 About
//               </Label>

//               <Textarea
//                 rows={5}
//                 value={form.about}
//                 onChange={(e) =>
//                   update("about", e.target.value)
//                 }
//               />
//             </div>

//             {/* EXTRA EDITS */}

//             <div className="mt-8 grid gap-4 md:grid-cols-2">

//               <div>
//                 <Label>Rashi</Label>

//                 <select
//                   value={form.rashi}
//                   onChange={(e) =>
//                     update("rashi", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {RASIS.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <Label>Nakshatram</Label>

//                 <select
//                   value={form.nakshatram}
//                   onChange={(e) =>
//                     update("nakshatram", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {NAKSHATRAS.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <Label>Height</Label>

//                 <Input
//                   placeholder="5ft 8in"
//                   value={form.height}
//                   onChange={(e) =>
//                     update("height", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Complexion</Label>

//                 <select
//                   value={form.complexion}
//                   onChange={(e) =>
//                     update("complexion", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {COMPLEXIONS.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <Label>Education</Label>

//                 <select
//                   value={form.education}
//                   onChange={(e) =>
//                     update("education", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {EDUCATIONS.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <Label>Occupation</Label>

//                 <select
//                   value={form.occupation}
//                   onChange={(e) =>
//                     update("occupation", e.target.value)
//                   }
//                   className="h-10 w-full rounded-md border px-3"
//                 >
//                   <option value="">Select</option>

//                   {OCCUPATIONS.map((item) => (
//                     <option key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <Label>Income</Label>

//                 <Input
//                   placeholder="10 Lakhs"
//                   value={form.income}
//                   onChange={(e) =>
//                     update("income", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Properties</Label>

//                 <Input
//                   placeholder="House, Land"
//                   value={form.properties}
//                   onChange={(e) =>
//                     update("properties", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Father Name</Label>

//                 <Input
//                   value={form.father_name}
//                   onChange={(e) =>
//                     update("father_name", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Father Occupation</Label>

//                 <Input
//                   value={form.father_occupation}
//                   onChange={(e) =>
//                     update(
//                       "father_occupation",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Mother Name</Label>

//                 <Input
//                   value={form.mother_name}
//                   onChange={(e) =>
//                     update("mother_name", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Mother Occupation</Label>

//                 <Input
//                   value={form.mother_occupation}
//                   onChange={(e) =>
//                     update(
//                       "mother_occupation",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Siblings</Label>

//                 <Input
//                   value={form.siblings}
//                   onChange={(e) =>
//                     update("siblings", e.target.value)
//                   }
//                 />
//               </div>

//               <div>
//                 <Label>Contact Number</Label>

//                 <Input
//                   value={form.contact}
//                   onChange={(e) =>
//                     update("contact", e.target.value)
//                   }
//                 />
//               </div>
//             </div>

//             {/* BUTTON */}

//             <div className="mt-10">
//               <Button className="w-full bg-red-700 text-lg hover:bg-red-800">
//                 Save Biodata
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default MatrimonyBiodata;






import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

// ==========================================
// OPTIONS
// ==========================================

const CASTES = [
  "Brahmin",
  "Reddy",
  "Kamma",
  "Kapu",
  "Velama",
  "Naidu",
  "Rajput",
  "Vaishya",
  "Other",
];

const GOTHRAMS = [
  "Aatreya",
  "Agastya",
  "Angirasa",
  "Athreya",
  "Bharadwaja",
  "Bhargava",
  "Bhrigu",
  "Garga",
  "Gautama",
  "Harita",
  "Jamadagni",
  "Kashyapa",
  "Kaushika",
  "Koundinya",
  "Mandavya",
  "Parashara",
  "Shandilya",
  "Srivatsa",
  "Vasishta",
  "Vishwamitra",
  "Other",
];

const RASIS = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrischika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
  "Other",
];

const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Hasta",
  "Chitra",
  "Swati",
  "Revati",
  "Other",
];

const COMPLEXIONS = [
  "Very Fair",
  "Fair",
  "Wheatish",
  "Dusky",
  "Dark",
  "Other",
];

const EDUCATIONS = [
  "SSC",
  "Intermediate",
  "Degree",
  "B.Tech",
  "M.Tech",
  "MBA",
  "MBBS",
  "PhD",
  "Other",
];

const OCCUPATIONS = [
  "Software Engineer",
  "Doctor",
  "Teacher",
  "Business",
  "Government Job",
  "Farmer",
  "Other",
];

// ==========================================
// CUSTOM SELECT
// ==========================================

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  otherValue,
  setOtherValue,
}: any) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-gray-300 px-3"
      >
        <option value="">Select {label}</option>

        {options.map((item: string) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      {value === "Other" && (
        <Input
          placeholder={`Enter ${label}`}
          value={otherValue}
          onChange={(e) =>
            setOtherValue(e.target.value)
          }
        />
      )}
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const MatrimonyBiodata = () => {
  const [form, setForm] = useState<any>({
    full_name: "",
    dob: "",
    birth_time: "",
    birth_place: "",

    caste: "",
    caste_other: "",

    s_gothram: "",
    s_gothram_other: "",

    m_gothram: "",
    m_gothram_other: "",

    rashi: "",
    rashi_other: "",

    nakshatram: "",
    nakshatram_other: "",

    height: "",

    complexion: "",
    complexion_other: "",

    education: "",
    education_other: "",

    occupation: "",
    occupation_other: "",

    income: "",
    properties: "",

    father_name: "",
    father_contact: "",

    mother_name: "",
    mother_contact: "",

    sibling_name: "",
    sibling_contact: "",

    address: "",
    contact: "",

    about: "",

    photo: "",
    photo2: "",
    photo3: "",
    family_photo: "",
  });

  // ==========================================
  // UPDATE
  // ==========================================

  const update = (
    key: string,
    value: any
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==========================================
  // PHOTO UPLOAD
  // ==========================================

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    const url = URL.createObjectURL(file);

    update(field, url);
  };

  // ==========================================
  // ROW
  // ==========================================

  const Row = ({
    label,
    value,
  }: any) => (
    <div className="grid grid-cols-[180px_20px_1fr] border-b border-red-200 py-2 text-[15px] font-semibold text-red-900">
      <div>{label}</div>
      <div>:</div>
      <div>{value || "-"}</div>
    </div>
  );

  // ==========================================
  // SAVE
  // ==========================================

  const saveBiodata = () => {
    if (!form.photo) {
      alert("Main Photo Required");
      return;
    }

    if (!form.photo2) {
      alert("Additional Photo 1 Required");
      return;
    }

    if (!form.photo3) {
      alert("Additional Photo 2 Required");
      return;
    }

    if (!form.family_photo) {
      alert("Family Photo Required");
      return;
    }

    alert("Biodata Saved Successfully");
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#f5f0e8] p-4 md:p-8">

      <Card className="w-full max-w-6xl overflow-hidden border-[3px] border-yellow-700 bg-white shadow-2xl">

        {/* HEADER */}

        <div className="border-b border-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-50 py-6 text-center">

          <h1 className="text-3xl font-bold tracking-widest text-yellow-800 md:text-5xl">
            SHREERASTU
          </h1>

          <p className="mt-2 text-lg font-semibold text-red-700">
            MATRIMONY BIODATA
          </p>
        </div>

        {/* MAIN */}

        <div className="grid gap-8 p-6 md:grid-cols-[300px_1fr]">

          {/* LEFT SIDE */}

          <div className="space-y-6">

            {/* MAIN PHOTO */}

            <div className="space-y-3">

              <Label>Main Photo *</Label>

              <div className="overflow-hidden rounded-xl border-4 border-yellow-700">

                {form.photo ? (
                  <img
                    src={form.photo}
                    alt=""
                    className="h-[300px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-[300px] items-center justify-center bg-yellow-50">
                    <Camera className="h-14 w-14 text-yellow-700" />
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handlePhotoUpload(
                    e,
                    "photo"
                  )
                }
              />
            </div>

            {/* PHOTO 2 */}

            <div className="space-y-3">

              <Label>
                Additional Photo 1 *
              </Label>

              <div className="overflow-hidden rounded-xl border-4 border-yellow-700">

                {form.photo2 ? (
                  <img
                    src={form.photo2}
                    alt=""
                    className="h-[250px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-[250px] items-center justify-center bg-yellow-50">
                    <Camera className="h-12 w-12 text-yellow-700" />
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handlePhotoUpload(
                    e,
                    "photo2"
                  )
                }
              />
            </div>

            {/* PHOTO 3 */}

            <div className="space-y-3">

              <Label>
                Additional Photo 2 *
              </Label>

              <div className="overflow-hidden rounded-xl border-4 border-yellow-700">

                {form.photo3 ? (
                  <img
                    src={form.photo3}
                    alt=""
                    className="h-[250px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-[250px] items-center justify-center bg-yellow-50">
                    <Camera className="h-12 w-12 text-yellow-700" />
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handlePhotoUpload(
                    e,
                    "photo3"
                  )
                }
              />
            </div>

            {/* FAMILY PHOTO */}

            <div className="space-y-3">

              <Label>Family Photo *</Label>

              <div className="overflow-hidden rounded-xl border-4 border-yellow-700">

                {form.family_photo ? (
                  <img
                    src={form.family_photo}
                    alt=""
                    className="h-[250px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-[250px] items-center justify-center bg-yellow-50">
                    <Camera className="h-12 w-12 text-yellow-700" />
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handlePhotoUpload(
                    e,
                    "family_photo"
                  )
                }
              />
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-8">

            {/* DETAILS */}

            <div className="rounded-xl border-2 border-yellow-700 bg-yellow-50 p-5">

              <Row
                label="Name"
                value={form.full_name}
              />

              <Row
                label="Date of Birth"
                value={form.dob}
              />

              <Row
                label="Time of Birth"
                value={form.birth_time}
              />

              <Row
                label="Place of Birth"
                value={form.birth_place}
              />

              <Row
                label="Caste"
                value={
                  form.caste === "Other"
                    ? form.caste_other
                    : form.caste
                }
              />

              <Row
                label="S Gothram"
                value={
                  form.s_gothram ===
                  "Other"
                    ? form.s_gothram_other
                    : form.s_gothram
                }
              />

              <Row
                label="M Gothram"
                value={
                  form.m_gothram ===
                  "Other"
                    ? form.m_gothram_other
                    : form.m_gothram
                }
              />

              <Row
                label="Rashi"
                value={
                  form.rashi === "Other"
                    ? form.rashi_other
                    : form.rashi
                }
              />

              <Row
                label="Nakshatram"
                value={
                  form.nakshatram ===
                  "Other"
                    ? form.nakshatram_other
                    : form.nakshatram
                }
              />

              <Row
                label="Height"
                value={form.height}
              />

              <Row
                label="Complexion"
                value={
                  form.complexion ===
                  "Other"
                    ? form.complexion_other
                    : form.complexion
                }
              />

              <Row
                label="Education"
                value={
                  form.education ===
                  "Other"
                    ? form.education_other
                    : form.education
                }
              />

              <Row
                label="Occupation"
                value={
                  form.occupation ===
                  "Other"
                    ? form.occupation_other
                    : form.occupation
                }
              />

              <Row
                label="Income"
                value={form.income}
              />

              <Row
                label="Properties"
                value={form.properties}
              />
            </div>

            {/* FAMILY DETAILS */}

            <div className="overflow-hidden rounded-xl border-2 border-red-700">

              <div className="bg-red-700 px-5 py-3 text-xl font-bold text-white">
                FAMILY DETAILS
              </div>

              <div className="p-5">

                <Row
                  label="Father Name"
                  value={form.father_name}
                />

                <Row
                  label="Father Contact"
                  value={form.father_contact}
                />

                <Row
                  label="Mother Name"
                  value={form.mother_name}
                />

                <Row
                  label="Mother Contact"
                  value={form.mother_contact}
                />

                <Row
                  label="Sibling Name"
                  value={form.sibling_name}
                />

                <Row
                  label="Sibling Contact"
                  value={form.sibling_contact}
                />
              </div>
            </div>

            {/* CONTACT */}

            <div className="overflow-hidden rounded-xl border-2 border-red-700">

              <div className="bg-red-700 px-5 py-3 text-xl font-bold text-white">
                CONTACT DETAILS
              </div>

              <div className="p-5">

                <Row
                  label="Address"
                  value={form.address}
                />

                <Row
                  label="Contact No"
                  value={form.contact}
                />
              </div>
            </div>

            {/* FORM */}

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <Label>Full Name</Label>

                <Input
                  value={form.full_name}
                  onChange={(e) =>
                    update(
                      "full_name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>Date of Birth</Label>

                <Input
                  type="date"
                  value={form.dob}
                  onChange={(e) =>
                    update(
                      "dob",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>Birth Time</Label>

                <Input
                  type="time"
                  value={form.birth_time}
                  onChange={(e) =>
                    update(
                      "birth_time",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>Place of Birth</Label>

                <Input
                  value={form.birth_place}
                  onChange={(e) =>
                    update(
                      "birth_place",
                      e.target.value
                    )
                  }
                />
              </div>

              <CustomSelect
                label="Caste"
                options={CASTES}
                value={form.caste}
                otherValue={
                  form.caste_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "caste_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update("caste", v)
                }
              />

              <CustomSelect
                label="S Gothram"
                options={GOTHRAMS}
                value={form.s_gothram}
                otherValue={
                  form.s_gothram_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "s_gothram_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update(
                    "s_gothram",
                    v
                  )
                }
              />

              <CustomSelect
                label="M Gothram"
                options={GOTHRAMS}
                value={form.m_gothram}
                otherValue={
                  form.m_gothram_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "m_gothram_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update(
                    "m_gothram",
                    v
                  )
                }
              />

              <CustomSelect
                label="Rashi"
                options={RASIS}
                value={form.rashi}
                otherValue={
                  form.rashi_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "rashi_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update("rashi", v)
                }
              />

              <CustomSelect
                label="Nakshatram"
                options={
                  NAKSHATRAS
                }
                value={form.nakshatram}
                otherValue={
                  form.nakshatram_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "nakshatram_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update(
                    "nakshatram",
                    v
                  )
                }
              />

              <div>
                <Label>Height</Label>

                <Input
                  placeholder="5ft 8in"
                  value={form.height}
                  onChange={(e) =>
                    update(
                      "height",
                      e.target.value
                    )
                  }
                />
              </div>

              <CustomSelect
                label="Complexion"
                options={
                  COMPLEXIONS
                }
                value={form.complexion}
                otherValue={
                  form.complexion_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "complexion_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update(
                    "complexion",
                    v
                  )
                }
              />

              <CustomSelect
                label="Education"
                options={
                  EDUCATIONS
                }
                value={form.education}
                otherValue={
                  form.education_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "education_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update(
                    "education",
                    v
                  )
                }
              />

              <CustomSelect
                label="Occupation"
                options={
                  OCCUPATIONS
                }
                value={form.occupation}
                otherValue={
                  form.occupation_other
                }
                setOtherValue={(
                  v: string
                ) =>
                  update(
                    "occupation_other",
                    v
                  )
                }
                onChange={(
                  v: string
                ) =>
                  update(
                    "occupation",
                    v
                  )
                }
              />

              <div>
                <Label>Income</Label>

                <Input
                  value={form.income}
                  onChange={(e) =>
                    update(
                      "income",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>Properties</Label>

                <Input
                  value={form.properties}
                  onChange={(e) =>
                    update(
                      "properties",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Father Name
                </Label>

                <Input
                  value={
                    form.father_name
                  }
                  onChange={(e) =>
                    update(
                      "father_name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Father Contact
                </Label>

                <Input
                  value={
                    form.father_contact
                  }
                  onChange={(e) =>
                    update(
                      "father_contact",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Mother Name
                </Label>

                <Input
                  value={
                    form.mother_name
                  }
                  onChange={(e) =>
                    update(
                      "mother_name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Mother Contact
                </Label>

                <Input
                  value={
                    form.mother_contact
                  }
                  onChange={(e) =>
                    update(
                      "mother_contact",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Sibling Name
                </Label>

                <Input
                  value={
                    form.sibling_name
                  }
                  onChange={(e) =>
                    update(
                      "sibling_name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Sibling Contact
                </Label>

                <Input
                  value={
                    form.sibling_contact
                  }
                  onChange={(e) =>
                    update(
                      "sibling_contact",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>Address</Label>

                <Input
                  value={form.address}
                  onChange={(e) =>
                    update(
                      "address",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <Label>
                  Contact Number
                </Label>

                <Input
                  value={form.contact}
                  onChange={(e) =>
                    update(
                      "contact",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            {/* ABOUT */}

            <div>

              <Label className="mb-2 block text-lg font-bold text-red-800">
                About
              </Label>

              <Textarea
                rows={5}
                value={form.about}
                onChange={(e) =>
                  update(
                    "about",
                    e.target.value
                  )
                }
              />
            </div>

            {/* SAVE */}

            <Button
              onClick={saveBiodata}
              className="w-full bg-red-700 text-lg hover:bg-red-800"
            >
              Save Biodata
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MatrimonyBiodata;