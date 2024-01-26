import { DataGrid, GridCellParams, GridColDef, GridRowId, GridRowSelectionModel, GridTreeNode } from '@mui/x-data-grid';
import { useState } from 'react';
import { GridRowType } from '../../Common/Types';

const colums: GridColDef[] = [
  { field: 'key', headerName: '지라코드', width: 100, sortable: false, },
  { field: 'jiraProjectName', headerName: '프로젝트이름', width: 900, sortable: false, },
  { field: 'projectAssignees', headerName: '담당자', width: 100, sortable: false, },
]

type MuiSelectedTableType = {
  setSubJiraKey: React.Dispatch<React.SetStateAction<GridRowType>>
  gridData: Object[]
}
export default function MuiSelectedTable({ setSubJiraKey, gridData }: MuiSelectedTableType) {
  const [rowSelected, setRowSelected] = useState<GridRowId[]>([]);
  const handleSelectedRow = (selection: GridRowSelectionModel) => {
    if (selection.length > 1) {
      const selectionSet = new Set(rowSelected);
      const result = selection.filter((s) => !selectionSet.has(s));
      setRowSelected(result);
    } else {
      setRowSelected(selection);
    }
  }
  const handleOnClickRow = (GridCellParams: GridCellParams<any, unknown, unknown, GridTreeNode>) => {
    setSubJiraKey(GridCellParams.row);
  }

  return (
    <DataGrid
      rows={gridData}
      columns={colums}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 8 },
        },
      }}
      rowSelectionModel={rowSelected}
      checkboxSelection
      hideFooterSelectedRowCount
      onRowSelectionModelChange={(selection) => handleSelectedRow(selection)}
      onCellClick={(GridCellParams) => { handleOnClickRow(GridCellParams) }}
      getRowId={(obj) => obj.id}
      sx={{
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
          display: "none"
        }
      }}
    />
  )
}
