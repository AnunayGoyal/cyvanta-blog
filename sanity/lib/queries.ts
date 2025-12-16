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
    "author": author->{name, "slug": slug.current, image, bio, linkedin, instagram}
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && category->slug.current == $categorySlug]|order(_createdAt desc){
    title,
    "slug": slug.current,
    "date": _createdAt,
    summary,
    "categorySlug": category->slug.current,
    "tags": tags[]{ "t": coalesce(@->title, @) }.t
  }
`);
