"use client";

import { useState } from "react";

export default function AuthorSubmissionForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        displayName: "",
        email: "",
        location: "",
        role: "",
        expertise: "",
        yearsOfExperience: "",
        shortBio: "",
        detailedBio: "",
        website: "",
        linkedin: "",
        twitter: "",
        github: "",
        imageAltText: "",
        preferredTopics: "",
        previousWork: "",
        consent: false,
    });

    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", { ...formData, file });
        alert("Form submitted! Check console for data.");
    };

    const inputClasses = "w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted rounded-sm";
    const labelClasses = "block text-sm font-bold mb-2 text-foreground/80 lowercase"; // Lowercase to match design aesthetic if needed, or remove. Screenshot shows Title Case. "Full Name *"
    const sectionTitleClasses = "text-sm font-bold uppercase tracking-wider text-muted mb-4 mt-8";

    return (
        <form onSubmit={handleSubmit} className="font-mono text-sm">
            <h1 className="text-2xl font-bold mb-2 text-foreground">Author Profile Submission</h1>
            <p className="text-muted mb-8">Please fill in the details below to create your author profile on our blog.</p>

            {/* Basic Information */}
            <h3 className={sectionTitleClasses}>Basic Information</h3>
            
            <div className="mb-4">
                <label className={labelClasses}>Full Name *</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClasses} />
            </div>

            <div className="mb-4">
                <label className={labelClasses}>Display Name / Pen Name</label>
                <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className={inputClasses} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className={labelClasses}>Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} />
                    <p className="text-[10px] text-muted mt-1">This will not be publicly displayed.</p>
                </div>
                <div>
                    <label className={labelClasses}>Location</label>
                    <input type="text" name="location" placeholder="City, Country" value={formData.location} onChange={handleChange} className={inputClasses} />
                </div>
            </div>

            {/* Professional Details */}
            <h3 className={sectionTitleClasses}>Professional Details</h3>

            <div className="mb-4">
                <label className={labelClasses}>Primary Role / Title *</label>
                <select required name="role" value={formData.role} onChange={handleChange} className={inputClasses}>
                    <option value="">Select Role / Class</option>
                    <option value="Red Team Operator">Red Team Operator</option>
                    <option value="Vulnerability Researcher">Vulnerability Researcher</option>
                    <option value="Exploit Developer">Exploit Developer</option>
                    <option value="Malware Analyst">Malware Analyst</option>
                    <option value="Threat Hunter">Threat Hunter</option>
                    <option value="Cryptographer">Cryptographer</option>
                    <option value="Security Architect">Security Architect</option>
                    <option value="Intelligence Analyst">Intelligence Analyst</option>
                    <option value="Penetration Tester">Penetration Tester</option>
                    <option value="Social Engineer">Social Engineer</option>
                    <option value="Hardware Hacker">Hardware Hacker</option>
                </select>
            </div>

            <div className="mb-4">
                <label className={labelClasses}>Areas of Expertise *</label>
                <input required type="text" name="expertise" placeholder="e.g. Cybersecurity, AI, Cloud Computing" value={formData.expertise} onChange={handleChange} className={inputClasses} />
            </div>

            <div className="mb-4">
                <label className={labelClasses}>Years of Experience</label>
                <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className={inputClasses}>
                    <option value="">Select</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                </select>
            </div>

            {/* Author Bio */}
            <h3 className={sectionTitleClasses}>Author Bio</h3>

            <div className="mb-4">
                <label className={labelClasses}>Short Bio (50-70 words) *</label>
                <textarea required name="shortBio" rows={3} value={formData.shortBio} onChange={handleChange} className={inputClasses} />
            </div>

            <div className="mb-4">
                <label className={labelClasses}>Detailed Bio (150-300 words)</label>
                <textarea name="detailedBio" rows={6} value={formData.detailedBio} onChange={handleChange} className={inputClasses} />
            </div>

            {/* Social & Professional Links */}
            <h3 className={sectionTitleClasses}>Social & Professional Links</h3>

            <div className="mb-4">
                <label className={labelClasses}>Personal Website / Blog</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="mb-4">
                <label className={labelClasses}>LinkedIn</label>
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="mb-4">
                <label className={labelClasses}>Twitter / X</label>
                <input type="url" name="twitter" value={formData.twitter} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="mb-4">
                <label className={labelClasses}>GitHub</label>
                <input type="url" name="github" value={formData.github} onChange={handleChange} className={inputClasses} />
            </div>

             {/* Profile Image */}
            <h3 className={sectionTitleClasses}>Profile Image</h3>
            
            <div className="mb-4">
                <label className={labelClasses}>Upload Profile Photo</label>
                <div className="flex items-center gap-4">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer text-muted"
                    />
                </div>
            </div>

             <div className="mb-4">
                <label className={labelClasses}>Image Alt Text</label>
                <input type="text" name="imageAltText" placeholder="Describe the image for accessibility" value={formData.imageAltText} onChange={handleChange} className={inputClasses} />
            </div>


            {/* Writing Preferences */}
            <h3 className={sectionTitleClasses}>Writing Preferences</h3>

            <div className="mb-4">
                <label className={labelClasses}>Preferred Topics</label>
                <input type="text" name="preferredTopics" placeholder="Comma-separated topics" value={formData.preferredTopics} onChange={handleChange} className={inputClasses} />
            </div>

            <div className="mb-4">
                <label className={labelClasses}>Links to Previous Work</label>
                <textarea name="previousWork" placeholder="Paste URLs here" rows={3} value={formData.previousWork} onChange={handleChange} className={inputClasses} />
            </div>

            {/* Consent */}
            <div className="mt-8 mb-8 flex items-start gap-3">
                <input 
                    type="checkbox" 
                    name="consent" 
                    id="consent"
                    checked={formData.consent} 
                    onChange={handleCheckboxChange} 
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="consent" className="text-sm font-bold leading-tight">
                    I consent to the use of this information to create my author profile.
                </label>
            </div>

            <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 tracking-wider transition-colors rounded-sm shadow-lg"
            >
                Submit Profile
            </button>

        </form>
    );
}
