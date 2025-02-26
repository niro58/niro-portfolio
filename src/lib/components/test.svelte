<script lang="ts">
	import { FileText, Cpu, Database, CheckCircle } from 'lucide-svelte';
	const steps = [
		{
			icon: FileText,
			title: 'Upload Document',
			description: 'Securely upload your document to our platform.'
		},
		{
			icon: Cpu,
			title: 'AI Analysis',
			description: 'Our advanced AI analyzes the document structure and content.'
		},
		{
			icon: Database,
			title: 'Data Extraction',
			description: 'Key information is extracted and organized into structured data.'
		},
		{
			icon: CheckCircle,
			title: 'Results Delivered',
			description: 'Receive accurate, structured data ready for your use.'
		}
	];
</script>
