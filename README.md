# SmartTech Security Solutions

A static, bilingual English/Arabic website for SmartTech Security Solutions.

## Files

- `index.html`: page content, bilingual text, metadata and structured data.
- `styles.css`: responsive design, typography, motion and RTL styles.
- `script.js`: language selection, mobile navigation, service tabs and enquiry composition.
- `images/`: local brand, client and representative service imagery.
- `CNAME`, `robots.txt`, `sitemap.xml`, `googlef974bd12f07a0e3f.html`: existing domain and search verification files.

No build step or Node installation is required to serve the site.

## Deploy

Upload the complete package to the existing website repository, preserving the directory structure. Replace `index.html` and add the new stylesheet, script and WebP images together. Keep the existing custom-domain and Google verification files. Publish using the repository's existing hosting configuration; do not change DNS just to deploy these files.

## Enquiries

The form opens a WhatsApp conversation addressed to +966 59 215 4955 with the visitor's details. The visitor reviews and sends the message in WhatsApp. The email alternative opens a draft addressed to info@smarttechsecuritysolution.com in their email application. The website does not claim that a message has been sent and does not store enquiry data. This replaces the previous FormSubmit flow.

## Content

All seven services and the five service areas appear in English and Arabic. Existing client names and logos are retained. Hero and service visuals are newly AI-generated representative illustrations created with the built-in image-generation tool; they are not photographs of completed SmartTech projects. All eight visuals are stored as optimized local WebP assets. The previous numerical project/client/experience claims are omitted pending verification. The supplied SmartTech logo identity is preserved.

## Accessibility and motion

Labelled fields, skip link, keyboard-controlled service tabs, focus outlines, RTL layouts, isolated LTR phone numbers, native disclosure FAQs and reduced-motion support are included. JavaScript-disabled visitors can read all service panels and use direct contact links.

## Validation

JavaScript syntax, all seven tab/panel relationships, English/Arabic text switching, mobile-menu state, service preselection, WhatsApp/email message construction, anchor targets, unique IDs, form labels, local images, telephone targets and structured data were checked. No test messages were transmitted. Desktop/mobile visual browser verification and real-device enquiry handoff still need review: the available preview browser could not open the local server. No Lighthouse score or 10/10 certification is claimed.

## Local preview

Serve the folder with any static server, for example `python -m http.server 8765`, then open http://localhost:8765. A separate self-contained preview HTML is provided for convenient review; deploy the complete website package, not the preview file.
