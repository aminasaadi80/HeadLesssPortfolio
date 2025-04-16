import { gql } from '@apollo/client';


export const GET_MENUS = gql`
  query GetMenus {
    menus {
      nodes {
        id
        name
        menuItems {
          nodes {
            id
            label
            url
            parentId
          }
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_HOME_FIELDS = gql`
  query GetHomeFields {
    page(id: "home", idType: URI) {
      title
      homeFields {
        intro {
          title
          subtitle 
          items {
            title
            description
          }
        }
      }
    }
  }
`; 