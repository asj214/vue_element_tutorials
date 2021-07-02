export const generateNested = (rows, depth = 0, parentId) => {
  const ret = []
  let append = {}
  let page

  for (const i in rows) {
    if (rows[i].depth !== depth) continue
    if (parentId && rows[i].parent !== parentId) continue

    page = rows[i].page
    if (!page) page = { path: rows[i].id.toString(), name: '' }

    append = {
      id: rows[i].id,
      parent_id: rows[i].parent,
      name: rows[i].name,
      descr: rows[i].descr,
      depth: rows[i].depth,
      order: rows[i].order,
      page: page,
      is_published: rows[i].is_published,
      children: generateNested(rows, rows[i].depth + 1, rows[i].id)
    }

    if (append.children.length === 0) delete append.children

    ret.push(append)
  }
  return ret
}
