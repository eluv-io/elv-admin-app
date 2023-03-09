import React from "react";
import {observer} from "mobx-react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {TitleLabel} from "../../components/Labels.js";
import Grid from "@mui/material/Grid";
import GridLabelItem from "../../components/GridLabelItem";
import ReactJson from "react-json-view";
import { DataGrid } from "@mui/x-data-grid";

/*
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
*/

const SalesTable = ({rows}) => {
  const salesColumns = [
    { field: "address", headerName: "Address", width: 300 },
    { field: "releasable", headerName: "Releasable", type: "number", width: 90 },
    { field: "released", headerName: "Released", type: "number", width: 90 }
  ];

  /*
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stake holders</TableCell>
            <TableCell align="right">Releasable</TableCell>
            <TableCell align="right">Released</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.address}
              </TableCell>
              <TableCell align="right">{row.releasable}</TableCell>
              <TableCell align="right">{row.released}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  */
  return (
    <div style={{ height: 400, maxWidth: 600 }}>
      <DataGrid
        rows={rows}
        columns={salesColumns}
        autoPageSize
      />
    </div>
  );
};

const MarketPlaces = ({rows}) => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 160 },
    { field: "items", headerName: "Items", type: "number", width: 90 },
    { field: "status", headerName: "Status", width: 150 }
  ];

  return (
    <div style={{ height: 400, maxWidth: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
      />
    </div>
  );
};

const MarketplaceBasics = observer(() => {
  const salesContract = rootStore.marketplaceInfo.basics.sales.contractAddress;
  const royaltiesContract = rootStore.marketplaceInfo.basics.royalties.contractAddress;
  const showRoyalties = royaltiesContract != null && royaltiesContract !=  salesContract;

  return (
    <Box sx={{ width: "100%"}}>
      <Paper elevation={3} >
        <Box
          sx={{
            p: 2,
            minHeight: 300
          }}
        >
          <TitleLabel
            message="Marketplace Info and Settings"
          />

          <Grid container rowSpacing={3} columnSpacing={1} sx={{ m: 3 }} >
            <GridLabelItem
              sx={{mt:2}}
              text = {!showRoyalties ? "Sales and Royalties" : "Sales"}
              subText={rootStore.marketplaceInfo.basics.sales.contractAddress}
            />
            <Grid item xs={8}>
              <SalesTable rows={rootStore.marketplaceInfo.basics.sales.stakeholders} />
            </Grid>
            { showRoyalties ?
              <>
                <GridLabelItem
                  sx={{mt:2}}
                  text="Royalties"
                  subText={rootStore.marketplaceInfo.basics.royalties.contractAddress}
                />
                <Grid item xs={8}>
                  <SalesTable rows={rootStore.marketplaceInfo.basics.royalties.stakeholders} />
                </Grid>
              </> : null
            }
            <GridLabelItem
              sx={{mt:2}}
              text="Marketplaces"
            />
            <Grid item xs={8}>
              <MarketPlaces rows={rootStore.marketplaceInfo.basics.marketplaces} />
            </Grid>
            <GridLabelItem
              sx={{mt:2}}
              text="Settings"
            />
            <Grid item xs={8}>
              <ReactJson name={null} src={rootStore.marketplaceInfo.basics.settings} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
});

export default MarketplaceBasics;
