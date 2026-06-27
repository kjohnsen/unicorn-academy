<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, onClose, title } = $props<{
		children: Snippet;
		onClose: () => void;
		title: string;
	}>();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-backdrop" onclick={onClose}>
	<div class="modal-content glass-panel animate-fade-in" onclick={(e) => e.stopPropagation()}>
		<div class="modal-header">
			<h2>{title}</h2>
			<button class="close-btn" onclick={onClose}>&times;</button>
		</div>
		<div class="modal-body">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	.modal-content {
		width: 90%;
		max-width: 600px;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0,0,0,0.4), var(--shadow-glow);
	}
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 32px;
		border-bottom: 1px solid var(--surface-border);
		background: rgba(255, 255, 255, 0.02);
	}
	.modal-header h2 {
		margin: 0;
		background: var(--gradient-main);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.close-btn {
		background: none;
		color: var(--text-muted);
		font-size: 32px;
		line-height: 1;
		transition: color 0.2s, transform 0.2s;
	}
	.close-btn:hover {
		color: white;
		transform: scale(1.1);
	}
	.modal-body {
		padding: 32px;
		overflow-y: auto;
	}
</style>
