# **App Name**: RoleHub Connect

## Core Features:

- Dynamic Role-Based Layout: Implement a responsive header, sidebar (for Admin, Manufacturer, SI Partner), and footer, with navigation links that dynamically adapt based on the active user role (Buyer, SI Partner, Manufacturer, Admin).
- Mock User Role Management: Provide a mechanism (e.g., role selection button or URL parameter) to simulate different user roles for testing and development, allowing seamless role switching.
- Role-Specific Content Display: Dynamically fetches and displays role-specific content (e.g., Buyer search results, Admin dashboard statistics, SI Partner proposals, Manufacturer dashboards, contracts, AS history) leveraging a Firebase/Firestore database for data retrieval.
- Robust Form Management: Manages user input forms across the application with client-side validation using react-hook-form and zod, facilitating interactions such as submitting proposals or updating profiles, with data submission to a Firebase/Firestore backend.
- Access Control Navigation Guards: Protect routes by enforcing role-based access; display a 403 Forbidden page if a user attempts to access content or a page not permitted for their active role.
- AI-Powered Content Assistance: Provide a tool within relevant role sections (e.g., SI Partner, Manufacturer) that utilizes generative AI to assist with tasks such as summarizing proposal drafts, generating content ideas, or improving report descriptions.

## Style Guidelines:

- A sophisticated, deep corporate blue ('#294CDC') anchors the brand identity, symbolizing reliability and authority. This color will also be used for key interactive elements, providing strong contrast against lighter backgrounds.
- A clean, expansive light blue-grey ('#EBEFFF') serves as the primary background, offering a serene and modern canvas that enhances content readability and promotes visual clarity.
- A vibrant yet harmonious sky blue ('#9BC2EB') is strategically employed for secondary interactive elements and highlights, offering a subtle yet effective contrast against the deep corporate blue.
- A dark charcoal grey ('#2D3748') will be used for primary text and critical information, ensuring high readability and strong contrast against the light background, while maintaining a refined aesthetic.
- All textual content will utilize the 'Pretendard' font family, chosen for its exceptional readability across devices and its contemporary, professional aesthetic. It will establish a clear typographic hierarchy, ensuring information is absorbed effortlessly.
- A cohesive suite of 'lucide-react' icons will be integrated throughout the application, ensuring visual consistency, crispness, and immediate comprehension. Icons are selected to be minimalist yet informative, supporting an intuitive user experience without visual clutter.
- Adhering to UI-015, the layout will be inherently adaptive and responsive, fluidly transitioning content presentation from a single column on mobile, to a balanced two-column arrangement on tablets, and a spacious multi-column layout (three or more) on desktop. The design prioritizes clear information hierarchy, ample whitespace, and intuitive spatial relationships between elements, complemented by full keyboard navigation support and robust ARIA attribute implementation for universal accessibility.
- Purpose-driven, subtle animations, powered by 'framer-motion', will be judiciously applied to enhance user feedback, guide attention, and create seamless transitions between states. These micro-interactions are designed to improve the perceived performance and overall sophistication of the interface without being distracting or gratuitous.