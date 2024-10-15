import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: process.env.GITHUB_REPO_NAME ?? "./",
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					r: ["react", "react-dom"],
					p: ["pptxgenjs"],
				},
			},
		},
	},
});
