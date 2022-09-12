import create from 'zustand';
// import { fetchUserUsingGET } from '~/services/request';
import { LoginUser } from '../types';

const useUserStore = create<{ current: LoginUser; fetch: () => Promise<void> }>((set, get) => ({
	current: null,
	fetch: async () => {
		// const data = await fetchUserUsingGET();
		const data = {
			avatar: "",
			dingtalkId: -1,
			opsId: 1,
			realName: "hulk",
			username: "hulk"
		}
		console.log('user: ', data);
		set({ current: data });
	},
}));

export default useUserStore;
