<script lang="ts">
	let { 
		skinColor = '#fcdcb8', 
		hairColor = '#ffd700', 
		hairStyle = 'long',
		outfitColor = '#ff69b4',
		width = "100%",
		height = "100%"
	} = $props<{
		skinColor?: string;
		hairColor?: string;
		hairStyle?: 'long' | 'short' | 'curly' | 'braided';
		outfitColor?: string;
		width?: string;
		height?: string;
	}>();

	let sFill = $derived(skinColor === 'rainbow' ? 'url(#rainbow-grad)' : skinColor);
	let hFill = $derived(hairColor === 'rainbow' ? 'url(#rainbow-grad)' : hairColor);
</script>

<svg viewBox="0 0 100 120" {width} {height} style="overflow: visible;">
	<defs>
		<linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#ff6b9d" />
			<stop offset="25%" stop-color="#fceb5c" />
			<stop offset="50%" stop-color="#9dff6b" />
			<stop offset="75%" stop-color="#6bc9ff" />
			<stop offset="100%" stop-color="#c988ff" />
		</linearGradient>
	</defs>

	<g class="girl-group">
		<!-- Legs Back -->
		<rect x="41" y="65" width="6" height="40" rx="3" fill={sFill} filter="brightness(0.8)" />
		<rect x="53" y="65" width="6" height="40" rx="3" fill={sFill} />
		
		<!-- Shoes -->
		<ellipse cx="44" cy="104" rx="5" ry="3" fill="#333" />
		<ellipse cx="56" cy="104" rx="5" ry="3" fill="#333" />
		
		<!-- Arms Back -->
		<rect x="32" y="38" width="5" height="30" rx="2.5" fill={sFill} transform="rotate(20, 32, 38)" />
		
		<!-- Dress / Outfit Body -->
		<path d="M 40,30 L 60,30 L 70,70 L 30,70 Z" fill={outfitColor} />
		<path d="M 43,30 L 57,30 L 54,45 L 46,45 Z" fill="rgba(255,255,255,0.2)" /> <!-- sash/detail -->

		<!-- Arms Front -->
		<rect x="63" y="38" width="5" height="30" rx="2.5" fill={sFill} transform="rotate(-20, 63, 38)" />
		
		<!-- Neck -->
		<rect x="47" y="24" width="6" height="8" fill={sFill} />
		
		<!-- Head -->
		<circle cx="50" cy="16" r="12" fill={sFill} />
		
		<!-- Eyes -->
		<circle cx="46" cy="15" r="1.5" fill="#1a0b2e" />
		<circle cx="54" cy="15" r="1.5" fill="#1a0b2e" />
		<!-- Smile -->
		<path d="M 47,20 Q 50,23 53,20" stroke="#1a0b2e" stroke-width="1" fill="none" stroke-linecap="round" />

		<!-- Hair -->
		{#if hairStyle === 'long'}
			<path d="M 38,10 Q 30,30 32,60 Q 50,30 68,60 Q 70,30 62,10 Q 50,-5 38,10 Z" fill={hFill} />
		{:else if hairStyle === 'short'}
			<path d="M 38,15 Q 30,20 38,30 Q 50,20 62,30 Q 70,20 62,15 Q 50,0 38,15 Z" fill={hFill} />
		{:else if hairStyle === 'curly'}
			<circle cx="38" cy="15" r="12" fill={hFill} />
			<circle cx="62" cy="15" r="12" fill={hFill} />
			<circle cx="50" cy="5" r="14" fill={hFill} />
			<circle cx="42" cy="25" r="8" fill={hFill} />
			<circle cx="58" cy="25" r="8" fill={hFill} />
		{:else if hairStyle === 'braided'}
			<path d="M 40,10 Q 30,20 40,30 L 35,55 Q 40,60 45,55 L 42,30 Q 50,20 60,30 L 58,55 Q 63,60 65,55 L 60,30 Q 70,20 60,10 Q 50,-5 40,10 Z" fill={hFill} />
			<!-- Hair ties -->
			<rect x="38" y="52" width="6" height="2" fill={outfitColor} />
			<rect x="56" y="52" width="6" height="2" fill={outfitColor} />
		{/if}
	</g>
</svg>

<style>
	.girl-group {
		transform-origin: center;
		animation: breathing 2.5s ease-in-out infinite;
	}
	@keyframes breathing {
		0%, 100% { transform: scaleY(1); }
		50% { transform: scaleY(1.02) translateY(-1px); }
	}
</style>
