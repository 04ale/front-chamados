import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import CountTickets from "./CountTickets";
import { updateEmail, updatePassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Shield, Ticket, Settings, Edit } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import { auth } from "@/services/firebaseConfig";

function UpdateUserInfo() {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const avatar = user?.name?.slice(0, 2).toUpperCase() ?? "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem!");
      return;
    }

    try {
      const fbUser = auth.currentUser;
      if (!fbUser) {
        toast.error("Usuário não autenticado no Firebase.");
        return;
      }

      if (password.length < 6 && password.length > 0) {
        toast.warning("A senha deve ter no mínimo 6 caracteres");
      }
      if (email && password.length < 1) {
        await updateEmail(fbUser, email);
        toast.success("E-mail atualizado com sucesso");
      }
      if (password && email) {
        await updateEmail(fbUser, email);
        await updatePassword(fbUser, password);
        toast.success("Informações atualizadas com sucesso!");
      }

      const res = await api.patch(
        `/users/${user.id}`,
        {
          email,
          password: password || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      localStorage.setItem("authData", JSON.stringify({ ...user, email }));
      if (res.status === 200) {
        toast.success("Informações atualizadas com sucesso!");
        setIsEditOpen(false);
      } else {
        toast.error("Erro ao atualizar informações.");
      }
    } catch (error) {
      let errorMessage = "Ocorreu um erro ao atualizar.";

      if (error.code === "auth/requires-recent-login") {
        errorMessage = "Sua sessão é muito antiga. Por favor, faça logout e login novamente para alterar seus dados.";
      }

      console.error("ERRO AO ATUALIZAR INFORMAÇÕES: ", errorMessage)
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  function change(info) {
    if (info === "user") {
      return <p>Usuário</p>;
    }
    if (info === "admin") {
      return <p>Administrador</p>;
    }
  }
  return (
    <div className="w-full p-4 md:p-8 max-md:pt-8 space-y-8 ">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-[#5A2C40] text-[#F7F0E4] flex items-center justify-center text-3xl font-bold shrink-0">
          {avatar}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#5A2C40]">
            {user.name}
          </h1>
          <p className="text-lg text-slate-500">{change(user.role)}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#FFFBF5] text-[#5A2C40]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">E-mail</CardTitle>
            <Mail className="h-5 w-5 text-[#5A2C40]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">{user.email}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#FFFBF5] text-[#5A2C40]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Cargo</CardTitle>
            <Shield className="h-5 w-5 text-[#5A2C40]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{change(user.role)}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#FFFBF5] text-[#5A2C40]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Tickets Atribuídos
            </CardTitle>
            <Ticket className="h-5 w-5 text-[#5A2C40]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <CountTickets userInfo={user} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        {isEditOpen ? (
          <Card className="bg-[#FFFBF5] text-[#5A2C40] max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" /> Editar Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action="" className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="novo e-mail"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Nova Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    defaultValue={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    className="bg-[#5A2C40] hover:bg-[#8B4571] transition-all duration-300 text-white cursor-pointer"
                  >
                    Confirmar Alterações
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditOpen(false)}
                    className="bg-white transition-all duration-300 text-[#5A2C40] cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={() => setIsEditOpen(true)}
            className="bg-[#5A2C40] hover:bg-[#8B4571] transition-all duration-300 text-white cursor-pointer flex gap-4 items-center"
          >
            <Settings />
            <p>Editar informações</p>
          </Button>
        )}
      </div>
    </div>
  );
}

export default UpdateUserInfo;
