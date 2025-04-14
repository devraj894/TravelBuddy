import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import image from '../../assets/myImage.jpg'

const AboutUs = () => {
    const projects = [
        {
            name: 'Interactive Workflow and Analytics Dashboard',
            description: 'Developed an interactive drag and drop workflow builder with zoom, pan and grid snapping for seamless workflow creation.',
            link: 'https://xtage-solution.vercel.app/',
        },
        {
            name: 'Shift Planning System',
            description: 'Employees can set their availability and based on it Admin assigns shifts to them.',
            link: 'https://shift-planning-system-pi.vercel.app/',
        },
        {
            name: 'Discord Bot',
            description: 'Developed an interactive and scalable Discord bot using Node.js and Discord.js, enhancing community engagement through automated interactions.',
            link: 'https://github.com/devraj894/Discord-Bot',
        },
    ];

    return (
        <div className="min-h-screen p-8 pt-20 text-black">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img
                        src={image} 
                        alt="Jolly"
                        className="w-40 h-40 rounded-full shadow-lg"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold">Hi, I’m Devraj!</h2>
                        <p className="mt-2 text-gray-700">
                            I am a passionate Software Developer and final-year student of Computer Science and Engineering. My journey has been a blend of engineering and technology, 
                            allowing me to explore areas like web development and project design. I have a keen interest in creating interactive and user-friendly web applications.
                        </p>
                        <p className="mt-2 text-gray-700">
                            With expertise in React, Tailwind CSS, Node.js, and MongoDB, I’ve successfully worked on several full-stack projects that focus on solving real-world problems. I’m also excited to step into roles that challenge my problem-solving skills and help me grow further.
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Projects I’ve Created</h3>
                    <ul className="space-y-4">
                        {projects.map((project, index) => (
                            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold">{project.name}</h4>
                                <p className="text-gray-600">{project.description}</p>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline mt-2 block"
                                >
                                    Visit Project
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Let’s Connect</h3>
                    <p className="text-gray-700">Feel free to reach out to me for collaboration or queries:</p>
                    <div className="flex gap-4 mt-4">
                        <a
                            href="https://www.linkedin.com/in/devraj-songara-24b536318/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 text-2xl"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com/devraj894"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 text-2xl"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="mailto:devrajsongara894@gmail.com"
                            className="text-red-600 text-2xl"
                        >
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;