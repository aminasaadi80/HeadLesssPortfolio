import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        slug
        content
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

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

export const GET_HEADER = gql`
  query GetHeader {
    headerFooter {
      header {
        logo {
          node {
            sourceUrl
            altText
          }
        }
        siteName
      }
    }
  }
`;

export const GET_FOOTER = gql`
  query GetFooter {
    headerFooter {
      footer {
        logo_2 {
          node {
            sourceUrl
            altText
          }
        }
        siteName_2
        desc
        menuTitle
        social {
          title
          items {
            logo {
              node {
                sourceUrl
                altText
              }
            }
            link {
              title
              url
              target
            }
          }
        }
        copyrightText
      }
    }
  }
`;

export const GET_HOME_FIELDS = gql`
  query GetHomeFields {
    page(id: "home", idType: URI) {
      homeFields {
        hero {
          title
          subtitle
          button {
            title
            url
            target
          }
        }
        skills {
          title
          items {
            img {
              node {
                sourceUrl
                altText
              }
              }
            title
            proficiency
          }
        }
        projects {
          title
          button {
           title
           url
          target
          }
          posts {
            nodes {
              ... on Post {
                id
                title
                excerpt
                slug
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
        about {
          img {
            node {
              sourceUrl
              altText
            }
            }
          title
          desc
          button {
            title
            url
            target
          }
        }
      }
    }
  }
`;

export const GET_ABOUT_FIELDS = gql`
  query GetAboutFields {
    page(id: "about", idType: URI) {
      about {
        title
        subtitle
        about {
          img {
            node {
              sourceUrl
              altText
            }
          }
          title
          desc
        }
        skills {
          title
          items {
            img {
              node {
                sourceUrl
                altText
              }
            }
            title
            proficiency
          }
        }
        experience {
          title
          items {
            title
            subtitle
            desc
          }
        }
        button {
          title
          url
          target
        }
      }
    }
  }
`;

export const GET_CONTACT_FIELDS = gql`
  query GetContactFields {
    page(id: "contact", idType: URI) {
      contact {
        title
        subtitle
        info {
          title
          subtitle
          email
          phone
          address
        }
        social {
          title
          items {
            logo {
              node {
                sourceUrl
                altText
              }
            }
            link {
              title
              url
              target
            }
          }
        }
        location {
          title
          desc
          map
        }
      }
    }
  }
`;

export const GET_PROJECTS_FIELDS = gql`
  query GetProjectsFields {
  page(id: "projects", idType: URI) {
        projects {
          title
          subtitle
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