import { defineQuery } from "next-sanity";

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"]|order(title asc){
    title,
    "slug": slug.current,
    subtitle,
    tag,
    description,
    color,
    "count": count(*[_type == "post" && references(^._id)])
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"]|order(_createdAt desc){
    title,
    "slug": slug.current,
    "date": _createdAt,
    summary,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "categoryColor": category->color,
    "categoryTag": category->tag,
    "tags": tags[]{ "t": coalesce(@->title, @) }.t
  }
`);

export const AUTHORS_QUERY = defineQuery(`
  *[_type == "author"]|order(firstName asc){
    "name": firstName + " " + lastName,
    firstName,
    lastName,
    "slug": slug.current,
    image,
    bio,
    profileTag,
    website,
    github,
    twitter,
    linkedin,
    instagram
  }
`);

export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0]{
    "name": firstName + " " + lastName,
    firstName,
    lastName,
    "slug": slug.current,
    image,
    bio,
    profileTag,
    website,
    github,
    twitter,
    linkedin,
    instagram
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "date": _createdAt,
    summary,
    content,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "tags": tags[]{ "t": coalesce(@->title, @) }.t,
    "skillLevel": skillLevel,
    "author": author->{
      "name": firstName + " " + lastName,
      firstName,
      lastName,
      "slug": slug.current, 
      image, 
      bio, 
      profileTag, 
      website, 
      github, 
      twitter, 
      linkedin, 
      instagram
    }
  }
`);

export const POSTS_BY_AUTHOR_QUERY = defineQuery(`
  *[_type == "post" && author->slug.current == $slug]|order(_createdAt desc){
    title,
    "slug": slug.current,
    "date": _createdAt,
    summary,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "categoryColor": category->color,
    "tags": tags[]{ "t": coalesce(@->title, @) }.t
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && category->slug.current == $slug]|order(_createdAt desc){
    title,
    "slug": slug.current,
    "date": _createdAt,
    summary,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "categoryColor": category->color,
    "tags": tags[]{ "t": coalesce(@->title, @) }.t
  }
`);
