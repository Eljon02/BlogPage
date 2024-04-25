import { TableContainer } from '@mui/material'
import { Button, Table } from "semantic-ui-react";
import React from 'react'
import { Link } from 'react-router-dom'

export default function ArticleTable({ articles }) {
  return (
    <TableContainer className="table">
      <div className="datatable">
        <div className="datatableTitle">
          <Link to="/dashboard/createUser" className="link">
            <Button inverted content="Add New" color="green" />
          </Link>
        </div>
      </div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Publication Date</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {articles.map((article) => (
            <Table.Row key={article.articleId}>
              <Table.Cell>{article.articleId}</Table.Cell>
              <Table.Cell>{article.title}</Table.Cell>
                <Table.Cell>{article.content}</Table.Cell>
                <Table.Cell>{article.publicationDate}</Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  as={Link}
                  to={`/dashboard/users/${article.id}`}
                  className="ui inverted blue button"
                  color="blue"
                  content="Edit"
                />

                <Button inverted content="Delete" color="red" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>{" "}
    </TableContainer>
  )
}
