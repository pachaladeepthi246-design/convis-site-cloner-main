export interface Post {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

export const blogPosts: Post[] = [
  {
    slug: 'announcing-our-new-platform',
    title: 'Announcing Our New Platform: A New Era of Productivity',
    author: 'Jane Doe',
    date: '2024-07-20',
    excerpt: 'We are thrilled to announce the launch of our new platform, designed to revolutionize the way you work. Discover the new features and improvements.',
    content: `
      <p>We are thrilled to announce the launch of our new platform, designed to revolutionize the way you work. After months of development and user feedback, we've rebuilt everything from the ground up to be faster, more intuitive, and more powerful.</p>
      <h2 class="text-2xl font-bold text-white my-4">What's New?</h2>
      <p>Our new platform includes a redesigned user interface, advanced collaboration tools, and powerful new integrations with the services you use every day. We've focused on creating a seamless experience that helps you stay focused and productive.</p>
      <ul class="list-disc list-inside my-4 space-y-2">
        <li><strong>Redesigned UI:</strong> A cleaner, more modern interface.</li>
        <li><strong>Real-time Collaboration:</strong> Work with your team simultaneously.</li>
        <li><strong>New Integrations:</strong> Connect with tools like Slack, GitHub, and more.</li>
      </ul>
      <p>We can't wait for you to try it out. Get started today and let us know what you think!</p>
    `,
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    slug: '10-tips-for-better-project-management',
    title: '10 Tips for Better Project Management',
    author: 'John Smith',
    date: '2024-07-15',
    excerpt: 'Master your projects with these ten essential tips for better planning, execution, and team collaboration.',
    content: `
      <p>Effective project management is the backbone of any successful team. Here are ten tips to help you improve your workflow and deliver better results.</p>
      <h2 class="text-2xl font-bold text-white my-4">Our Top 10 Tips</h2>
      <ol class="list-decimal list-inside my-4 space-y-2">
        <li><strong>Define Clear Goals:</strong> Know what you want to achieve before you start.</li>
        <li><strong>Break Down Tasks:</strong> Large projects are more manageable in smaller pieces.</li>
        <li><strong>Prioritize Ruthlessly:</strong> Focus on what's most important.</li>
        <li><strong>Communicate Effectively:</strong> Keep everyone in the loop.</li>
        <li><strong>Use the Right Tools:</strong> Leverage technology to streamline your process.</li>
        <li><strong>Set Realistic Deadlines:</strong> Avoid burnout and maintain quality.</li>
        <li><strong>Track Your Progress:</strong> Monitor your performance and adjust as needed.</li>
        <li><strong>Celebrate Milestones:</strong> Recognize achievements to keep morale high.</li>
        <li><strong>Conduct Post-Mortems:</strong> Learn from every project.</li>
        <li><strong>Stay Flexible:</strong> Be prepared to adapt to change.</li>
      </ol>
      <p>By implementing these strategies, you can lead your team to success and consistently deliver outstanding projects.</p>
    `,
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];