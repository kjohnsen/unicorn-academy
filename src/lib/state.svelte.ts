export interface Unicorn {
	id: string;
	name: string;
	coatColor: string;
	maneColor: string;
	symbol: string;
	x: number;
	y: number;
	hasWings?: boolean;
}

export interface Girl {
	id: string;
	name: string;
	skinColor: string;
	hairColor: string;
	hairStyle: 'long' | 'short' | 'curly' | 'braided';
	outfitColor: string;
	x: number;
	y: number;
	ridingUnicornId?: string;
}

class GameState {
	unicorns = $state<Unicorn[]>([
		{ id: '1', name: 'Stardust', coatColor: '#ffffff', maneColor: '#ffb3d9', symbol: '⭐️', x: 20, y: 60, hasWings: true },
		{ id: '2', name: 'Moonbeam', coatColor: '#e6e6fa', maneColor: '#8a2be2', symbol: '🌙', x: 70, y: 50 },
		{ id: '3', name: 'Sunburst', coatColor: '#ffffe0', maneColor: '#ffa500', symbol: '⚡️', x: 45, y: 80 }
	]);

	girls = $state<Girl[]>([
		{ id: '1', name: 'Aria', skinColor: '#fcdcb8', hairColor: '#ffd700', hairStyle: 'long', outfitColor: '#ff69b4', x: 30, y: 70 },
		{ id: '2', name: 'Lyra', skinColor: '#8d5524', hairColor: '#4a3018', hairStyle: 'curly', outfitColor: '#4169e1', x: 80, y: 65 },
		{ id: '3', name: 'Nova', skinColor: '#e0ac69', hairColor: '#191970', hairStyle: 'braided', outfitColor: '#9370db', x: 60, y: 75 }
	]);

	updateUnicorn(id: string, updates: Partial<Unicorn>) {
		const index = this.unicorns.findIndex(u => u.id === id);
		if (index !== -1) {
			this.unicorns[index] = { ...this.unicorns[index], ...updates };
		}
	}

	updateGirl(id: string, updates: Partial<Girl>) {
		const index = this.girls.findIndex(g => g.id === id);
		if (index !== -1) {
			this.girls[index] = { ...this.girls[index], ...updates };
		}
	}
}

export const gameState = new GameState();
