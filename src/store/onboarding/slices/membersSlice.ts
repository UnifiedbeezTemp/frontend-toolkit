import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { TeamMember } from '../types/memberTypes';
import { ApiRole } from '../../../types/api/memberTypes';

export interface MembersState {
  members: TeamMember[];
  invitedUsers: TeamMember[];
  roles: ApiRole[];
  searchQueryMembers: string; 
  searchQueryInvited: string; 
  roleFilterMembers: string | null; 
  statusFilterInvited: string | null; 
  selectedRole: string;
  emailInput: string;
}

const initialState: MembersState = {
  members: [],
  invitedUsers: [],
  roles: [],
  searchQueryMembers: '',
  searchQueryInvited: '',
  roleFilterMembers: null,
  statusFilterInvited: null,
  selectedRole: 'OWNER',
  emailInput: '',
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
    setInvitedUsers: (state, action: PayloadAction<TeamMember[]>) => {
      state.invitedUsers = action.payload;
    },
    setSearchQueryMembers: (state, action: PayloadAction<string>) => {
      state.searchQueryMembers = action.payload;
    },
    setSearchQueryInvited: (state, action: PayloadAction<string>) => {
      state.searchQueryInvited = action.payload;
    },
    setRoleFilterMembers: (state, action: PayloadAction<string | null>) => {
      state.roleFilterMembers = action.payload;
    },
    setStatusFilterInvited: (state, action: PayloadAction<string | null>) => {
      state.statusFilterInvited = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<string>) => {
      state.selectedRole = action.payload;
    },
    setEmailInput: (state, action: PayloadAction<string>) => {
      state.emailInput = action.payload;
    },
    setRoles: (state, action: PayloadAction<ApiRole[]>) => {
      state.roles = action.payload;
    },
    addInvitedUser: (state, action: PayloadAction<TeamMember>) => {
      state.invitedUsers.unshift(action.payload);
      state.emailInput = '';
    },
    removeMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(member => member.id !== action.payload);
    },
    cancelInvitation: (state, action: PayloadAction<string>) => {
      state.invitedUsers = state.invitedUsers.filter(user => user.id !== action.payload);
    },
    updateMemberRole: (state, action: PayloadAction<{ id: string; role: string }>) => {
      const member = state.members.find(m => m.id === action.payload.id);
      if (member) {
        member.role = action.payload.role;
      }
    },
    updateInvitedUserRole: (state, action: PayloadAction<{ id: string; role: string }>) => {
      const user = state.invitedUsers.find(u => u.id === action.payload.id);
      if (user) {
        user.role = action.payload.role;
      }
    },
    updateInvitedUserRoleId: (state, action: PayloadAction<{ id: string; roleId: number }>) => {
      const user = state.invitedUsers.find(u => u.id === action.payload.id);
      if (user) {
        user.roleId = action.payload.roleId;
      }
    },
    markInvitationAsSent: (
      state,
      action: PayloadAction<{ id: string; apiInvitationId: string | number }>
    ) => {
      const user = state.invitedUsers.find(u => u.id === action.payload.id);
      if (user) {
        user.id = action.payload.apiInvitationId.toString();
        user.status = "pending";
      }
    },
    setInvitedSelection: (
      state,
      action: PayloadAction<{ ids: string[]; selected: boolean }>
    ) => {
      state.invitedUsers = state.invitedUsers.map((u) =>
        action.payload.ids.includes(u.id)
          ? { ...u, isSelected: action.payload.selected }
          : u
      );
    },
    updateInvitedUserRoleBulk: (
      state,
      action: PayloadAction<{ ids: string[]; role: string; roleId: number }>
    ) => {
      state.invitedUsers = state.invitedUsers.map((u) =>
        action.payload.ids.includes(u.id)
          ? { ...u, role: action.payload.role, roleId: action.payload.roleId }
          : u
      );
    },
    markInvitationsPendingBulk: (state, action: PayloadAction<{ ids: string[] }>) => {
      state.invitedUsers = state.invitedUsers.map((u) =>
        action.payload.ids.includes(u.id) ? { ...u, status: "pending", isSelected: false } : u
      );
    },
    toggleMemberSelection: (state, action: PayloadAction<string>) => {
      const member = state.members.find(m => m.id === action.payload) ||  state.invitedUsers.find(m => m.id === action.payload);
      if (member) {
        member.isSelected = !member.isSelected;
      }
    },
    selectAllMembers: (state) => {
      const allSelected = state.members.every(member => member.isSelected);
      state.members.forEach(member => {
        member.isSelected = !allSelected;
      });
    },
  },
});

export const selectFilteredMembers = createSelector(
  [
    (state: RootState) => state.members.members,
    (state: RootState) => state.members.searchQueryMembers,
    (state: RootState) => state.members.roleFilterMembers,
  ],
  (members, searchQueryMembers, roleFilterMembers) => {
    return members.filter(member => {
      const matchesSearch = member.email.toLowerCase().includes(searchQueryMembers.toLowerCase());
      const matchesRole = !roleFilterMembers || member.role === roleFilterMembers;
      return matchesSearch && matchesRole;
    });
  }
);

export const selectFilteredInvitedUsers = createSelector(
  [
    (state: RootState) => state.members.invitedUsers,
    (state: RootState) => state.members.searchQueryInvited,
    (state: RootState) => state.members.statusFilterInvited,
  ],
  (invitedUsers, searchQueryInvited, statusFilterInvited) => {
    return invitedUsers.filter(user => {
      const matchesSearch = user.email.toLowerCase().includes(searchQueryInvited.toLowerCase());
      const matchesStatus = !statusFilterInvited || user.status === statusFilterInvited;
      return matchesSearch && matchesStatus;
    });
  }
);

export const selectSelectedInvitedUsers = createSelector(
  [(state: RootState) => state.members.invitedUsers],
  (invitedUsers) => invitedUsers.filter((u) => u.isSelected)
);

export const selectSelectedInvitedCount = createSelector(
  selectSelectedInvitedUsers,
  (selected) => selected.length
);

export const selectTotalMembers = (state: RootState) => state.members.members.length;
export const selectSelectedMembersCount = (state: RootState) => 
  state.members.members.filter(member => member.isSelected).length;
export const selectTotalInvitedUsers = (state: RootState) => state.members.invitedUsers.length;

export const {
  setMembers,
  setInvitedUsers,
  setRoles,
  setSearchQueryMembers,
  setSearchQueryInvited,
  setRoleFilterMembers,
  setStatusFilterInvited,
  setSelectedRole,
  setEmailInput,
  addInvitedUser,
  removeMember,
  cancelInvitation,
  updateMemberRole,
  updateInvitedUserRole,
  updateInvitedUserRoleId,
  markInvitationAsSent,
  setInvitedSelection,
  updateInvitedUserRoleBulk,
  markInvitationsPendingBulk,
  toggleMemberSelection,
  selectAllMembers,
} = membersSlice.actions;

export default membersSlice.reducer;