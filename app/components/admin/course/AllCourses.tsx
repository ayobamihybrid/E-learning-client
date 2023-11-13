import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import {
  useDeleteCourseMutation,
  useGetAllCoursesAdminQuery,
} from '../../../../redux/features/courses/coursesApi';
import Loader from '../../Loader';
import { format } from 'timeago.js';
import { styles } from '../../styles/styles';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, refetch } = useGetAllCoursesAdminQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState('');

  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'title', headerName: 'course Title', flex: 1 },
    { field: 'ratings', headerName: 'Ratings', flex: 0.5 },
    { field: 'purchased', headerName: 'Purchased', flex: 0.5 },
    { field: 'created_at', headerName: 'Created At', flex: 0.5 },
    {
      field: '  ',
      headerName: 'Edit',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="text-black dark:text-white" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: ' ',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="text-black dark:text-white"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          purchased: item.purchased,
          ratings: item.ratings,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success('Course deleted successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
    setOpen(!open);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="70vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom:
                  theme === 'dark'
                    ? '1px solid #ffffff30 !important'
                    : '1px solid #ccc !important',
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: ' none',
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiCheckBox-root': {
                color:
                  theme === 'dark' ? '#b7ebde !important' : '#000 !important',
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: '#fff !important',
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] 800px:w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h2 className={`${styles.title}`}>
                  Proceed to delete this course?
                </h2>

                <div className="w-full flex items-center justify-between mb-6">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7] mt-5`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>

                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-red-700`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
