module.exports = {
	apps: [
		{
			name: "fragrance",
			cwd: __dirname,
			script: ".next/standalone/server.js",
			instances: 1,
			exec_mode: "fork",
			autorestart: true,
			max_memory_restart: "512M",
			time: true,
			env: {
				NODE_ENV: "production",
				HOSTNAME: "0.0.0.0",
				PORT: 3003,
				ORDER_DATA_DIR: ".runtime/orders",
			},
		},
	],
};
