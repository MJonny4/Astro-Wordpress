import type { Block } from '@wp-block-tools/styles';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
    const uri = params.uri;
    const response = await fetch(`${import.meta.env.WPGRAPHQL_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `query PageQuery($uri: String!) {
                nodeByUri(uri: $uri) {
                    ... on ContentNode {
                        id
                        blocks
                        seo {
                            metaDesc
                            title
                        }
                    }
                }
            }`,
            variables: {
                uri: uri || '/',
            },
        }),
    });

    const { data } = await response.json();
    return new Response(JSON.stringify({ data: data.nodeByUri }));
};

export async function getStaticPaths() {
    const response = await fetch(`${import.meta.env.WPGRAPHQL_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `query AllPages {
                pages(first: 1000) {
                    nodes {
                        uri
                        blocks(attributes:false)
                    }
                }
                properties(first: 1000) {
                    nodes {
                        uri
                        blocks(attributes:false)
                    }
                }
            }`,
        }),
    });

    const { data } = await response.json();

    return [...data.pages.nodes, ...data.properties.nodes]
        .filter((page: any) => {
            let found = false;
            const hasPropertySearch = (blocks: Block[]) => {
                for (let block of blocks) {
                    if (block.name === 'astroestates/property-search') {
                        found = true;
                        break;
                    }
                    if (block.innerBlocks) {
                        hasPropertySearch(block.innerBlocks);
                    }
                }
            };
            hasPropertySearch(page.blocks);
            return found;
        })
        .map((page: any) => ({
            params: {
                uri:
                    page.uri === '/'
                        ? undefined
                        : page.uri.substring(1, page.uri.length - 1),
            },
        }));
}
