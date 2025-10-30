<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtContent,
		ChainOfThoughtItem,
		ChainOfThoughtStep,
		ChainOfThoughtTrigger,
	} from "$lib/components/prompt-kit/chain-of-thought";
	import { CodeBlock, CodeBlockCode } from "$lib/components/prompt-kit/code-block";
	import { Lightbulb, Search, Target } from "@lucide/svelte";
</script>

<div class="w-full max-w-3xl">
	<ChainOfThought>
		<ChainOfThoughtStep>
			<ChainOfThoughtTrigger>
				{#snippet leftIcon()}
					<Search class="size-4" />
				{/snippet}
				Research phase: Understanding the problem space
			</ChainOfThoughtTrigger>
			<ChainOfThoughtContent>
				<ChainOfThoughtItem>
					The problem involves optimizing database queries for a high-traffic e-commerce
					platform
				</ChainOfThoughtItem>
				<ChainOfThoughtItem>
					Current bottlenecks: slow product search (2-3 seconds), category filtering
					delays
				</ChainOfThoughtItem>
				<ChainOfThoughtItem>
					Database: PostgreSQL with 10M+ products, complex joins across multiple tables
				</ChainOfThoughtItem>
			</ChainOfThoughtContent>
		</ChainOfThoughtStep>

		<ChainOfThoughtStep>
			<ChainOfThoughtTrigger>
				{#snippet leftIcon()}
					<Lightbulb class="size-4" />
				{/snippet}
				Analysis: Identifying optimization opportunities
			</ChainOfThoughtTrigger>
			<ChainOfThoughtContent>
				<ChainOfThoughtItem>
					Missing indexes on frequently queried columns (product_name, category_id,
					price_range)
				</ChainOfThoughtItem>
				<ChainOfThoughtItem>
					N+1 query problem in product listing API - need eager loading
				</ChainOfThoughtItem>
				<ChainOfThoughtItem>
					Full table scans occurring due to non-optimized WHERE clauses
				</ChainOfThoughtItem>
				<ChainOfThoughtItem>
					Consider implementing database partitioning for better performance
				</ChainOfThoughtItem>
			</ChainOfThoughtContent>
		</ChainOfThoughtStep>

		<ChainOfThoughtStep isLast>
			<ChainOfThoughtTrigger>
				{#snippet leftIcon()}
					<Target class="size-4" />
				{/snippet}
				Solution: Implementing targeted improvements
			</ChainOfThoughtTrigger>
			<ChainOfThoughtContent>
				<ChainOfThoughtItem>
					<strong>Step 1:</strong> Add composite indexes for common query patterns
					<CodeBlock class="mt-2">
						<CodeBlockCode
							code={`CREATE INDEX CONCURRENTLY idx_products_search
ON products (category_id, price, rating DESC)
WHERE active = true;`}
							language="sql"
						/>
					</CodeBlock>
				</ChainOfThoughtItem>
				<ChainOfThoughtItem>
					<strong>Step 2:</strong> Optimize ORM queries with eager loading
					<CodeBlock class="mt-2">
						<CodeBlockCode
							code={`// Before: N+1 queries
products.map(p => p.category.name)

// After: Single query with joins
Product.findAll({
  include: [{ model: Category, as: 'category' }]
})`}
							language="javascript"
						/>
					</CodeBlock>
				</ChainOfThoughtItem>
				<ChainOfThoughtItem>
					<strong>Step 3:</strong> Implement query result caching for popular searches
				</ChainOfThoughtItem>
			</ChainOfThoughtContent>
		</ChainOfThoughtStep>
	</ChainOfThought>
</div>
