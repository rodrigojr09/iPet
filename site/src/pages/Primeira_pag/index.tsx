import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function Feed() {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-slate-800">
        <h1 className="text-2xl font-bold text-blue-400">iPet</h1>
        <div className="flex gap-6">
          <a href="#">Início</a>
          <a href="#">Feed</a>
          <a href="#">Marketplace</a>
          <a href="#">Clínicas</a>
          <a href="#">Perfil</a>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-blue-600 hover:bg-blue-700">
            Entrar
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Cadastrar-se
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {/* Feed */}
        <div className="md:col-span-2">
          <Card className="bg-slate-800 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src="colocar uma foto aqui aleatoria sla"
                  alt="Rodrigo"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Rodrigo kkk</p>
                  <p className="text-sm text-slate-400">com Rodrigo</p>
                </div>
              </div>
              <p className="mb-4">Curtindo o parque hoje!</p>
              <img
                src="Colocar o link da imagem aqui please :)"
                alt="Rodrigo part 2"
                className="w-full rounded-xl mb-4"
              />
              <div className="flex gap-6 text-slate-400">
                <div className="flex items-center gap-1 cursor-pointer">
                  <Heart className="w-5 h-5" /> Curtir
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <MessageCircle className="w-5 h-5" /> Comentar
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Share2 className="w-5 h-5" /> Compartilhar
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <Card className="bg-slate-800 text-white">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Marketplace 🏬</h2>
              <p className="text-sm mb-2">
                Confira os melhores produtos para seu pet!
              </p>
              <a href="#" className="text-blue-400 text-sm">
                Faça login para explorar
              </a>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 text-white">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                Clínicas Veterinárias 🏥
              </h2>
              <div className="text-sm space-y-2">
                <p>
                  🐾 PetCare – ⭐ 4.8{" "}
                  <a href="#" className="text-blue-400">
                    Faça login
                  </a>
                </p>
                <p>
                  🐾 Vet Amigo – ⭐ 4.6{" "}
                  <a href="#" className="text-blue-400">
                    Faça login
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
