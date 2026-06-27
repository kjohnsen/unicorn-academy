<script lang="ts">
	let { 
		coatColor = '#ffffff', 
		maneColor = '#ffb3d9', 
		symbol = '⭐️',
		width = "100%",
		height = "100%"
	} = $props<{
		coatColor?: string;
		maneColor?: string;
		symbol?: string;
		width?: string;
		height?: string;
	}>();
</script>

<svg viewBox="0 0 120 100" {width} {height} style="overflow: visible;">
	<g class="unicorn-group">
		<!-- Legs Back -->
		<rect x="45" y="55" width="8" height="35" rx="4" fill={coatColor} filter="brightness(0.8)" />
		<rect x="80" y="55" width="8" height="35" rx="4" fill={coatColor} filter="brightness(0.8)" />
		
		<!-- Tail -->
		<path d="M 25,45 Q 0,60 15,85 Q 30,60 35,45 Z" fill={maneColor} />
		
		<!-- Body -->
		<rect x="30" y="35" width="60" height="30" rx="15" fill={coatColor} />
		
		<!-- Legs Front -->
		<rect x="35" y="55" width="8" height="35" rx="4" fill={coatColor} />
		<rect x="70" y="55" width="8" height="35" rx="4" fill={coatColor} />
		
		<!-- Neck -->
		<path d="M 75,45 L 85,20 L 100,25 L 90,50 Z" fill={coatColor} />
		
		<!-- Head -->
		<ellipse cx="95" cy="20" rx="14" ry="10" fill={coatColor} />
		<ellipse cx="106" cy="22" rx="7" ry="6" fill={coatColor} />
		
		<!-- Horn -->
		<polygon points="95,10 102,-5 105,12" fill="gold" />
		
		<!-- Mane -->
		<path d="M 75,10 Q 60,25 70,45 Q 85,30 90,10 Z" fill={maneColor} />
		<path d="M 85,5 Q 75,15 80,25 Q 95,15 100,5 Z" fill={maneColor} />
		
		<!-- Eye -->
		<circle cx="98" cy="17" r="2.5" fill="#1a0b2e" />
		
		<!-- Cutie Mark Symbol -->
		<text x="45" y="55" font-size="14" text-anchor="middle" dominant-baseline="middle">{symbol}</text>
	</g>
</svg>

<style>
	.unicorn-group {
		transform-origin: center;
		animation: breathing 3s ease-in-out infinite;
	}
	@keyframes breathing {
		0%, 100% { transform: scaleY(1); }
		50% { transform: scaleY(1.02) translateY(-1px); }
	}
</style>
