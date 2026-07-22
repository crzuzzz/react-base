import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUserPlus } from "react-icons/fi";
import "./Admin.css";

function UserTable({
  users,
  editId,
  editData,
  changerValeur,
  commencerModification,
  sauvegarderModification,
  demanderSuppression
}) {
  return (
    <div className="table-responsive">
      <table className="historique-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <th>Mot de Passe</th>
            <th>Rôle (ID)</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-table">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          ) : (
            users.map((u, index) => {
              const userId = u.idUser ?? u.id_user ?? u.id;
              const isEditing = editId === userId;

              return (
                <tr key={userId || index}>
                  <td>
                    {isEditing ? (
                      <input value={editData.nom} name="nom" onChange={changerValeur} />
                    ) : (
                      u.nom || "-"
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input value={editData.prenom} name="prenom" onChange={changerValeur} />
                    ) : (
                      u.prenom || "-"
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input value={editData.email} name="email" onChange={changerValeur} />
                    ) : (
                      u.email || "-"
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        type="password"
                        value={editData.motDePass}
                        name="motDePass"
                        onChange={changerValeur}
                      />
                    ) : (
                      "••••••••"
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.idRole}
                        name="idRole"
                        onChange={changerValeur}
                      />
                    ) : (
                      u.idRole ?? u.id_role ?? 1
                    )}
                  </td>

                  <td>
                    <button
                      className="action-btn sortie-btn"
                      onClick={() => {
                        if (isEditing) {
                          sauvegarderModification(userId);
                        } else {
                          commencerModification(u);
                        }
                      }}
                    >
                      {isEditing ? "Sauvegarder" : "Modifier"}
                    </button>
                  </td>

                  <td>
                    <button
                      className="action-btn historique-btn"
                      onClick={() => demanderSuppression(u)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Admin({ onLogout }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePass: "",
    idRole: 1
  });

  // Helper to extract array from any backend JSON response format
  const extractUsersArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data._embedded && data._embedded.utilisateurs) return data._embedded.utilisateurs;
    if (data._embedded && data._embedded.utilisateursList) return data._embedded.utilisateursList;
    if (data.content && Array.isArray(data.content)) return data.content;
    return [];
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/utilisateurs");
      if (response.ok) {
        const data = await response.json();
        setUsers(extractUsersArray(data));
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rechercher = async (value) => {
    try {
      const response = await fetch("http://localhost:8080/utilisateurs");
      if (response.ok) {
        const data = await response.json();
        const list = extractUsersArray(data);

        if (value.trim() === "") {
          setUsers(list);
        } else {
          const filtered = list.filter((u) => {
            const nomComplet = `${u.nom || ""} ${u.prenom || ""}`.toLowerCase();
            const email = (u.email || "").toLowerCase();
            return nomComplet.includes(value) || email.includes(value);
          });
          setUsers(filtered);
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      setUsers([]);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const ajouterUtilisateur = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newUser,
        idRole: Number(newUser.idRole)
      };

      const response = await fetch("http://localhost:8080/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewUser({ nom: "", prenom: "", email: "", motDePass: "", idRole: 1 });
        fetchUsers(); // Refresh real database list
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const commencerModification = (user) => {
    const userId = user.idUser ?? user.id_user ?? user.id;
    setEditId(userId);
    setEditData({
      nom: user.nom || "",
      prenom: user.prenom || "",
      email: user.email || "",
      motDePass: user.motDePass || "",
      idRole: user.idRole ?? user.id_role ?? 1
    });
  };

  const changerValeur = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const sauvegarderModification = async (id) => {
    try {
      const payload = {
        ...editData,
        idRole: Number(editData.idRole)
      };

      const response = await fetch(`http://localhost:8080/utilisateurs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setEditId(null);
        fetchUsers(); // Refresh real database list
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const demanderSuppression = (user) => {
    setSelectedUser(user);
    setShowDeletePopup(true);
  };

  const confirmerSuppression = async () => {
    if (!selectedUser) return;
    const userId = selectedUser.idUser ?? selectedUser.id_user ?? selectedUser.id;

    try {
      const response = await fetch(`http://localhost:8080/utilisateurs/${userId}`, {
        method: "DELETE"
      });

      if (response.ok || response.status === 204) {
        setShowDeletePopup(false);
        setSelectedUser(null);
        fetchUsers(); // Refresh real database list
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-container">
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#" className="brand">
            <img className="brand-icon" src="/src/assets/logo.gif" alt="AttijariBank logo" />
          </a>

          <nav className="nav-links">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/admin"); }}>
              Gestion Utilisateurs
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/fonctionnalites");
              }}
            >
              Fonctionnalités
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/a-propos");
              }}
            >
              À propos
            </a>
          </nav>

          <div className="nav-actions">
            <button className="button button-primary" onClick={onLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        <section className="admin-section">
          <div className="admin-card">
            <div className="table-header">
              <div>
                <h2>Gestion des Utilisateurs</h2>
                <p>Consultez, ajoutez, modifiez ou supprimez des comptes utilisateurs.</p>
              </div>
              <button
                className="button button-primary"
                onClick={() => setShowAddModal(true)}
                style={{ gap: "8px" }}
              >
                <FiUserPlus size={18} /> Ajouter Utilisateur
              </button>
            </div>

            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom ou e-mail..."
                value={query}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase();
                  setQuery(val);
                  rechercher(val);
                }}
              />
            </div>

            <UserTable
              users={users}
              editId={editId}
              editData={editData}
              changerValeur={changerValeur}
              commencerModification={commencerModification}
              sauvegarderModification={sauvegarderModification}
              demanderSuppression={demanderSuppression}
            />

            {showDeletePopup && (
              <div className="delete-overlay">
                <div className="delete-popup">
                  <h3>Confirmation de suppression</h3>
                  <p>Voulez-vous vraiment supprimer cet utilisateur ({selectedUser?.email}) ?</p>
                  <div className="delete-actions">
                    <button className="button button-primary" onClick={confirmerSuppression}>
                      Oui
                    </button>
                    <button className="button button-secondary" onClick={() => setShowDeletePopup(false)}>
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showAddModal && (
              <div className="delete-overlay">
                <div className="delete-popup">
                  <h3>Ajouter un Utilisateur</h3>
                  <form onSubmit={ajouterUtilisateur} className="modal-form">
                    <input
                      className="modal-input"
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      required
                      value={newUser.nom}
                      onChange={handleAddChange}
                    />
                    <input
                      className="modal-input"
                      type="text"
                      name="prenom"
                      placeholder="Prénom"
                      required
                      value={newUser.prenom}
                      onChange={handleAddChange}
                    />
                    <input
                      className="modal-input"
                      type="email"
                      name="email"
                      placeholder="Adresse E-mail"
                      required
                      value={newUser.email}
                      onChange={handleAddChange}
                    />
                    <input
                      className="modal-input"
                      type="password"
                      name="motDePass"
                      placeholder="Mot de passe"
                      required
                      value={newUser.motDePass}
                      onChange={handleAddChange}
                    />
                    <input
                      className="modal-input"
                      type="number"
                      name="idRole"
                      placeholder="ID Rôle (Ex: 1)"
                      required
                      value={newUser.idRole}
                      onChange={handleAddChange}
                    />

                    <div className="delete-actions" style={{ marginTop: "12px" }}>
                      <button type="submit" className="button button-primary">
                        Créer
                      </button>
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => setShowAddModal(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}