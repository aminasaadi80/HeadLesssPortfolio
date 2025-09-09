import { gql } from '@apollo/client';

/* -------------------- Posts -------------------- */
/* نسخهٔ عمومی قبلی‌ات (بدون فیلتر زبان) را نگه ‌داشتم */
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
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  }
`;

/* نسخه‌های مجزا بر اساس زبان (ایمن با languageSlug) */
export const GET_POSTS_FA = gql`
  query GetFaPosts {
    posts(where: { languageSlug: "fa" }) {
      nodes {
        id
        title
        slug
        content
        date
        excerpt
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  }
`;

export const GET_POSTS_EN = gql`
  query GetEnPosts {
    posts(where: { languageSlug: "en" }) {
      nodes {
        id
        title
        slug
        content
        date
        excerpt
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  }
`;

/* -------------------- Menus -------------------- */
/* منوها معمولاً به‌صورت جداگانه برای هر زبان ساخته می‌شن. همین کوئری رو نگه‌دار و
   موقع فراخوانی، منوی زبان مربوطه رو انتخاب کن. */
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

/* -------------------- Header (Site Options) -------------------- */
export const GET_HEADER = gql`
  query GetHeader {
    headerFooter {
      header {
        logo { node { sourceUrl altText } }
        light_logo { node { sourceUrl altText } }
        siteName
        enSiteName
      }
    }
  }
`;

/* -------------------- Footer (Site Options) -------------------- */
export const GET_FOOTER = gql`
  query GetFooter {
    headerFooter {
      footer {
        logo_2 { node { sourceUrl altText } }
        light_logo_2 { node { sourceUrl altText } }
        siteName_2
        enSiteName2
        desc
        enDesc
        menuTitle
        enMenuTitle
        social {
          title
          enTitle
          items {
            logo { node { sourceUrl altText } }
            link { title url target }
            enLink { title url target }
          }
        }
        copyrightText
        enCopyrightText
      }
    }
  }
`;

/* -------------------- Home Page Fields -------------------- */
export const GET_HOME_FIELDS = gql`
  query GetHomeFields {
    page(id: "home", idType: URI) {
      homeFields {
        hero {
          title
          enTitle
          subtitle
          enSubtitle
          button { title url target }
          enButton { title url target }
        }
        skills {
          title
          enTitle
          items {
            img { node { sourceUrl altText } }
            title
            enTitle
            proficiency
          }
        }
        projects {
          title
          enTitle
          button { title url target }
          enButton { title url target }
          posts {
            nodes {
              ... on Post {
                id
                title
                excerpt
                slug
                featuredImage { node { sourceUrl altText } }
              }
            }
          }
        }
        about {
          img { node { sourceUrl altText } }
          title
          enTitle
          desc
          enDesc
          button { title url target }
          enButton { title url target }
        }
      }
    }
  }
`;

/* -------------------- About Page Fields -------------------- */
export const GET_ABOUT_FIELDS = gql`
  query GetAboutFields {
    page(id: "about", idType: URI) {
      about {
        title
        enTitle
        subtitle
        enSubtitle
        about {
          img { node { sourceUrl altText } }
          title
          enTitle
          desc
          enDesc
        }
        skills {
          title
          enTitle
          items {
            img { node { sourceUrl altText } }
            title
            enTitle
            proficiency
          }
        }
        experience {
          title
          enTitle
          items {
            title
            enTitle
            subtitle
            enSubtitle
            desc
            enDesc
          }
        }
        button { title url target }
        enButton { title url target }
      }
    }
  }
`;

/* -------------------- Contact Page Fields -------------------- */
export const GET_CONTACT_FIELDS = gql`
  query GetContactFields {
    page(id: "contact", idType: URI) {
      contact {
        title
        enTitle
        subtitle
        enSubtitle
        info {
          title
          enTitle
          subtitle
          enSubtitle
          email
          phone
          address
          enAddress
        }
        social {
          title
          enTitle
          items {
            logo { node { sourceUrl altText } }
            link { title url target }
            enLink { title url target }
          }
        }
        location {
          title
          enTitle
          desc
          enDesc
          map
          enMap
        }
      }
    }
  }
`;

/* -------------------- Projects Page Fields -------------------- */
export const GET_PROJECTS_FIELDS = gql`
  query GetProjectsFields {
    page(id: "projects", idType: URI) {
      projects {
        title
        enTitle
        subtitle
        enSubtitle
      }
    }
  }
`;

/* -------------------- Single Post By Slug -------------------- */
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      featuredImage { node { sourceUrl } }
      categories { nodes { name slug } }
    }
  }
`;
