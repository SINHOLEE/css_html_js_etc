const UUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};
const firstUUID = UUID();
let items = [
	{ id: firstUUID, done: false, value: 'ㅁㅁㅁㅁㅁ', created_at: Date.now() },
];
export const getItems = () => {
	console.log('call getItem api');
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(items.slice());
		}, 500);
	});
};

export const deleteItem = (id) => {
	const itemIndex = items.findIndex((item) => item.id === id);
	if (0 > itemIndex) throw new Error('no item in items');
	return new Promise((resolve) => {
		setTimeout(() => {
			items.splice(itemIndex, 1);
			resolve(id);
		}, 500);
	});
};

export const addItem = (text) => {
	if (!text) return false;
	return new Promise((resolve) => {
		const newItems = {
			id: UUID(),
			done: false,
			value: text,
			created_at: Date.now(),
		};
		setTimeout(() => {
			items.push(newItems);
			resolve(newItems);
		}, 500);
	});
};

export const toggleItem = (id) => {
	const itemIndex = items.findIndex((item) => item.id === id);
	if (0 > itemIndex) throw new Error('no item in items');
	return new Promise((resolve) => {
		setTimeout(() => {
			items = items.filter((item) =>
				item.id === id ? { ...item, done: !item.done } : item
			);
			resolve(id);
		}, 500);
	});
};
