<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MoveAIID - AI-Enhanced Decentralized Identity & Reputation Platform</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            font-family: "Courier New", monospace;
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
        }
        ul {
            list-style-type: square;
        }
    </style>
</head>
<body>
    <h1>MoveAIID – AI-Enhanced Decentralized Identity & Reputation Platform</h1>
    <p><strong>MoveAIID</strong> is a decentralized identity and reputation platform built on the <strong>Movement Network</strong>. It leverages the power of Move smart contracts, decentralized identifiers (DIDs) following the MoveDID protocol, and AI agents (via Fleek’s Eliza Framework) to enable users to securely manage their on-chain profiles and generate real-time reputation scores.</p>
    
    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#features">Key Features</a></li>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#getting-started">Getting Started</a></li>
        <li><a href="#deployment">Deployment</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
        <li><a href="#contact">Contact & Support</a></li>
    </ul>

    <h2 id="overview">Overview</h2>
    <p>MoveAIID combines cutting-edge decentralized identity (DID) protocols with AI-driven reputation analytics to create a next-generation digital identity platform on the <strong>Movement Network</strong>.</p>

    <h2 id="features">Key Features</h2>
    <ul>
        <li>Decentralized Identity (DID) Management</li>
        <li>AI-Powered Reputation Engine</li>
        <li>Developer-Friendly Interface</li>
        <li>Modular and Scalable Architecture</li>
        <li>Secure and Transparent Identity Management</li>
    </ul>

    <h2 id="architecture">Architecture</h2>
    <p>The architecture of MoveAIID consists of multiple components:</p>
    <ul>
        <li>Move Smart Contracts for identity management</li>
        <li>AI-driven reputation scoring system</li>
        <li>Frontend with React/TypeScript and Aptos Wallet Adapter</li>
        <li>GraphQL API for on-chain data retrieval</li>
    </ul>

    <h2 id="tech-stack">Tech Stack</h2>
    <ul>
        <li><strong>Smart Contracts:</strong> Move (Movement Network)</li>
        <li><strong>Frontend:</strong> React, TypeScript</li>
        <li><strong>AI:</strong> Fleek’s Eliza Framework</li>
        <li><strong>Deployment:</strong> Docker, Ansible, Hetzner Cloud</li>
    </ul>

    <h2 id="getting-started">Getting Started</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Movement CLI</li>
        <li>Node.js & npm/yarn</li>
        <li>Git</li>
        <li>Docker & Ansible</li>
    </ul>
    <h3>Clone Repository</h3>
    <pre><code>git clone https://github.com/&lt;your-github-username&gt;/moveaiid.git
cd moveaiid</code></pre>

    <h2 id="deployment">Deployment</h2>
    <h3>Smart Contract Deployment</h3>
    <pre><code>cd contracts
movement init --skip-faucet
movement move init --name moveaiid_onchain</code></pre>
    <h3>Frontend Setup</h3>
    <pre><code>cd ../client
npm install
npm start</code></pre>
    <h3>Deploy on Hetzner</h3>
    <pre><code>ssh user@hetzner_server_ip
git clone https://github.com/&lt;your-github-username&gt;/moveaiid.git
cd moveaiid
docker-compose up -d</code></pre>

    <h2 id="usage">Usage</h2>
    <p>Users can connect their wallet, create their DID, and interact with their AI-powered reputation score.</p>

    <h2 id="contributing">Contributing</h2>
    <p>We welcome contributions! Fork the repository, create a branch, make your changes, and submit a pull request.</p>

    <h2 id="license">License</h2>
    <p>This project is licensed under the MIT License.</p>

    <h2 id="contact">Contact & Support</h2>
    <ul>
        <li>GitHub Issues: <a href="#">Submit Issues Here</a></li>
        <li>Community Discord: <a href="#">Join Discord</a></li>
        <li>Telegram: <a href="#">Movement MAInia Channel</a></li>
    </ul>
</body>
</html>
