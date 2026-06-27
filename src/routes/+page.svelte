<script lang="ts">
	import { gameState } from '$lib/state.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import UnicornSvg from '$lib/components/UnicornSvg.svelte';
	import GirlSvg from '$lib/components/GirlSvg.svelte';

	let activeModal = $state<'none' | 'unicorns' | 'girls'>('none');
	let editingUnicornId = $state<string | null>(null);
	let editingGirlId = $state<string | null>(null);

	let selectedUnicorn = $derived(editingUnicornId ? gameState.unicorns.find(u => u.id === editingUnicornId) : null);
	let selectedGirl = $derived(editingGirlId ? gameState.girls.find(g => g.id === editingGirlId) : null);

	function openUnicorns() { activeModal = 'unicorns'; editingUnicornId = null; }
	function openGirls() { activeModal = 'girls'; editingGirlId = null; }
	function closeModals() { activeModal = 'none'; }

	const cutieMarks = ['⭐️', '💖', '⚡️', '🌙', '💎', '🌸'];

	// Dragging logic
	let draggingId = $state<string | null>(null);
	let draggingType = $state<'unicorn' | 'girl' | null>(null);

	function handlePointerDown(e: PointerEvent, id: string, type: 'unicorn' | 'girl') {
		draggingId = id;
		draggingType = type;
		e.currentTarget.setPointerCapture(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!draggingId || !draggingType) return;
		const newX = (e.clientX / window.innerWidth) * 100;
		// Keep them roughly in the ground area (bottom 60%)
		let newY = (e.clientY / window.innerHeight) * 100;
		if (newY < 40) newY = 40;

		if (draggingType === 'unicorn') {
			gameState.updateUnicorn(draggingId, { x: newX, y: newY });
		} else {
			gameState.updateGirl(draggingId, { x: newX, y: newY });
		}
	}

	function handlePointerUp(e: PointerEvent) {
		if (!draggingId) return;
		e.currentTarget.releasePointerCapture(e.pointerId);
		draggingId = null;
		draggingType = null;
	}

	const skinColors = ['#fcdcb8', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#3d2210', 'rainbow'];
	const hairColors = ['#ffd700', '#4a3018', '#090806', '#71231d', 'rainbow'];
</script>

<svelte:head>
	<title>Unicorn Academy</title>
	<meta name="description" content="Manage your magical stable at the Unicorn Academy!" />
</svelte:head>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="pasture-scene" onpointermove={handlePointerMove} onpointerup={handlePointerUp}>
	<div class="sky">
		<div class="cloud" style="top: 10%; left: 20%; transform: scale(1.5);"></div>
		<div class="cloud" style="top: 25%; left: 60%;"></div>
		<div class="cloud" style="top: 15%; left: 80%; transform: scale(0.8);"></div>
	</div>
	
	<div class="ground">
		<!-- Trees -->
		<div class="tree" style="left: 15%; bottom: 40%;"></div>
		<div class="tree" style="left: 85%; bottom: 50%;"></div>
		<div class="tree" style="left: 45%; bottom: 65%; transform: scale(0.7);"></div>
	</div>

	<!-- Render all roaming unicorns and girls -->
	{#each gameState.unicorns as unicorn (unicorn.id)}
		<div class="roamer {draggingId === unicorn.id ? 'dragging' : ''}" 
			style="left: {unicorn.x}%; top: {unicorn.y}%; width: 140px; height: 120px; transform: translate(-50%, -80%);"
			onpointerdown={(e) => handlePointerDown(e, unicorn.id, 'unicorn')}>
			<UnicornSvg coatColor={unicorn.coatColor} maneColor={unicorn.maneColor} symbol={unicorn.symbol} />
			<div class="roamer-name">{unicorn.name}</div>
		</div>
	{/each}

	{#each gameState.girls as girl (girl.id)}
		<div class="roamer {draggingId === girl.id ? 'dragging' : ''}" 
			style="left: {girl.x}%; top: {girl.y}%; width: 70px; height: 90px; transform: translate(-50%, -80%);"
			onpointerdown={(e) => handlePointerDown(e, girl.id, 'girl')}>
			<GirlSvg skinColor={girl.skinColor} hairColor={girl.hairColor} hairStyle={girl.hairStyle} outfitColor={girl.outfitColor} />
			<div class="roamer-name">{girl.name}</div>
		</div>
	{/each}

	<!-- Top Menu -->
	<header class="top-menu">
		<div class="glass-panel menu-panel">
			<h1>✨ Unicorn Academy ✨</h1>
		</div>
	</header>

	<!-- Bottom Menu -->
	<footer class="bottom-menu">
		<button class="btn-primary action-btn" onclick={openUnicorns}>
			<span class="icon">🦄</span> View Unicorns
		</button>
		<button class="btn-primary action-btn" onclick={openGirls}>
			<span class="icon">👧</span> View Girls
		</button>
	</footer>
</div>

{#if activeModal === 'unicorns'}
	<Modal title={editingUnicornId ? "Customize Unicorn" : "Your Unicorns"} onClose={closeModals}>
		{#if !editingUnicornId}
			<div class="grid-list">
				{#each gameState.unicorns as unicorn (unicorn.id)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="card glass-panel" onclick={() => editingUnicornId = unicorn.id}>
						<div class="avatar">
							<UnicornSvg coatColor={unicorn.coatColor} maneColor={unicorn.maneColor} symbol={unicorn.symbol} />
						</div>
						<h3>{unicorn.name}</h3>
					</div>
				{/each}
			</div>
		{:else if selectedUnicorn}
			<div class="editor split-view">
				<div class="controls">
					<button class="back-btn" onclick={() => editingUnicornId = null}>&larr; Back to List</button>
					<div class="form-group">
						<label for="uname">Name</label>
						<input id="uname" type="text" value={selectedUnicorn.name} 
							oninput={(e) => gameState.updateUnicorn(selectedUnicorn!.id, { name: e.currentTarget.value })} />
					</div>
					<div class="form-group">
						<label for="ucoat">Coat Color</label>
						<input id="ucoat" type="color" value={selectedUnicorn.coatColor} 
							oninput={(e) => gameState.updateUnicorn(selectedUnicorn!.id, { coatColor: e.currentTarget.value })} />
					</div>
					<div class="form-group">
						<label for="umane">Mane & Tail Color</label>
						<input id="umane" type="color" value={selectedUnicorn.maneColor} 
							oninput={(e) => gameState.updateUnicorn(selectedUnicorn!.id, { maneColor: e.currentTarget.value })} />
					</div>
					<div class="form-group">
						<label>Cutie Mark Symbol</label>
						<div class="symbol-grid">
							{#each cutieMarks as mark}
								<button class="symbol-btn {selectedUnicorn.symbol === mark ? 'active' : ''}" 
									onclick={() => gameState.updateUnicorn(selectedUnicorn!.id, { symbol: mark })}>
									{mark}
								</button>
							{/each}
						</div>
					</div>
				</div>
				<div class="preview-panel glass-panel">
					<h3>Live Preview</h3>
					<div class="large-preview">
						<UnicornSvg coatColor={selectedUnicorn.coatColor} maneColor={selectedUnicorn.maneColor} symbol={selectedUnicorn.symbol} />
					</div>
				</div>
			</div>
		{/if}
	</Modal>
{/if}

{#if activeModal === 'girls'}
	<Modal title={editingGirlId ? "Customize Girl" : "Academy Girls"} onClose={closeModals}>
		{#if !editingGirlId}
			<div class="grid-list">
				{#each gameState.girls as girl (girl.id)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="card glass-panel" onclick={() => editingGirlId = girl.id}>
						<div class="avatar" style="width: 80px; height: 100px;">
							<GirlSvg skinColor={girl.skinColor} hairColor={girl.hairColor} hairStyle={girl.hairStyle} outfitColor={girl.outfitColor} />
						</div>
						<h3>{girl.name}</h3>
					</div>
				{/each}
			</div>
		{:else if selectedGirl}
			<div class="editor split-view">
				<div class="controls">
					<button class="back-btn" onclick={() => editingGirlId = null}>&larr; Back to List</button>
					<div class="form-group">
						<label for="gname">Name</label>
						<input id="gname" type="text" value={selectedGirl.name} 
							oninput={(e) => gameState.updateGirl(selectedGirl!.id, { name: e.currentTarget.value })} />
					</div>
					
					<div class="form-group">
						<label>Skin Color</label>
						<div class="color-options">
							{#each skinColors as color}
								<button class="color-btn {selectedGirl.skinColor === color ? 'active' : ''}" 
									style="background: {color === 'rainbow' ? 'linear-gradient(to right, #ff6b9d, #fceb5c, #6bc9ff, #c988ff)' : color};"
									onclick={() => gameState.updateGirl(selectedGirl!.id, { skinColor: color })}></button>
							{/each}
						</div>
					</div>
					
					<div class="form-group">
						<label>Hair Color</label>
						<div class="color-options">
							{#each hairColors as color}
								<button class="color-btn {selectedGirl.hairColor === color ? 'active' : ''}" 
									style="background: {color === 'rainbow' ? 'linear-gradient(to right, #ff6b9d, #fceb5c, #6bc9ff, #c988ff)' : color};"
									onclick={() => gameState.updateGirl(selectedGirl!.id, { hairColor: color })}></button>
							{/each}
						</div>
					</div>

					<div class="form-group">
						<label for="gstyle">Hair Style</label>
						<select id="gstyle" value={selectedGirl.hairStyle} 
							onchange={(e) => gameState.updateGirl(selectedGirl!.id, { hairStyle: e.currentTarget.value as any })}>
							<option value="long">Long</option>
							<option value="short">Short</option>
							<option value="curly">Curly</option>
							<option value="braided">Braided</option>
						</select>
					</div>
					<div class="form-group">
						<label for="goutfit">Outfit Color</label>
						<input id="goutfit" type="color" value={selectedGirl.outfitColor} 
							oninput={(e) => gameState.updateGirl(selectedGirl!.id, { outfitColor: e.currentTarget.value })} />
					</div>
				</div>
				<div class="preview-panel glass-panel">
					<h3>Live Preview</h3>
					<div class="large-preview girl-preview">
						<GirlSvg skinColor={selectedGirl.skinColor} hairColor={selectedGirl.hairColor} hairStyle={selectedGirl.hairStyle} outfitColor={selectedGirl.outfitColor} />
					</div>
				</div>
			</div>
		{/if}
	</Modal>
{/if}

<style>
	.pasture-scene {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 40%, #7CFC00 40%, #228B22 100%);
		touch-action: none;
	}

	.sky {
		position: absolute;
		top: 0; left: 0; width: 100%; height: 40%;
	}
	.cloud {
		position: absolute;
		width: 120px; height: 40px;
		background: white;
		border-radius: 50px;
		opacity: 0.8;
	}
	.cloud::before, .cloud::after {
		content: '';
		position: absolute;
		background: white;
		border-radius: 50%;
	}
	.cloud::before {
		width: 60px; height: 60px;
		top: -30px; left: 15px;
	}
	.cloud::after {
		width: 45px; height: 45px;
		top: -20px; right: 15px;
	}

	.ground {
		position: absolute;
		bottom: 0; left: 0; width: 100%; height: 60%;
	}
	.tree {
		position: absolute;
		width: 40px; height: 100px;
		background: #8B4513; /* trunk */
		z-index: 0;
	}
	.tree::before {
		content: '';
		position: absolute;
		width: 120px; height: 120px;
		background: #006400;
		border-radius: 50%;
		top: -80px; left: -40px;
		box-shadow: -20px 20px 0 10px #228B22, 20px 10px 0 10px #32CD32;
	}

	.roamer {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
		cursor: grab;
		z-index: 5;
	}
	.roamer.dragging {
		cursor: grabbing;
		z-index: 100;
		filter: drop-shadow(0 20px 25px rgba(0,0,0,0.6)) brightness(1.1);
		transition: none;
	}
	
	.roamer-name {
		margin-top: -10px;
		font-size: 0.85rem;
		font-weight: 600;
		background: rgba(255,255,255,0.7);
		color: #333;
		padding: 2px 8px;
		border-radius: 10px;
		pointer-events: none;
	}

	.top-menu {
		position: absolute;
		top: 2rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		pointer-events: none;
		z-index: 20;
	}
	.menu-panel {
		padding: 1rem 3rem;
		pointer-events: auto;
	}
	.menu-panel h1 {
		margin: 0;
		font-size: 2.5rem;
		background: var(--gradient-main);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.bottom-menu {
		position: absolute;
		bottom: 2rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		gap: 2rem;
		z-index: 20;
	}
	.action-btn {
		font-size: 1.25rem;
		padding: 1rem 3rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		box-shadow: 0 10px 20px rgba(0,0,0,0.3);
	}
	
	.icon { font-size: 1.5rem; }

	/* Grid Lists */
	.grid-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;
	}

	.card {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0,0,0,0.3);
		background: rgba(255, 255, 255, 0.1);
	}

	.avatar {
		width: 100%;
		height: 80px;
		margin-bottom: 1rem;
		display: flex;
		justify-content: center;
	}

	.card h3 { margin: 0; font-size: 1.1rem; text-align: center; }

	/* Editor Split View */
	.split-view {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.controls { display: flex; flex-direction: column; gap: 1.25rem; }

	.back-btn {
		align-self: flex-start;
		background: none;
		color: var(--primary-color);
		font-size: 1rem;
		font-weight: 600;
		padding: 0.5rem 0;
	}
	.back-btn:hover { color: var(--secondary-color); }

	.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
	.form-group label { font-weight: 500; color: var(--text-muted); }

	.form-group input[type="text"],
	.form-group select {
		width: 100%; padding: 12px 16px;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid var(--surface-border);
		border-radius: 12px; color: white;
		font-family: inherit; font-size: 1rem;
		outline: none; transition: border-color 0.2s;
	}

	.form-group input[type="text"]:focus,
	.form-group select:focus { border-color: var(--primary-color); }

	.form-group input[type="color"] {
		width: 100%; height: 48px;
		border: 1px solid var(--surface-border);
		border-radius: 12px; background: rgba(0, 0, 0, 0.2);
		cursor: pointer; padding: 4px;
	}

	.symbol-grid, .color-options {
		display: flex; flex-wrap: wrap; gap: 0.5rem;
	}

	.symbol-btn {
		background: rgba(0, 0, 0, 0.2); border: 1px solid var(--surface-border);
		border-radius: 12px; padding: 8px 12px; font-size: 1.5rem; transition: all 0.2s;
	}
	.symbol-btn:hover { background: rgba(255, 255, 255, 0.1); }
	.symbol-btn.active {
		border-color: var(--primary-color); background: rgba(255, 107, 157, 0.2);
		box-shadow: 0 0 10px rgba(255, 107, 157, 0.4);
	}

	.color-btn {
		width: 36px; height: 36px; border-radius: 50%;
		border: 2px solid var(--surface-border); cursor: pointer; transition: transform 0.2s;
	}
	.color-btn:hover { transform: scale(1.1); }
	.color-btn.active { border-color: white; box-shadow: 0 0 10px rgba(255,255,255,0.5); }

	.preview-panel {
		padding: 2rem; text-align: center; display: flex; flex-direction: column;
		align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.02); height: 100%;
	}
	.preview-panel h3 { margin-bottom: 2rem; color: var(--text-muted); }
	.large-preview { width: 100%; max-width: 250px; height: 200px; }
	.girl-preview { height: 300px; }

	@media (max-width: 768px) {
		.split-view { grid-template-columns: 1fr; }
		.menu-panel h1 { font-size: 2rem; }
		.bottom-menu { flex-direction: column; gap: 1rem; padding: 0 1rem; }
		.action-btn { width: 100%; justify-content: center; }
	}
</style>
