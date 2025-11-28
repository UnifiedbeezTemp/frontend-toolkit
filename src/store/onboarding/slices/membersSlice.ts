import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

export interface TeamMember {
  id: string;
  email: string;
  avatar: string;
  role: string;
  status: 'active' | 'pending' | 'denied';
  isSelected?: boolean;
}

export interface MembersState {
  members: TeamMember[];
  invitedUsers: TeamMember[];
  searchQueryMembers: string; 
  searchQueryInvited: string; 
  selectedRole: string;
  emailInput: string;
}

const initialState: MembersState = {
  members: [],
  invitedUsers: [],
  searchQueryMembers: '',
  searchQueryInvited: '',
  selectedRole: 'owner',
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
    setSelectedRole: (state, action: PayloadAction<string>) => {
      state.selectedRole = action.payload;
    },
    setEmailInput: (state, action: PayloadAction<string>) => {
      state.emailInput = action.payload;
    },
    addInvitedUser: (state, action: PayloadAction<TeamMember>) => {
      state.invitedUsers.push(action.payload);
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
  ],
  (members, searchQueryMembers) => {
    return members.filter(member =>
      member.email.toLowerCase().includes(searchQueryMembers.toLowerCase())
    );
  }
);

export const selectFilteredInvitedUsers = createSelector(
  [
    (state: RootState) => state.members.invitedUsers,
    (state: RootState) => state.members.searchQueryInvited,
  ],
  (invitedUsers, searchQueryInvited) => {
    return invitedUsers.filter(user =>
      user.email.toLowerCase().includes(searchQueryInvited.toLowerCase())
    );
  }
);

export const selectTotalMembers = (state: RootState) => state.members.members.length;
export const selectSelectedMembersCount = (state: RootState) => 
  state.members.members.filter(member => member.isSelected).length;
export const selectTotalInvitedUsers = (state: RootState) => state.members.invitedUsers.length;

export const {
  setMembers,
  setInvitedUsers,
  setSearchQueryMembers,
  setSearchQueryInvited,
  setSelectedRole,
  setEmailInput,
  addInvitedUser,
  removeMember,
  cancelInvitation,
  updateMemberRole,
  updateInvitedUserRole,
  toggleMemberSelection,
  selectAllMembers,
} = membersSlice.actions;

export default membersSlice.reducer;