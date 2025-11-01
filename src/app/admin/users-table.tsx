
"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { User } from '@/lib/types';
import { EditUserDialog } from './edit-user-dialog';

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Pesquisar por nome ou e-mail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className='hidden sm:table-cell'>E-mail</TableHead>
            <TableHead className="text-center hidden sm:table-cell">Função</TableHead>
            <TableHead className="hidden sm:table-cell">Termos Aceitos</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground md:hidden">
                  {user.email}
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>{user.email}</TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {user.termsAcceptedAt ? new Date(user.termsAcceptedAt).toLocaleDateString('pt-BR') : 'Não'}
              </TableCell>
              <TableCell className="text-right">
                <EditUserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
