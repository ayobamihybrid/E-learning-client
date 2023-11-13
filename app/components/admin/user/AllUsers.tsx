import React, { FC, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Loader from '../../Loader';
import { format } from 'timeago.js';
import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../../../redux/features/user/userApi';
import { styles } from '../../styles/styles';
import toast from 'react-hot-toast';

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [userId, setUserId] = useState('');

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [changeUserRole, { isSuccess, error: isError }] =
    useChangeUserRoleMutation();

  const [deleteUser, { isSuccess: success, error: deleteUserError }] =
    useDeleteUserMutation({});

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name ', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 0.5 },
    { field: 'role', headerName: 'Role', flex: 0.5 },
    { field: 'courses', headerName: 'Purchased course(s)', flex: 0.5 },
    { field: 'created_at', headerName: 'Joined at', flex: 0.5 },
    {
      field: '  ',
      headerName: 'Email',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mail to: ${params.row.email}`}>
              <AiOutlineMail className="text-black dark:text-white" size={20} />
            </a>
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
            <Button>
              <AiOutlineDelete
                className="text-black dark:text-white"
                size={20}
                onClick={() => {
                  setActive(!active);
                  setUserId(params.row.id);
                }}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const team = data?.users.filter((user: any) => user.role === 'admin');

    team &&
      team.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: format(user.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: format(user.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success('User role updated successfully');
    }

    if (success) {
      refetch();
      toast.success('User deleted successfully');
    }

    if (isError) {
      if ('data' in isError) {
        const errorMessage = isError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, isError, success]);

  const handleSubmit = async () => {
    await changeUserRole({ email, role });
    setOpen(!open);
  };

  const handleDelete = async () => {
    await deleteUser(userId);
    setActive(!active);
  };

  return (
    <>
      <div className="mt-[120px]">
        {isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            {isTeam && (
              <div className="w-full flex justify-end">
                <div
                  className={`${styles.button} !w-[200px] !rounded-[10px] dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]`}
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <p className="text-[17px]">Add New Members</p>
                </div>
              </div>
            )}

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
          </Box>
        )}
      </div>

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] 800px:w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <p className="text-center text-[18px] px-4">Add New User</p>

            <input
              type="text"
              placeholder="Enter user's email"
              value={email}
              className={`${styles.input} !mt-5`}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            <select
              name=""
              id=""
              className={`${styles.input} !mb-7`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user" className="text-black dark:text-blue-400">
                User
              </option>
              <option value="admin" className="text-black dark:text-blue-400">
                Admin
              </option>
            </select>

            <div className="mt-5 w-full">
              <input
                type="submit"
                value="Submit"
                className={`${styles.button}`}
                onClick={handleSubmit}
              />
            </div>
          </Box>
        </Modal>
      )}

      {active && (
        <Modal
          open={active}
          onClose={() => setOpen(!active)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] 800px:w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h2 className={`${styles.title}`}>Proceed to delete this user?</h2>

            <div className="w-full flex items-center justify-between mb-6">
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7] mt-5`}
                onClick={() => setActive(!active)}
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
    </>
  );
};

export default AllUsers;
