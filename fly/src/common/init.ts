import { isDev } from './const';


export const addVConsole = () => {
	const script = document.createElement('script')!;
	script.src = 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/vConsole/3.12.1/vconsole.min.js';
	script.onload = () => {
		if ((window as any).VConsole) {
			new (window as any).VConsole();
		}
	};
	window.document.body.appendChild(script);
};

export const init = () => {
};
