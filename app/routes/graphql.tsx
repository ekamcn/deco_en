import {LoaderFunctionArgs} from '@shopify/remix-oxygen';

interface GraphQLRequestBody {
  query: string;
  variables?: any;
}

export async function action({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  
  try {
    const body = await request.json() as GraphQLRequestBody;
    const {query, variables} = body;
    
    // Execute the query using the Hydrogen storefront client
    const result = await storefront.query(query, {
      variables,
    });
    
    return new Response(JSON.stringify({
      data: result,
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('GraphQL API error:', error);
    return new Response(JSON.stringify({
      errors: [
        {
          message: error instanceof Error ? error.message : 'An error occurred',
        },
      ],
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Also export as loader for GET requests
export async function loader(args: LoaderFunctionArgs) {
  return action(args);
}
